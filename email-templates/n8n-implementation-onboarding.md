# n8n Implementation Onboarding Email Template

**Purpose:** Sent to clients after they've signed up for n8n automation implementation services. Gathers all necessary information for configuration and setup.

**When to Send:** Immediately after contract signing or payment confirmation

---

## Email Subject

"Let's Get Started: Information Needed for Your n8n Automation Setup"

---

## Email Body

Dear [Client Name],

Thank you for choosing us to implement an n8n automation system for your business. We're excited to help streamline your workflows and increase operational efficiency through intelligent automation.

To ensure we design and configure a solution that perfectly aligns with your business needs, we'll need to gather some essential information from you. This will help us create a tailored automation system that integrates seamlessly with your existing tools and processes.

## Required Information for Configuration

### Business & Workflow Information

- **Primary business processes** you want to automate (e.g., lead management, customer onboarding, data synchronization, reporting)
- **Current pain points** or bottlenecks in your workflows
- **Expected volume** of transactions/records processed monthly
- **Team members** who will interact with or manage the automation system
- **Success metrics** - how you'll measure the effectiveness of automation

### Technical Environment

- **Hosting preference**: Self-hosted (on-premises/cloud) or n8n Cloud
- **Server specifications** (if self-hosted): OS, memory, storage capacity
- **Network environment**: Any firewall rules, VPN requirements, or security restrictions
- **Existing infrastructure**: Cloud provider (AWS, Azure, GCP, etc.) if applicable

### Integration Requirements

Please provide details for each system you'd like to connect:

- **CRM Platform** (Salesforce, HubSpot, Pipedrive, etc.)
    - Account credentials or API keys
    - Specific objects/data you want to sync
- **Communication Tools** (Slack, Microsoft Teams, email services)
    - Workspace details and webhook URLs
    - Notification preferences
- **Database Systems** (PostgreSQL, MySQL, MongoDB, etc.)
    - Connection strings and credentials
    - Schema information for relevant tables
- **Cloud Storage** (Google Drive, Dropbox, OneDrive, AWS S3)
    - Access credentials or OAuth tokens
    - Folder structures and permissions
- **Payment & E-commerce** (Stripe, PayPal, Shopify, WooCommerce)
    - API credentials
    - Webhook endpoints
- **Project Management** (Asana, Trello, Monday.com, Jira)
    - API keys and workspace IDs
    - Specific boards or projects to integrate
- **Marketing Automation** (Mailchimp, ActiveCampaign, SendGrid)
    - API keys and list IDs
    - Campaign templates
- **Other third-party applications** currently in use

### Security & Compliance

- **Data sensitivity level**: Any PII, financial data, or regulated information
- **Compliance requirements**: GDPR, HIPAA, SOC 2, or industry-specific regulations
- **Authentication preferences**: OAuth, API keys, basic auth, or SSO requirements
- **Data retention policies**: How long automated data should be stored
- **Access control needs**: User roles and permissions structure

### Automation Specifications

- **Trigger conditions**: What events should initiate workflows (time-based, webhook, manual)
- **Business logic**: Any conditional rules or decision trees to implement
- **Error handling preferences**: Notification methods, retry logic, fallback procedures
- **Testing environment**: Whether you need separate staging/production instances

### Support & Maintenance

- **Preferred response time** for support requests
- **Maintenance window** preferences for updates and changes
- **Documentation needs**: Training materials, workflow diagrams, or user guides
- **Monitoring requirements**: Logging level, alert thresholds, reporting frequency

## Next Steps

1. **Review this list** and compile the relevant information for your business
2. **Schedule a discovery call** with our team to discuss your requirements in detail
3. **Provide access credentials** securely (we'll share a secure method for sensitive information)
4. **Review and approve** the proposed automation architecture before implementation

We recommend scheduling a 60-90 minute discovery call to walk through these requirements together. This ensures we capture all the nuances of your business processes and can provide accurate timelines and recommendations.

Please reply to this email with your availability for a discovery call in the coming week, and feel free to start gathering any of the information listed above that you have readily available.

If you have any questions or need clarification on any of these items, don't hesitate to reach out. We're here to make this process as smooth as possible.

Looking forward to building a powerful automation solution for your business.

Best regards,

[Your Name]  
Conceived Automations  
(856) 383-5528  
conceived.automations@gmail.com

---

## Variables to Replace

- `[Client Name]` - Client's first name or full name
- `[Your Name]` - Name of the person handling the implementation

---

## Follow-up Sequence

If no response after:
- **3 days**: Send friendly reminder
- **7 days**: Send second reminder with offer to schedule call directly
- **14 days**: Final check-in with simplified information request

---

## Notes

- This template is for **post-sale** onboarding (after client has committed)
- For **pre-sale** workflow preview magic links, use the separate magic link email template
- Consider creating a secure form or portal for collecting sensitive credentials instead of email
- Attach a PDF checklist version of this information for easy printing/sharing
