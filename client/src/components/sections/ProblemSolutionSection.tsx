import { AlertCircle, CheckCircle2, ArrowRight, X, Check } from 'lucide-react';
import ScrollReveal from '@/components/ScrollReveal';

export default function ProblemSolutionSection() {
  const problems = [
    'Hours wasted on manual data entry and repetitive tasks',
    'Disconnected systems creating data silos',
    'Human errors in critical business processes',
    'Inability to scale without adding more staff',
    'Missed opportunities due to slow response times',
  ];

  const solutions = [
    'Automated workflows running 24/7 without intervention',
    'Seamless integration across all your business tools',
    'Error-free execution with intelligent validation',
    'Scale operations without proportional cost increases',
    'Instant responses and real-time processing',
  ];

  return (
    <section className="section bg-background" id="problem-solution">
      <div className="container">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Stop Fighting <span className="gradient-text">Manual Chaos</span>
            </h2>
            <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
              Every business faces the same challenge: too much manual work, not enough time
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={200}>
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto">
          {/* The Challenge */}
          <div className="group p-8 rounded-2xl bg-slate-800/50 border border-violet-500/30 hover:border-violet-500/60 hover:bg-slate-800 hover:scale-105 transition-all duration-300 hover:shadow-2xl hover:shadow-violet-900/20">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-4 bg-slate-950 rounded-xl w-fit group-hover:scale-110 transition-transform duration-300 border border-white/5">
                <AlertCircle className="w-6 h-6 text-red-400" />
              </div>
              <h3 className="text-2xl font-bold text-white">The Challenge</h3>
            </div>
            <div className="space-y-4">
              {problems.map((problem, index) => (
                <div key={index} className="flex items-start gap-3">
                  <X className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                  <p className="text-slate-400 leading-relaxed">{problem}</p>
                </div>
              ))}
            </div>
          </div>

          {/* The Solution */}
          <div className="group p-8 rounded-2xl bg-slate-800/50 border border-violet-500/30 hover:border-violet-500/60 hover:bg-slate-800 hover:scale-105 transition-all duration-300 hover:shadow-2xl hover:shadow-violet-900/20">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-4 bg-slate-950 rounded-xl w-fit group-hover:scale-110 transition-transform duration-300 border border-white/5">
                <CheckCircle2 className="w-6 h-6 text-green-500" />
              </div>
              <h3 className="text-2xl font-bold text-white">The Solution</h3>
            </div>
            <div className="space-y-4">
              {solutions.map((solution, index) => (
                <div key={index} className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <p className="text-slate-400 leading-relaxed">{solution}</p>
                </div>
              ))}
            </div>
          </div>
          </div>
        </ScrollReveal>

        {/* Visual Comparison */}
        <ScrollReveal delay={400}>
          <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-8 glass px-8 py-4 border border-violet-500/30 rounded-2xl">
            <div className="flex flex-col items-center">
              <span className="text-4xl font-bold text-destructive">8hrs</span>
              <span className="text-sm text-foreground/60">Manual Work</span>
            </div>
            <ArrowRight className="w-8 h-8 text-primary" />
            <div className="flex flex-col items-center">
              <span className="text-4xl font-bold text-primary">30min</span>
              <span className="text-sm text-foreground/60">Automated</span>
            </div>
          </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
