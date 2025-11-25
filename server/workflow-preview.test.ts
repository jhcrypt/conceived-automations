import { describe, it, expect, beforeAll } from 'vitest';
import { appRouter } from '../server/routers';
import type { TrpcContext } from '../server/_core/trpc';

// Mock context
const mockContext: TrpcContext = {
  user: null,
  req: {} as any,
  res: {
    clearCookie: () => {},
  } as any,
};

const caller = appRouter.createCaller(mockContext);

describe('Workflow Preview System', () => {
  let workflowId: number;
  let magicToken: string;

  it('should submit questionnaire and generate workflow', async () => {
    const result = await caller.workflows.submitQuestionnaire({
      businessType: 'SaaS',
      industry: 'B2B Software',
      companySize: '11-50',
      processDescription: 'We manually process customer onboarding, send welcome emails, create accounts in multiple systems, and set up initial configurations. This takes 2-3 hours per customer.',
      painPoints: 'Too time-consuming, prone to errors, inconsistent experience, delays in getting customers started',
      currentTools: JSON.stringify(['Stripe', 'HubSpot', 'Slack', 'Gmail']),
      desiredOutcome: 'Automated customer onboarding that creates accounts, sends emails, and notifies team instantly',
      estimatedHoursPerWeek: 15,
      email: 'test@example.com',
      name: 'Test User',
    });

    expect(result).toBeDefined();
    expect(result.success).toBe(true);
    expect(result.workflowId).toBeTypeOf('number');
    
    workflowId = result.workflowId;
    console.log('✅ Workflow generated successfully:', workflowId);
  }, 60000); // 60 second timeout for AI generation

  it('should fail with invalid questionnaire data', async () => {
    await expect(
      caller.workflows.submitQuestionnaire({
        businessType: '',
        companySize: '11-50',
        processDescription: 'short', // Too short
        painPoints: 'too short',
        currentTools: '[]',
        desiredOutcome: 'short',
        estimatedHoursPerWeek: 10,
        email: 'invalid-email', // Invalid email
        name: 'Test',
      } as any)
    ).rejects.toThrow();
    
    console.log('✅ Validation working correctly');
  });
});

describe('Magic Link System', () => {
  it('should reject invalid magic link token', async () => {
    await expect(
      caller.workflows.getPreview({ token: 'invalid-token-12345' })
    ).rejects.toThrow('Invalid or expired magic link');
    
    console.log('✅ Magic link validation working');
  });
});

describe('Workflow Generation', () => {
  it('should generate workflow with AI', async () => {
    // This tests the AI generation directly
    const { generateWorkflowWithAI } = await import('../server/workflowGenerator');
    
    const workflow = await generateWorkflowWithAI({
      businessType: 'E-commerce',
      processDescription: 'Process orders from Shopify and send to fulfillment',
      currentTools: ['Shopify', 'ShipStation', 'Gmail'],
      desiredOutcome: 'Automated order processing and fulfillment',
    });

    expect(workflow).toBeDefined();
    expect(workflow.name).toBeTypeOf('string');
    expect(workflow.description).toBeTypeOf('string');
    expect(workflow.toolsUsed).toBeInstanceOf(Array);
    expect(workflow.complexity).toMatch(/simple|moderate|complex/);
    expect(workflow.nodeCount).toBeGreaterThan(0);
    expect(workflow.fullWorkflow.nodes).toBeInstanceOf(Array);
    expect(workflow.iconOnlyWorkflow.nodes).toBeInstanceOf(Array);
    
    // Verify icon-only version has no labels
    workflow.iconOnlyWorkflow.nodes.forEach((node: any) => {
      expect(node.label).toBeUndefined();
      expect(node.parameters).toBeUndefined();
      expect(node.icon).toBeDefined();
    });
    
    console.log('✅ AI workflow generation working');
    console.log(`Generated workflow: ${workflow.name}`);
    console.log(`Complexity: ${workflow.complexity}, Nodes: ${workflow.nodeCount}`);
  }, 60000); // 60 second timeout for AI
});
