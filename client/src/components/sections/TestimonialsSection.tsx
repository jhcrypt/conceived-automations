import { Quote, Plus } from 'lucide-react';

const toolLogos = [
  { name: 'Make', color: '#f97316' },
  { name: 'n8n', color: '#22c55e' },
  { name: 'OpenAI', color: '#3b82f6' },
  { name: 'Claude AI', color: '#a78bfa' },
  { name: 'Zapier', color: '#06b6d4' },
  { name: 'Airtable', color: '#ef4444' },
  { name: 'HubSpot', color: '#0ea5e9' },
];

const placeholders = [
  { width: ['100%', '90%', '80%', '65%'] },
  { width: ['90%', '100%', '80%', '65%'] },
  { width: ['80%', '100%', '90%', '65%'] },
];

export default function TestimonialsSection() {
  return (
    <>
      <section className="section bg-card/30 relative overflow-hidden" id="testimonials">
        {/* Gradient glows */}
        <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-blue-400/10 rounded-full blur-[130px] pointer-events-none"></div>
        <div className="absolute bottom-1/4 right-1/3 w-[400px] h-[400px] bg-pink-500/10 rounded-full blur-[130px] pointer-events-none"></div>

        <div className="container relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Trusted by <span className="text-white drop-shadow-[0_5px_5px_rgba(0,0,0,0.8)]">Growing Businesses</span>
            </h2>
            <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
              Be among the first clients to share your results with us
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {placeholders.map((ph, index) => (
              <div key={index} className="group p-8 rounded-2xl bg-slate-800/50 border border-violet-500/30 hover:border-violet-500/60 hover:bg-slate-800 hover:scale-105 transition-all duration-300 hover:shadow-2xl hover:shadow-violet-900/20 flex flex-col gap-4">
                <Quote className="w-10 h-10 text-primary/40" />
                <div className="flex flex-col gap-2">
                  {ph.width.map((w, i) => (
                    <div key={i} className="h-2 rounded-full bg-slate-700" style={{ width: w }} />
                  ))}
                </div>
                <div className="flex items-center gap-2 border border-dashed border-violet-500/40 rounded-lg px-4 py-3 text-sm text-primary/70 font-medium">
                  <Plus className="w-4 h-4 flex-shrink-0" />
                  Be our first featured client
                </div>
                <div className="border-t border-violet-500/30 pt-4 flex flex-col gap-2">
                  <div className="h-2.5 w-28 rounded-full bg-slate-600" />
                  <div className="h-2 w-20 rounded-full bg-slate-700" />
                  <div className="h-2 w-24 rounded-full bg-violet-500/30" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tools Band */}
      <div className="py-8">
        <div className="container">
          <p className="text-xs font-semibold text-foreground/40 uppercase tracking-widest text-center mb-6">
            Powered by best-in-class tools
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {toolLogos.map((tool) => (
              <div
                key={tool.name}
                className="flex items-center gap-2 bg-slate-800/50 border border-violet-500/30 hover:border-violet-500/60 transition-all duration-300 rounded-lg px-4 py-2"
              >
                <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: tool.color }} />
                <span className="text-sm font-semibold text-foreground/60">{tool.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
