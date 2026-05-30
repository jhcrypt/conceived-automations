import { PhoneCall, Brain, CalendarCheck, DatabaseZap, UserCheck, MessageSquareMore } from 'lucide-react';
import { motion } from 'framer-motion';

const features = [
  {
    icon: PhoneCall,
    title: '24/7 Lead Response',
    desc: 'Answer inbound calls and follow up with new leads automatically, even after hours.',
  },
  {
    icon: Brain,
    title: 'AI Qualification Calls',
    desc: 'Ask the right questions, capture key details, and identify serious buyers before your team gets involved.',
  },
  {
    icon: CalendarCheck,
    title: 'Appointment Booking',
    desc: 'Route qualified prospects directly to your calendar based on availability and business rules.',
  },
  {
    icon: DatabaseZap,
    title: 'CRM + Workflow Updates',
    desc: 'Push summaries, lead scores, call outcomes, and next steps into the systems you already use.',
  },
  {
    icon: UserCheck,
    title: 'Human Handoff',
    desc: 'Escalate high-intent leads to the right person with context, urgency, and recommended next action.',
  },
  {
    icon: MessageSquareMore,
    title: 'Follow-Up Automation',
    desc: 'Trigger SMS, email, and reminder workflows so no qualified opportunity goes cold.',
  },
];

export default function VoiceAgentPlatformSection() {
  return (
    <section id="voice-agent" className="py-24 bg-slate-950 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-violet-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl" />
      </div>

      <div className="container relative z-10">
        <div className="text-center max-w-4xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-500/10 border border-violet-500/30 text-violet-200 text-sm font-semibold mb-6">
            Coming Soon: AI Voice Agent Platform
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">
            Your AI Front Desk + <span className="text-white drop-shadow-[0_5px_5px_rgba(0,0,0,0.8)]">Sales Qualifier</span>
          </h2>
          <p className="text-lg text-slate-400 leading-relaxed">
            Our AI voice agents handle inbound calls, outbound lead follow-up, qualification questions,
            appointment booking, CRM updates, and human handoff — so every lead gets a fast, consistent response.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: index * 0.05 }}
                viewport={{ once: true }}
                className="group p-7 rounded-2xl bg-slate-800/50 border border-violet-500/30 hover:border-violet-500/60 hover:bg-slate-800 transition-all duration-300 hover:shadow-2xl hover:shadow-violet-900/20"
              >
                <div className="p-4 bg-slate-950 rounded-xl w-fit mb-5 group-hover:scale-110 transition-transform duration-300 border border-white/5">
                  <Icon className="w-6 h-6 text-cyan-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-slate-400 leading-relaxed">{feature.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
