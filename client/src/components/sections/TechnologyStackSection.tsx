import { Workflow, Brain, Database, MessageSquare, Cloud, ShoppingCart, Kanban } from 'lucide-react';

export default function TechnologyStackSection() {
  const techCategories = [
    {
      icon: Workflow,
      title: 'Core Platform',
      description: 'Built on n8n, the most flexible open-source automation platform',
      tools: 'n8n, Self-hosted Infrastructure',
    },
    {
      icon: Brain,
      title: 'AI Integration',
      description: 'Leverage cutting-edge AI models for intelligent automation',
      tools: 'OpenAI GPT-4, Anthropic Claude, Custom Models',
    },
    {
      icon: Database,
      title: 'CRM & Databases',
      description: 'Connect and sync your customer data across all platforms',
      tools: 'Salesforce, HubSpot, Pipedrive, PostgreSQL, MySQL, MongoDB',
    },
    {
      icon: MessageSquare,
      title: 'Communication',
      description: 'Automate messaging across your team communication tools',
      tools: 'Slack, Microsoft Teams, Gmail, Outlook',
    },
    {
      icon: Cloud,
      title: 'Storage & Files',
      description: 'Seamlessly manage files across cloud storage platforms',
      tools: 'Google Drive, Dropbox, AWS S3, OneDrive',
    },
    {
      icon: ShoppingCart,
      title: 'E-commerce',
      description: 'Streamline your online store operations and payments',
      tools: 'Shopify, WooCommerce, Stripe, PayPal',
    },
    {
      icon: Kanban,
      title: 'Project Management',
      description: 'Keep your projects in sync across management platforms',
      tools: 'Asana, Trello, Monday.com, Jira',
    },
  ];

  return (
    <section className="section bg-background" id="technology">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Technology <span className="gradient-text">Stack</span>
          </h2>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            We integrate with the tools you already use
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 relative">
          {/* Gradient glows */}
          <div className="absolute -top-10 right-1/4 w-[450px] h-[450px] bg-cyan-500/12 rounded-full blur-[140px] pointer-events-none"></div>
          <div className="absolute bottom-0 left-1/4 w-[450px] h-[450px] bg-purple-600/12 rounded-full blur-[140px] pointer-events-none"></div>
          
          {techCategories.map((category, index) => {
            const Icon = category.icon;
            return (
              <div
                key={index}
                className="group p-8 rounded-2xl bg-slate-800/50 border border-violet-500/30 hover:border-violet-500/60 hover:bg-slate-800 hover:scale-105 transition-all duration-300 hover:shadow-2xl hover:shadow-violet-900/20"
              >
                <div className="w-14 h-14 rounded-lg bg-primary/20 flex items-center justify-center group-hover:scale-110 transition-transform mb-4">
                  <Icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">{category.title}</h3>
                <p className="text-foreground/70 mb-4">{category.description}</p>
                <p className="text-sm text-foreground/50">{category.tools}</p>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-16">
          <p className="text-foreground/60">
            ...and <strong className="text-primary">500+ more integrations</strong> through n8n's extensive integration library
          </p>
        </div>
      </div>
    </section>
  );
}
