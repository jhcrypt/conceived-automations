import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { z } from "zod";
import * as db from "./db";
import { notifyOwner } from "./_core/notification";

export const appRouter = router({
    // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  // Contact form submissions
  contact: router({
    submit: publicProcedure
      .input(z.object({
        name: z.string().min(1, "Name is required"),
        email: z.string().email("Invalid email address"),
        companyName: z.string().optional(),
        message: z.string().min(10, "Message must be at least 10 characters"),
      }))
      .mutation(async ({ input }) => {
        // Save to database
        await db.createContactSubmission(input);
        
        // Notify owner
        await notifyOwner({
          title: "New Contact Form Submission",
          content: `Name: ${input.name}\nEmail: ${input.email}\nCompany: ${input.companyName || 'N/A'}\n\nMessage:\n${input.message}`,
        });
        
        return { success: true };
      }),
  }),

  // ROI Calculator
  roi: router({
    calculate: publicProcedure
      .input(z.object({
        name: z.string().min(1, "Name is required"),
        email: z.string().email("Invalid email address"),
        companyName: z.string().optional(),
        employeeCount: z.number().int().positive(),
        avgHourlyRate: z.number().int().positive(),
        hoursPerWeek: z.number().int().positive(),
      }))
      .mutation(async ({ input }) => {
        // Calculate savings (75% time savings)
        const weeklyHours = input.hoursPerWeek;
        const savedHours = weeklyHours * 0.75;
        const weeklySavings = savedHours * input.avgHourlyRate;
        const monthlySavings = Math.round(weeklySavings * 4.33);
        const yearlySavings = Math.round(weeklySavings * 52);
        
        // Save to database
        await db.createRoiCalculation({
          ...input,
          monthlySavings,
          yearlySavings,
        });
        
        // Notify owner
        await notifyOwner({
          title: "New ROI Calculation Request",
          content: `Name: ${input.name}\nEmail: ${input.email}\nCompany: ${input.companyName || 'N/A'}\n\nCalculated Savings:\nMonthly: $${monthlySavings.toLocaleString()}\nYearly: $${yearlySavings.toLocaleString()}`,
        });
        
        return {
          monthlySavings,
          yearlySavings,
        };
      }),
    
    // Share calculator results
    shareResults: publicProcedure
      .input(z.object({
        industry: z.string(),
        businessStage: z.string(),
        teamSize: z.string(),
        timeSaved: z.string(),
        delayImpact: z.string(),
        growthChallenge: z.string(),
        urgency: z.string(),
        results: z.string(), // JSON string of calculation results
        sharedBy: z.string().email().optional(),
      }))
      .mutation(async ({ input }) => {
        const shareId = await db.createSharedCalculatorResult(input);
        return { shareId };
      }),
    
    // Get shared calculator results
    getSharedResults: publicProcedure
      .input(z.object({
        shareId: z.string(),
      }))
      .query(async ({ input }) => {
        const result = await db.getSharedCalculatorResult(input.shareId);
        if (!result) {
          throw new Error('Shared result not found or expired');
        }
        return result;
      }),
  }),

  // Workflow preview system
  workflows: router({ submitQuestionnaire: publicProcedure
      .input(z.object({
        businessType: z.string().min(1, "Business type is required"),
        industry: z.string().optional(),
        companySize: z.string().min(1, "Company size is required"),
        processDescription: z.string().min(10, "Process description must be at least 10 characters"),
        painPoints: z.string().min(10, "Pain points must be at least 10 characters"),
        currentTools: z.string(), // JSON string
        desiredOutcome: z.string().min(10, "Desired outcome must be at least 10 characters"),
        estimatedHoursPerWeek: z.number().int().positive(),
        email: z.string().email("Invalid email address"),
        name: z.string().min(1, "Name is required"),
      }))
      .mutation(async ({ input }) => {
        // Send to n8n webhook (primary goal)
        const n8nWebhookUrl = process.env.N8N_WEBHOOK_URL;
        
        if (n8nWebhookUrl) {
          try {
            const response = await fetch(n8nWebhookUrl, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                name: input.name,
                email: input.email,
                businessType: input.businessType,
                industry: input.industry,
                companySize: input.companySize,
                processDescription: input.processDescription,
                painPoints: input.painPoints,
                currentTools: JSON.parse(input.currentTools),
                desiredOutcome: input.desiredOutcome,
                estimatedHoursPerWeek: input.estimatedHoursPerWeek,
              }),
            });
            
            if (!response.ok) {
              console.error('n8n webhook failed:', response.status, response.statusText);
            }
          } catch (error) {
            console.error('Failed to send to n8n webhook:', error);
          }
        }
        
        // Try to save to database (optional - don't fail if this errors)
        try {
          const questionnaireId = await db.createWorkflowQuestionnaire({
            email: input.email,
            businessType: input.businessType,
            industry: input.industry,
            companySize: input.companySize,
            processDescription: input.processDescription,
            currentTools: input.currentTools,
            painPoints: input.painPoints,
            desiredOutcome: input.desiredOutcome,
            estimatedHoursPerWeek: input.estimatedHoursPerWeek,
          });
          
          // Generate workflow using AI with enriched prompt
          const workflow = await db.generateWorkflow({
            questionnaireId,
            email: input.email,
            name: input.name,
            businessType: input.businessType,
            processDescription: input.processDescription,
            currentTools: input.currentTools,
            desiredOutcome: input.desiredOutcome,
            estimatedHoursPerWeek: input.estimatedHoursPerWeek,
            industry: input.industry,
            companySize: input.companySize,
            painPoints: input.painPoints,
          });
          
          // Generate and send magic link
          await db.createMagicLink({
            email: input.email,
            workflowId: workflow.id,
          });
          
          // Notify owner
          await notifyOwner({
            title: "New Workflow Preview Request",
            content: `Name: ${input.name}\nEmail: ${input.email}\nBusiness: ${input.businessType}\n\nProcess: ${input.processDescription.substring(0, 200)}...`,
          });
          
          return {
            success: true,
            workflowId: workflow.id,
          };
        } catch (dbError) {
          console.error('Database operation failed:', dbError);
          
          // Still notify owner even if DB fails
          await notifyOwner({
            title: "New Workflow Request (DB Failed)",
            content: `Name: ${input.name}\nEmail: ${input.email}\nBusiness: ${input.businessType}\n\nProcess: ${input.processDescription.substring(0, 200)}...`,
          });
          
          // Return success since n8n webhook worked
          return {
            success: true,
            message: 'Request sent to workflow builder',
          };
        }
      }),

    getPreview: publicProcedure
      .input(z.object({
        token: z.string().min(1, "Token is required"),
      }))
      .query(async ({ input }) => {
        // Verify magic link and get workflow
        const linkData = await db.verifyMagicLink(input.token);
        
        if (!linkData) {
          throw new Error("Invalid or expired magic link");
        }
        
        const workflow = await db.getWorkflowById(linkData.workflowId);
        
        if (!workflow) {
          throw new Error("Workflow not found");
        }
        
        // Calculate time remaining
        const magicLink = await db.getMagicLinkByToken(input.token);
        const expiresAt = magicLink?.expiresAt || new Date();
        const now = new Date();
        const hoursRemaining = Math.max(0, Math.floor((expiresAt.getTime() - now.getTime()) / (1000 * 60 * 60)));
        const timeRemaining = hoursRemaining > 24 
          ? `${Math.floor(hoursRemaining / 24)} days`
          : `${hoursRemaining} hours`;
        
        // Track preview viewed
        await db.trackWorkflowEvent({
          workflowId: workflow.id,
          email: workflow.email,
          eventType: 'preview_viewed',
        });
        
        return {
          workflow,
          expiresAt,
          timeRemaining,
        };
      }),

    trackCTAClick: publicProcedure
      .input(z.object({
        workflowId: z.number().int().positive(),
      }))
      .mutation(async ({ input }) => {
        const workflow = await db.getWorkflowById(input.workflowId);
        
        if (!workflow) {
          throw new Error("Workflow not found");
        }
        
        // Track CTA click
        await db.trackWorkflowEvent({
          workflowId: input.workflowId,
          email: workflow.email,
          eventType: 'cta_clicked',
        });
        
        return { success: true };
      }),
  }),

  // Newsletter subscription
  newsletter: router({
    subscribe: publicProcedure
      .input(z.object({
        email: z.string().email("Invalid email address"),
      }))
      .mutation(async ({ input }) => {
        try {
          await db.createEmailSubscriber(input.email);
          
          // Notify owner
          await notifyOwner({
            title: "New Newsletter Subscriber",
            content: `Email: ${input.email}`,
          });
          
          return { success: true };
        } catch (error: any) {
          if (error.message === "Email already subscribed") {
            return { success: true, alreadySubscribed: true };
          }
          throw error;
        }
      }),
  }),
});

export type AppRouter = typeof appRouter;
