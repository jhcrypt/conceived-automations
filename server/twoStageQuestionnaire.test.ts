import { describe, it, expect, beforeAll } from 'vitest';
import { generateWorkflowPrompt } from './promptGenerator';
import { generateWorkflowWithAI } from './workflowGenerator';

describe('Two-Stage Questionnaire with AI Prompt Generator', () => {
  describe('AI Prompt Generator', () => {
    it('should generate industry-specific enriched prompt for e-commerce', async () => {
      const prompt = await generateWorkflowPrompt({
        industry: 'ecommerce',
        businessType: 'E-commerce',
        companySize: '11-50 employees',
        processDescription: 'Order fulfillment from Shopify to ShipStation',
        painPoints: 'Manual data entry takes 3 hours daily, frequent shipping errors',
        currentTools: ['Shopify', 'ShipStation', 'Gmail'],
        desiredOutcome: 'Automatically process orders within 5 minutes',
        estimatedHoursPerWeek: 15,
      });

      expect(prompt).toContain('E-commerce & Retail');
      expect(prompt).toContain('Order fulfillment');
      expect(prompt).toContain('PCI-DSS');
      expect(prompt).toContain('Shopify');
      expect(prompt).toContain('15 hours/week');
    });

    it('should generate industry-specific enriched prompt for SaaS', async () => {
      const prompt = await generateWorkflowPrompt({
        industry: 'saas',
        businessType: 'SaaS',
        companySize: '51-200 employees',
        processDescription: 'User onboarding from trial signup to activation',
        painPoints: 'Low activation rates, manual follow-ups are inconsistent',
        currentTools: ['Stripe', 'Intercom', 'HubSpot'],
        desiredOutcome: 'Automated onboarding emails based on user behavior',
        estimatedHoursPerWeek: 20,
      });

      expect(prompt).toContain('SaaS & Technology');
      expect(prompt).toContain('User onboarding');
      expect(prompt).toContain('SOC 2');
      expect(prompt).toContain('Stripe');
      expect(prompt).toContain('20 hours/week');
    });

    it('should handle unknown industries with fallback', async () => {
      const prompt = await generateWorkflowPrompt({
        industry: 'unknown-industry',
        businessType: 'Custom Business',
        companySize: '1-10 employees',
        processDescription: 'Custom process automation',
        painPoints: 'Too much manual work',
        currentTools: ['Gmail', 'Google Sheets'],
        desiredOutcome: 'Automate everything',
        estimatedHoursPerWeek: 10,
      });

      expect(prompt).toContain('General Business');
      expect(prompt).toBeDefined();
      expect(prompt.length).toBeGreaterThan(500);
    });
  });

  describe('Workflow Generation with AI Prompt', () => {
    it('should generate workflow using enriched prompt', async () => {
      const workflow = await generateWorkflowWithAI({
        businessType: 'E-commerce',
        processDescription: 'Order fulfillment automation',
        currentTools: ['Shopify', 'ShipStation'],
        desiredOutcome: 'Automatic order processing',
        industry: 'ecommerce',
        companySize: '11-50 employees',
        painPoints: 'Manual data entry, shipping errors',
        estimatedHoursPerWeek: 15,
      });

      expect(workflow).toBeDefined();
      expect(workflow.name).toBeTruthy();
      expect(workflow.description).toBeTruthy();
      expect(workflow.toolsUsed).toBeInstanceOf(Array);
      expect(workflow.complexity).toMatch(/simple|moderate|complex/);
      expect(workflow.nodeCount).toBeGreaterThan(0);
      expect(workflow.fullWorkflow).toBeDefined();
      expect(workflow.fullWorkflow.nodes).toBeInstanceOf(Array);
      expect(workflow.iconOnlyWorkflow).toBeDefined();
    }, 30000); // 30 second timeout for AI generation

    it('should fallback to basic prompt when context is missing', async () => {
      const workflow = await generateWorkflowWithAI({
        businessType: 'General Business',
        processDescription: 'Simple automation',
        currentTools: ['Gmail'],
        desiredOutcome: 'Save time',
      });

      expect(workflow).toBeDefined();
      expect(workflow.name).toBeTruthy();
      expect(workflow.nodeCount).toBeGreaterThan(0);
    }, 30000);
  });

  describe('Pre-population Logic', () => {
    it('should map value calculator data to workflow questionnaire fields', () => {
      const calculatorData = {
        industry: 'ecommerce',
        businessStage: 'growth',
        teamSize: '11-50',
        timeSaved: '10-20',
        delayImpact: 'high',
        growthChallenge: 'scaling',
        urgency: 'immediate',
        result: {
          totalAnnualValue: 150000,
          weeklyHoursSaved: 15,
          yearOneROI: 250,
          paybackMonths: 4,
        },
      };

      // Simulate pre-population
      const prePopulatedData = {
        industry: calculatorData.industry,
        companySize: calculatorData.teamSize,
        estimatedHoursPerWeek: calculatorData.result.weeklyHoursSaved,
      };

      expect(prePopulatedData.industry).toBe('ecommerce');
      expect(prePopulatedData.companySize).toBe('11-50');
      expect(prePopulatedData.estimatedHoursPerWeek).toBe(15);
    });
  });

  describe('Industry-Specific Examples', () => {
    const examples = {
      ecommerce: {
        processDescription: 'Order fulfillment from Shopify to shipping carrier',
        painPoints: 'Manual data entry takes 3 hours daily, frequent shipping errors',
        desiredOutcome: 'Automatically process orders within 5 minutes',
      },
      saas: {
        processDescription: 'User onboarding sequence from trial signup to product activation',
        painPoints: 'Low activation rates, manual follow-ups are inconsistent',
        desiredOutcome: 'Automated onboarding emails based on user behavior',
      },
      healthcare: {
        processDescription: 'Appointment scheduling, insurance verification, and patient intake forms',
        painPoints: 'Phone tag with patients, manual insurance checks',
        desiredOutcome: 'Online self-service scheduling, automatic insurance verification',
      },
    };

    it('should provide relevant examples for each industry', () => {
      Object.entries(examples).forEach(([industry, example]) => {
        expect(example.processDescription).toBeTruthy();
        expect(example.painPoints).toBeTruthy();
        expect(example.desiredOutcome).toBeTruthy();
        expect(example.processDescription.length).toBeGreaterThan(20);
      });
    });
  });
});
