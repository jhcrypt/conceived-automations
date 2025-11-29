import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: 'What is n8n and why use it?',
      answer: 'n8n is a powerful open-source workflow automation platform that connects your apps and services. We use it because it offers unlimited flexibility, no vendor lock-in, and can be self-hosted for complete data control. Unlike other tools, n8n doesn\'t charge per workflow execution, making it cost-effective as you scale.',
    },
    {
      question: 'How long does implementation take?',
      answer: 'Simple workflows can be implemented in 1-2 weeks. More complex projects with multiple integrations and AI components typically take 4-8 weeks. We start with a discovery phase to give you an accurate timeline based on your specific needs.',
    },
    {
      question: 'Do I need technical knowledge to use the automations?',
      answer: 'Not at all! We build and maintain everything for you. You\'ll receive training on how to monitor and use your workflows, but no coding or technical expertise is required. Our team handles all the technical complexity.',
    },
    {
      question: 'What happens if something breaks?',
      answer: 'All our plans include monitoring and support. We proactively monitor your workflows and fix issues before they impact your business. For urgent matters, our priority support clients get response within hours. We also provide detailed documentation and backup systems.',
    },
    {
      question: 'Can you integrate with my specific tools?',
      answer: 'Most likely! n8n supports 500+ integrations out of the box, and we can build custom integrations for proprietary systems. During our discovery call, we\'ll review your tech stack and confirm compatibility.',
    },
    {
      question: 'How secure is my data?',
      answer: 'Very secure. We can deploy n8n on your own infrastructure (self-hosted) so your data never leaves your servers. For cloud deployments, we use enterprise-grade security with encryption, access controls, and compliance with industry standards. We never access your data without explicit permission.',
    },
    {
      question: 'What\'s included in ongoing support?',
      answer: 'Ongoing support includes workflow monitoring, bug fixes, performance optimization, minor modifications, and regular check-ins. We also keep your workflows updated as your connected apps release new features or API changes.',
    },
  ];

  return (
    <section className="section bg-card/30 relative overflow-hidden" id="faq">
      {/* Gradient glows */}
      <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-blue-400/10 rounded-full blur-[130px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/3 w-[400px] h-[400px] bg-pink-500/10 rounded-full blur-[130px] pointer-events-none"></div>
      
      <div className="container max-w-3xl relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Frequently Asked <span className="text-white drop-shadow-[0_5px_5px_rgba(0,0,0,0.8)]">Questions</span>
          </h2>
          <p className="text-lg text-foreground/70">
            Everything you need to know about our automation services
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="group rounded-2xl bg-slate-800/50 border border-violet-500/30 hover:border-violet-500/60 hover:bg-slate-800 hover:scale-105 transition-all duration-300 hover:shadow-2xl hover:shadow-violet-900/20 overflow-hidden">
              <button
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-foreground/5 transition-colors"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span className="font-semibold pr-8">{faq.question}</span>
                <ChevronDown
                  className={`w-5 h-5 text-primary flex-shrink-0 transition-transform ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {openIndex === index && (
                <div className="px-6 pb-4 text-foreground/70">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
