import { ShoppingCart, Home, Heart, DollarSign, Megaphone, Phone, Star } from 'lucide-react';

export default function UseCasesSection() {
  const useCases = [
    {
      icon: ShoppingCart,
      industry: 'E-commerce',
      challenge: 'Manual order processing and inventory management across multiple platforms',
      solution: 'Automated order sync, inventory updates, and customer notifications',
      results: ['80% faster order processing', '99% inventory accuracy', '50% reduction in customer inquiries'],
    },
    {
      icon: Home,
      industry: 'Real Estate',
      challenge: 'Time-consuming lead qualification and follow-up processes',
      solution: 'AI-powered lead scoring, automated follow-ups, and CRM integration',
      results: ['3x more qualified leads', '90% faster response time', '40% increase in conversions'],
    },
    {
      icon: Heart,
      industry: 'Healthcare',
      challenge: 'Manual appointment scheduling and patient communication',
      solution: 'Automated scheduling, reminders, and patient data synchronization',
      results: ['60% reduction in no-shows', '5 hours saved daily', 'Improved patient satisfaction'],
    },
    {
      icon: DollarSign,
      industry: 'Finance',
      challenge: 'Time-intensive reporting and data reconciliation',
      solution: 'Automated data collection, report generation, and anomaly detection',
      results: ['95% faster reporting', 'Zero reconciliation errors', 'Real-time insights'],
    },
    {
      icon: Megaphone,
      industry: 'Marketing',
      challenge: 'Disconnected campaign tools and manual lead nurturing',
      solution: 'Unified campaign management and AI-driven lead nurturing workflows',
      results: ['50% more campaigns launched', '2x engagement rates', '30% cost reduction'],
    },
    {
      icon: Phone,
      industry: 'Voice Agents',
      challenge: 'High-volume customer calls, interviews, and qualification processes requiring human touch',
      solution: 'AI-powered voice agents that conduct phone interviews, qualify leads, answer questions, and engage in natural conversations',
      results: ['24/7 availability', '10x call capacity', '85% customer satisfaction', '70% cost reduction'],
      isNew: true,
    },
  ];

  return (
    <section className="section bg-card/30" id="use-cases">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Real-World <span className="text-white drop-shadow-[0_5px_5px_rgba(0,0,0,0.8)]">Success Stories</span>
          </h2>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            See how businesses across industries are transforming with automation
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 relative">
          {/* Gradient glows */}
          <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-blue-400/10 rounded-full blur-[130px] pointer-events-none"></div>
          <div className="absolute bottom-1/4 right-1/3 w-[400px] h-[400px] bg-pink-500/10 rounded-full blur-[130px] pointer-events-none"></div>
          {useCases.map((useCase, index) => {
            const Icon = useCase.icon;
            return (
              <div key={index} className="group p-6 rounded-2xl bg-slate-800/50 border border-violet-500/30 hover:border-violet-500/60 hover:bg-slate-800 hover:scale-105 transition-all duration-300 hover:shadow-2xl hover:shadow-violet-900/20 relative">
                {useCase.isNew && (
                  <div className="absolute -top-2 -right-2 bg-gradient-to-r from-violet-600 to-purple-600 text-white px-3 py-1 rounded-full flex items-center gap-1 shadow-lg shadow-violet-500/50 z-10">
                    <Star className="w-3 h-3 fill-current" />
                    <span className="text-xs font-bold">NEW</span>
                  </div>
                )}
                <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3">{useCase.industry}</h3>
                
                <div className="space-y-4">
                  <div>
                    <p className="text-xs font-semibold text-foreground/50 uppercase mb-1">Challenge</p>
                    <p className="text-sm text-foreground/70">{useCase.challenge}</p>
                  </div>
                  
                  <div>
                    <p className="text-xs font-semibold text-foreground/50 uppercase mb-1">Solution</p>
                    <p className="text-sm text-foreground/70">{useCase.solution}</p>
                  </div>
                  
                  <div>
                    <p className="text-xs font-semibold text-primary uppercase mb-2">Results</p>
                    <ul className="space-y-1">
                      {useCase.results.map((result, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <div className="w-1 h-1 rounded-full bg-primary mt-1.5"></div>
                          <span className="text-sm text-foreground/80">{result}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
