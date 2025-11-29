import { Clock, ShieldCheck, TrendingUp, Link2, Brain, HeadphonesIcon } from 'lucide-react';

export default function BenefitsSection() {
  const benefits = [
    {
      icon: Clock,
      title: 'Save Time',
      description: 'Automate hours of manual work daily. Focus on strategy while workflows run 24/7.',
      stat: '75%',
      statLabel: 'Time Saved',
    },
    {
      icon: ShieldCheck,
      title: 'Reduce Errors',
      description: 'Eliminate human mistakes in repetitive tasks with consistent, reliable automation.',
      stat: '99%',
      statLabel: 'Accuracy',
    },
    {
      icon: TrendingUp,
      title: 'Scale Efficiently',
      description: 'Grow your business without proportionally increasing headcount or operational costs.',
      stat: '3x',
      statLabel: 'Productivity',
    },
    {
      icon: Link2,
      title: 'Integrate Everything',
      description: 'Connect all your tools seamlessly. Break down data silos and unify your systems.',
      stat: '500+',
      statLabel: 'Integrations',
    },
    {
      icon: Brain,
      title: 'AI-Powered Intelligence',
      description: 'Make smarter decisions automatically with AI agents that learn and adapt.',
      stat: 'Smart',
      statLabel: 'Decisions',
    },
    {
      icon: HeadphonesIcon,
      title: 'Expert Support',
      description: 'Dedicated team ensuring your success with ongoing optimization and support.',
      stat: '24/7',
      statLabel: 'Available',
    },
  ];

  return (
    <section className="section bg-background" id="benefits">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white">
            Why Choose Conceived Automations
          </h2>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            Transform your business with intelligent automation that delivers real results
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 relative">
          {/* Gradient glows */}
          <div className="absolute -top-10 right-1/4 w-[450px] h-[450px] bg-cyan-500/12 rounded-full blur-[140px] pointer-events-none"></div>
          <div className="absolute bottom-0 left-1/4 w-[450px] h-[450px] bg-purple-600/12 rounded-full blur-[140px] pointer-events-none"></div>
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <div
                key={index}
                className="group p-8 rounded-2xl bg-slate-800/50 border border-violet-500/30 hover:border-violet-500/60 hover:bg-slate-800 hover:scale-105 transition-all duration-300 hover:shadow-2xl hover:shadow-violet-900/20"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-14 h-14 rounded-lg bg-primary/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Icon className="w-7 h-7 text-primary" />
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-primary">{benefit.stat}</div>
                    <div className="text-xs text-foreground/60">{benefit.statLabel}</div>
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-2">{benefit.title}</h3>
                <p className="text-foreground/70">{benefit.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
