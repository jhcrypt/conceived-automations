import { invokeLLM } from "./_core/llm";

interface WorkflowGenerationInput {
  businessType: string;
  processDescription: string;
  currentTools: string[];
  desiredOutcome: string;
  // Additional context for AI prompt generation
  industry?: string;
  companySize?: string;
  painPoints?: string;
  estimatedHoursPerWeek?: number;
}

interface WorkflowNode {
  id: string;
  type: string;
  icon: string;
  position: { x: number; y: number };
  connections: string[];
  // Full version includes labels and parameters
  label?: string;
  parameters?: Record<string, any>;
}

interface GeneratedWorkflow {
  name: string;
  description: string;
  toolsUsed: string[];
  complexity: 'simple' | 'moderate' | 'complex';
  nodeCount: number;
  fullWorkflow: {
    nodes: WorkflowNode[];
    metadata: Record<string, any>;
  };
  iconOnlyWorkflow: {
    nodes: Omit<WorkflowNode, 'label' | 'parameters'>[];
    metadata: Record<string, any>;
  };
}

/**
 * Generate a workflow using AI based on user requirements
 */
export async function generateWorkflowWithAI(
  input: WorkflowGenerationInput
): Promise<GeneratedWorkflow> {
  // Use AI prompt generator if we have industry context
  let prompt: string;
  
  if (input.industry && input.companySize && input.painPoints) {
    const { generateWorkflowPrompt } = await import('./promptGenerator');
    prompt = await generateWorkflowPrompt({
      industry: input.industry,
      businessType: input.businessType,
      companySize: input.companySize,
      processDescription: input.processDescription,
      painPoints: input.painPoints,
      currentTools: input.currentTools,
      desiredOutcome: input.desiredOutcome,
      estimatedHoursPerWeek: input.estimatedHoursPerWeek || 0,
    });
  } else {
    // Fallback to basic prompt
    prompt = `You are an expert n8n workflow automation architect. Generate a detailed workflow automation based on the following requirements:

Business Type: ${input.businessType}
Process to Automate: ${input.processDescription}
Current Tools: ${input.currentTools.join(', ')}
Desired Outcome: ${input.desiredOutcome}

Create a comprehensive n8n workflow that:
1. Uses the tools they already have when possible
2. Follows best practices for automation
3. Is practical and implementable
4. Includes proper error handling and notifications
5. Optimizes for efficiency and reliability

Provide the workflow structure with nodes, connections, and configuration. Each node should have:
- A unique ID
- A type (trigger, action, condition, etc.)
- An appropriate emoji icon
- Position coordinates for visualization
- Connections to other nodes
- Labels describing what the node does
- Parameters/configuration (API keys should be placeholders)

Return ONLY valid JSON matching this structure:
{
  "name": "Workflow name",
  "description": "Brief description",
  "toolsUsed": ["tool1", "tool2"],
  "complexity": "simple|moderate|complex",
  "nodes": [
    {
      "id": "node1",
      "type": "trigger",
      "icon": "⚡",
      "label": "Form Submission Trigger",
      "position": { "x": 100, "y": 100 },
      "connections": ["node2"],
      "parameters": {
        "webhookUrl": "{{WEBHOOK_URL}}",
        "method": "POST"
      }
    }
  ]
}`;
  }

  // Send enriched prompt to n8n webhook for workflow creation
  try {
    const webhookUrl = 'https://02c97b3a4377.ngrok-free.app/webhook/04a65da8-31a4-4912-a2c4-5a82024d0593';
    
    const webhookPayload = {
      enrichedPrompt: prompt,
      questionnaire: {
        businessType: input.businessType,
        processDescription: input.processDescription,
        currentTools: input.currentTools,
        desiredOutcome: input.desiredOutcome,
        industry: input.industry,
        companySize: input.companySize,
        painPoints: input.painPoints,
        estimatedHoursPerWeek: input.estimatedHoursPerWeek,
      },
    };

    const webhookResponse = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(webhookPayload),
    });

    if (!webhookResponse.ok) {
      throw new Error(`Webhook returned ${webhookResponse.status}: ${webhookResponse.statusText}`);
    }

    const workflowData = await webhookResponse.json();

    // Parse and validate the workflow structure from n8n
    // Expecting the same structure as AI would return
    
    /* OLD AI GENERATION CODE - Replaced with webhook
    const response = await invokeLLM({
      messages: [
        {
          role: "system",
          content: "You are an expert n8n workflow automation architect. Always respond with valid JSON only, no markdown formatting."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      response_format: {
        type: "json_schema",
        json_schema: {
          name: "workflow_structure",
          strict: true,
          schema: {
            type: "object",
            properties: {
              name: { type: "string", description: "Workflow name" },
              description: { type: "string", description: "Brief description" },
              toolsUsed: {
                type: "array",
                items: { type: "string" },
                description: "List of tools used in the workflow"
              },
              complexity: {
                type: "string",
                enum: ["simple", "moderate", "complex"],
                description: "Workflow complexity level"
              },
              nodes: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    id: { type: "string" },
                    type: { type: "string" },
                    icon: { type: "string" },
                    label: { type: "string" },
                    position: {
                      type: "object",
                      properties: {
                        x: { type: "number" },
                        y: { type: "number" }
                      },
                      required: ["x", "y"],
                      additionalProperties: false
                    },
                    connections: {
                      type: "array",
                      items: { type: "string" }
                    },
                    parameters: {
                      type: "object",
                      additionalProperties: true
                    }
                  },
                  required: ["id", "type", "icon", "label", "position", "connections"],
                  additionalProperties: false
                }
              }
            },
            required: ["name", "description", "toolsUsed", "complexity", "nodes"],
            additionalProperties: false
          }
        }
      }
    });

    const content = response.choices[0]?.message?.content;
    if (!content) {
      throw new Error("No response from AI");
    }

    // Handle content as string (it should be JSON from structured output)
    const contentStr = typeof content === 'string' ? content : JSON.stringify(content);
    const workflowData = JSON.parse(contentStr);
    END OF OLD AI CODE */

    // Create icon-only version (remove labels and parameters)
    const iconOnlyNodes = workflowData.nodes.map((node: WorkflowNode) => ({
      id: node.id,
      type: node.type,
      icon: node.icon,
      position: node.position,
      connections: node.connections,
    }));

    return {
      name: workflowData.name,
      description: workflowData.description,
      toolsUsed: workflowData.toolsUsed,
      complexity: workflowData.complexity,
      nodeCount: workflowData.nodes.length,
      fullWorkflow: {
        nodes: workflowData.nodes,
        metadata: {
          generatedAt: new Date().toISOString(),
          version: '1.0',
        },
      },
      iconOnlyWorkflow: {
        nodes: iconOnlyNodes,
        metadata: {
          watermark: 'Conceived Automations - Workflow Preview',
          restricted: true,
        },
      },
    };
  } catch (error) {
    console.error('[Workflow Generator] Error:', error);
    
    // Fallback to a simple template workflow if AI fails
    return generateFallbackWorkflow(input);
  }
}

/**
 * Generate a simple fallback workflow if AI generation fails
 */
function generateFallbackWorkflow(input: WorkflowGenerationInput): GeneratedWorkflow {
  const nodes: WorkflowNode[] = [
    {
      id: 'trigger',
      type: 'trigger',
      icon: '⚡',
      label: 'Trigger Event',
      position: { x: 100, y: 100 },
      connections: ['process'],
      parameters: { type: 'webhook' },
    },
    {
      id: 'process',
      type: 'action',
      icon: '⚙️',
      label: 'Process Data',
      position: { x: 300, y: 100 },
      connections: ['notify'],
      parameters: {},
    },
    {
      id: 'notify',
      type: 'action',
      icon: '📧',
      label: 'Send Notification',
      position: { x: 500, y: 100 },
      connections: [],
      parameters: {},
    },
  ];

  const iconOnlyNodes = nodes.map((node) => ({
    id: node.id,
    type: node.type,
    icon: node.icon,
    position: node.position,
    connections: node.connections,
  }));

  return {
    name: `${input.businessType} Automation`,
    description: `Automated workflow for: ${input.processDescription.substring(0, 100)}...`,
    toolsUsed: input.currentTools.slice(0, 3),
    complexity: 'simple',
    nodeCount: nodes.length,
    fullWorkflow: {
      nodes,
      metadata: {
        generatedAt: new Date().toISOString(),
        version: '1.0',
        fallback: true,
      },
    },
    iconOnlyWorkflow: {
      nodes: iconOnlyNodes,
      metadata: {
        watermark: 'Conceived Automations - Workflow Preview',
        restricted: true,
      },
    },
  };
}
