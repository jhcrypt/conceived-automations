import { AlertCircle, CheckCircle2, AlertTriangle, Check } from 'lucide-react';

export default function ProblemSolution() {
  return (
    <section className="section bg-background relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-64 w-96 h-96 bg-violet-600/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 -right-64 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Stop Losing <span className="text-white drop-shadow-[0_5px_5px_rgba(0,0,0,0.8)]">Qualified Leads</span>
          </h2>
          <p className="text-lg text-foreground/70">
            Most businesses don't lose customers because of bad service. They lose them because leads aren't answered, qualified, or followed up with quickly enough.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Challenge Card */}
          <div className="group p-8 rounded-2xl bg-slate-800/50 border border-violet-500/30 hover:border-violet-500/60 hover:bg-slate-800 hover:scale-105 transition-all duration-300 hover:shadow-2xl hover:shadow-violet-900/20">
            <div className="flex items-center gap-4 mb-8">
              <div className="p-4 bg-slate-950 rounded-xl w-fit group-hover:scale-110 transition-transform duration-300 border border-white/5">
                <AlertTriangle className="w-6 h-6 text-violet-400" />
              </div>
              <h3 className="text-2xl font-bold text-white">The Challenge</h3>
            </div>
            <ul className="space-y-6">
              {[
                "Missed calls lose revenue",
                "Slow follow-up kills conversion",
                "Unqualified leads waste time",
                "Manual CRM updates create bottlenecks",
                "Leads fall through the cracks"
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-4">
                  {/* Changed from X to AlertTriangle (Exclamation) and Red to Gray */}
                  <AlertTriangle className="w-5 h-5 text-slate-400 flex-shrink-0 mt-1" />
                  <span className="text-foreground/70 text-lg">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Solution Card */}
          <div className="group p-8 rounded-2xl bg-slate-800/50 border border-violet-500/30 hover:border-violet-500/60 hover:bg-slate-800 hover:scale-105 transition-all duration-300 hover:shadow-2xl hover:shadow-violet-900/20">
            <div className="flex items-center gap-4 mb-8">
              <div className="p-4 bg-slate-950 rounded-xl w-fit group-hover:scale-110 transition-transform duration-300 border border-white/5">
                <CheckCircle2 className="w-6 h-6 text-cyan-400" />
              </div>
              <h3 className="text-2xl font-bold text-white">The Solution</h3>
            </div>
            <ul className="space-y-6">
              {[
                "AI answers every lead instantly",
                "AI qualifies prospects automatically",
                "CRM updates happen automatically",
                "Appointment booking runs 24/7",
                "Hot leads get routed to the right person"
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-4">
                  {/* Changed from Green to Gray */}
                  <Check className="w-5 h-5 text-slate-400 flex-shrink-0 mt-1" />
                  <span className="text-foreground/70 text-lg">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}