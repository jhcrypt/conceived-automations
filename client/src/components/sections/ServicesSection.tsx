import {
  Workflow,
  Brain,
  Database,
  Wrench,
  PhoneCall,
  UserCheck,
  CalendarCheck,
  MessageSquareMore,
} from 'lucide-react';
import { motion } from 'framer-motion';

export default function ServicesSection() {
  const products = [
    {
      icon: <PhoneCall className="w-8 h-8 text-cyan-400" />,
      title: 'AI Voice Agent',
      desc: 'Answers calls 24/7, handles FAQs, qualifies prospects, and routes opportunities automatically.',
      tags: ['Inbound calls', 'Outbound follow-up', 'Lead routing'],
    },
    {
      icon: <UserCheck className="w-8 h-8 text-violet-400" />,
      title: 'Lead Qualification Agent',
      desc: 'Scores prospects based on fit, budget, urgency, and buying intent before they reach your team.',
      tags: ['Lead scoring', 'Qualification logic', 'Buyer intent'],
    },
    {
      icon: <CalendarCheck className="w-8 h-8 text-cyan-400" />,
      title: 'Appointment Agent',
      desc: 'Books qualified leads directly into your calendar based on availability, service type, and rules.',
      tags: ['Calendar booking', 'Routing rules', 'No-show reduction'],
    },
    {
      icon: <MessageSquareMore className="w-8 h-8 text-violet-400" />,
      title: 'Follow-Up Agent',
      desc: 'Runs SMS, email, and missed-call recovery workflows that keep leads engaged until they convert.',
      tags: ['SMS follow-up', 'Email nurture', 'Missed-call recovery'],
    },
  ];

  const services = [
    {
      icon: <Workflow className="w-8 h-8 text-violet-400" />,
      title: 'Custom Workflow Automation',
      desc: 'Transform your business processes with tailored n8n workflows that connect all your tools and eliminate manual work.',
      tags: ['n8n implementation', 'Process mapping', 'System integration'],
    },
    {
      icon: <Brain className="w-8 h-8 text-cyan-400" />,
      title: 'AI Agent Integration',
      desc: 'Harness the power of AI with intelligent agents that make decisions, process information, and automate complex tasks.',
      tags: ['ChatGPT & Claude', 'Decision-making', 'NLP automation'],
    },
    {
      icon: <Database className="w-8 h-8 text-violet-400" />,
      title: 'System Integrations',
      desc: 'Connect the unconnected. We build bridges between legacy systems and modern SaaS platforms.',
      tags: ['Webhooks', 'SQL/NoSQL', 'Data Migration'],
    },
    {
      icon: <Wrench className="w-8 h-8 text-cyan-400" />,
      title: 'Consulting & Strategy',
      desc: 'Not sure what to automate? We audit your operations and provide a roadmap for maximum ROI.',
      tags: ['Audits', 'ROI Analysis', 'Blueprinting'],
    },
  ];

  const renderCards = (items: typeof products) => (
    <div className="grid md:grid-cols-2 gap-8">
      {items.map((item, idx) => (
        <motion.div
          key={item.title}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: idx * 0.1 }}
          className="group p-8 rounded-2xl bg-slate-800/50 border border-violet-500/30 hover:border-violet-500/60 hover:bg-slate-800 hover:scale-105 transition-all duration-300 hover:shadow-2xl hover:shadow-violet-900/20"
        >
          <div className="mb-6 p-4 bg-slate-950 rounded-xl w-fit group-hover:scale-110 transition-transform duration-300 border border-white/5">
            {item.icon}
          </div>
          <h3 className="text-2xl font-bold text-white mb-3">{item.title}</h3>
          <p className="text-slate-400 mb-6 leading-relaxed">{item.desc}</p>
          <div className="flex flex-wrap gap-2">
            {item.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs font-semibold text-slate-300 bg-white/5 px-3 py-1 rounded-full border border-white/5"
              >
                {tag}
              </span>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  );

  return (
    <section id="services" className="py-24 bg-slate-900 relative">
      {/* Gradient glows */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-violet-600 rounded-full blur-[100px]"></div>
        <div className="absolute top-1/2 -left-24 w-72 h-72 bg-cyan-600 rounded-full blur-[100px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-500/10 border border-violet-500/30 text-violet-200 text-sm font-semibold mb-6">
            Productized AI Agents
          </div>
          <h2 className="text-4xl font-bold text-white mb-4">AI Lead Conversion Products</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Start with a focused AI agent for the front end of your sales process, then connect it to the workflows and systems your business already uses.
          </p>
        </div>

        {renderCards(products)}

        <div className="text-center mt-24 mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-200 text-sm font-semibold mb-6">
            Custom Automation Services
          </div>
          <h2 className="text-4xl font-bold text-white mb-4">Automation Support Behind the Agents</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            For businesses that need more than a ready-made agent, we design the workflows, integrations, and automation strategy around your operations.
          </p>
        </div>

        {renderCards(services)}
      </div>
    </section>
  );
}
