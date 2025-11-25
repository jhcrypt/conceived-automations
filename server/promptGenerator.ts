/**
 * AI Prompt Generator for Workflow Automation
 * 
 * Translates business questionnaire responses into detailed, context-rich prompts
 * for AI workflow generation. Adds industry-specific knowledge, best practices,
 * and technical requirements.
 */

import { invokeLLM } from "./_core/llm";

// Industry-specific knowledge base
const INDUSTRY_KNOWLEDGE = {
  ecommerce: {
    name: 'E-commerce & Retail',
    commonProcesses: ['Order fulfillment', 'Inventory management', 'Customer service', 'Marketing automation'],
    bestPractices: [
      'Use idempotency keys to prevent duplicate order processing',
      'Implement retry logic for payment and shipping API failures',
      'Add fraud detection for high-value orders',
      'Include inventory reservation to prevent overselling',
      'Set up abandoned cart recovery workflows'
    ],
    compliance: ['PCI-DSS for payment data', 'GDPR for customer data', 'Return policy automation'],
    typicalTools: ['Shopify', 'WooCommerce', 'Stripe', 'ShipStation', 'Klaviyo'],
    performanceTargets: { responseTime: '30s', uptime: '99.5%', throughput: '50-500 orders/day' }
  },
  saas: {
    name: 'SaaS & Technology',
    commonProcesses: ['User onboarding', 'Trial management', 'Billing automation', 'Support ticketing'],
    bestPractices: [
      'Implement progressive onboarding with milestone tracking',
      'Set up usage-based billing with metering',
      'Create automated health score monitoring',
      'Build churn prediction workflows',
      'Automate feature announcement campaigns'
    ],
    compliance: ['SOC 2 audit trails', 'GDPR data processing', 'API rate limiting'],
    typicalTools: ['Stripe', 'Intercom', 'Segment', 'HubSpot', 'Zendesk'],
    performanceTargets: { responseTime: '5s', uptime: '99.9%', throughput: '1000+ events/day' }
  },
  professional_services: {
    name: 'Professional Services',
    commonProcesses: ['Client onboarding', 'Project management', 'Time tracking', 'Invoicing'],
    bestPractices: [
      'Automate client intake forms and document collection',
      'Set up project milestone notifications',
      'Create time tracking reminders and reports',
      'Implement automated invoice generation and follow-ups',
      'Build client satisfaction survey workflows'
    ],
    compliance: ['Client confidentiality agreements', 'Data retention policies', 'Billing transparency'],
    typicalTools: ['QuickBooks', 'Asana', 'Calendly', 'DocuSign', 'Slack'],
    performanceTargets: { responseTime: '60s', uptime: '99%', throughput: '10-100 projects/month' }
  },
  healthcare: {
    name: 'Healthcare & Wellness',
    commonProcesses: ['Appointment scheduling', 'Patient intake', 'Insurance verification', 'Follow-up care'],
    bestPractices: [
      'Implement HIPAA-compliant data handling',
      'Set up appointment reminder workflows (SMS/email)',
      'Automate insurance eligibility checks',
      'Create patient intake form processing',
      'Build post-visit follow-up sequences'
    ],
    compliance: ['HIPAA compliance for PHI', 'Consent management', 'Audit logging'],
    typicalTools: ['Epic', 'Cerner', 'Athenahealth', 'Twilio', 'Google Calendar'],
    performanceTargets: { responseTime: '15s', uptime: '99.9%', throughput: '50-200 appointments/day' }
  },
  real_estate: {
    name: 'Real Estate',
    commonProcesses: ['Lead qualification', 'Property showings', 'Document management', 'Transaction coordination'],
    bestPractices: [
      'Automate lead scoring and routing',
      'Set up showing confirmation and reminder workflows',
      'Create document signing and tracking automation',
      'Implement transaction milestone notifications',
      'Build client communication sequences'
    ],
    compliance: ['Fair Housing Act compliance', 'Disclosure requirements', 'Data privacy'],
    typicalTools: ['Zillow', 'DocuSign', 'Follow Up Boss', 'Calendly', 'Gmail'],
    performanceTargets: { responseTime: '30s', uptime: '99%', throughput: '20-100 leads/week' }
  },
  finance: {
    name: 'Finance & Banking',
    commonProcesses: ['Account opening', 'Transaction monitoring', 'Compliance reporting', 'Customer verification'],
    bestPractices: [
      'Implement KYC/AML verification workflows',
      'Set up transaction anomaly detection',
      'Automate regulatory reporting',
      'Create fraud alert notifications',
      'Build customer due diligence processes'
    ],
    compliance: ['KYC/AML regulations', 'SOX compliance', 'Data encryption standards'],
    typicalTools: ['Plaid', 'Stripe', 'QuickBooks', 'Salesforce', 'Twilio'],
    performanceTargets: { responseTime: '10s', uptime: '99.95%', throughput: '500+ transactions/day' }
  },
  manufacturing: {
    name: 'Manufacturing & Distribution',
    commonProcesses: ['Inventory tracking', 'Order processing', 'Supply chain coordination', 'Quality control'],
    bestPractices: [
      'Implement real-time inventory synchronization',
      'Set up low-stock alerts and reorder automation',
      'Create quality control checkpoint workflows',
      'Automate supplier communication',
      'Build production scheduling optimization'
    ],
    compliance: ['ISO quality standards', 'Safety regulations', 'Environmental compliance'],
    typicalTools: ['NetSuite', 'SAP', 'QuickBooks', 'Slack', 'Google Sheets'],
    performanceTargets: { responseTime: '45s', uptime: '99%', throughput: '100-500 orders/day' }
  },
  other: {
    name: 'General Business',
    commonProcesses: ['Lead management', 'Customer communication', 'Data processing', 'Reporting'],
    bestPractices: [
      'Implement data validation and error handling',
      'Set up notification workflows for critical events',
      'Create automated reporting and analytics',
      'Build customer communication sequences',
      'Automate routine administrative tasks'
    ],
    compliance: ['GDPR/CCPA data privacy', 'Business record retention', 'Security best practices'],
    typicalTools: ['Gmail', 'Google Sheets', 'Slack', 'Zapier', 'Airtable'],
    performanceTargets: { responseTime: '30s', uptime: '99%', throughput: 'Variable' }
  }
};

/**
 * Generate enriched prompt for workflow creation
 */
export async function generateWorkflowPrompt(input: {
  industry: string;
  businessType: string;
  companySize: string;
  processDescription: string;
  painPoints: string;
  currentTools: string[];
  desiredOutcome: string;
  estimatedHoursPerWeek: number;
}): Promise<string> {
  
  const industryKey = input.industry.toLowerCase().replace(/[^a-z]/g, '');
  const industryInfo = INDUSTRY_KNOWLEDGE[industryKey as keyof typeof INDUSTRY_KNOWLEDGE] || INDUSTRY_KNOWLEDGE.other;
  
  const promptTemplate = `You are an expert n8n workflow automation architect specializing in ${industryInfo.name}.

BUSINESS PROFILE:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Industry: ${industryInfo.name}
Business Type: ${input.businessType}
Company Size: ${input.companySize}

CURRENT SITUATION:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Time Investment: ${input.estimatedHoursPerWeek} hours/week currently spent on manual work
Pain Points: ${input.painPoints}

Process Description:
${input.processDescription}

TECHNICAL ENVIRONMENT:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Current Tools: ${input.currentTools.join(', ')}
Integration Requirements: ${input.desiredOutcome}

Common ${industryInfo.name} Tools: ${industryInfo.typicalTools.join(', ')}

INDUSTRY-SPECIFIC REQUIREMENTS:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Common Processes in ${industryInfo.name}:
${industryInfo.commonProcesses.map(p => `• ${p}`).join('\n')}

Best Practices:
${industryInfo.bestPractices.map(bp => `• ${bp}`).join('\n')}

Compliance Requirements:
${industryInfo.compliance.map(c => `• ${c}`).join('\n')}

Performance Targets:
• Response Time: ${industryInfo.performanceTargets.responseTime}
• Uptime: ${industryInfo.performanceTargets.uptime}
• Throughput: ${industryInfo.performanceTargets.throughput}

WORKFLOW REQUIREMENTS:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Design a production-ready n8n workflow that:

1. **Trigger Setup**
   - Choose appropriate trigger type (webhook, schedule, email, form submission)
   - Configure trigger conditions and filters
   - Add trigger validation and error handling

2. **Data Processing**
   - Extract and transform data from ${input.currentTools.join(', ')}
   - Validate data quality and completeness
   - Handle edge cases and missing data

3. **Business Logic**
   - Implement conditional branching for different scenarios
   - Add decision nodes for routing and prioritization
   - Include loops for batch processing if needed

4. **Integrations**
   - Connect to: ${input.currentTools.join(', ')}
   - Implement API calls with proper authentication
   - Add rate limiting and retry logic

5. **Actions & Outputs**
   - Execute desired outcomes: ${input.desiredOutcome}
   - Update systems and databases
   - Generate notifications and reports

6. **Error Handling**
   - Implement try-catch blocks for critical operations
   - Add fallback workflows for failures
   - Set up error notifications (email/Slack)
   - Include retry logic with exponential backoff

7. **Monitoring & Logging**
   - Track workflow execution metrics
   - Log important events and decisions
   - Set up performance monitoring
   - Create daily/weekly summary reports

Generate a workflow that is:
✓ Production-ready and battle-tested
✓ Follows ${industryInfo.name} best practices
✓ Implements proper error handling
✓ Includes monitoring and alerting
✓ Optimized for the stated goals
✓ Scalable and maintainable

Return a detailed n8n workflow specification.`;

  return promptTemplate;
}
