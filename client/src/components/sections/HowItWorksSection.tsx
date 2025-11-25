import { motion } from 'framer-motion';

export default function HowItWorksSection() {
  const steps = [
    {
      title: 'Discovery',
      desc: 'We analyze your current processes and identify high-impact automation opportunities.',
    },
    {
      title: 'Strategy & Design',
      desc: 'We map out the logic, data flow, and edge cases before writing a single line of code.',
    },
    {
      title: 'Development',
      desc: 'We build your workflows in n8n, integrating APIs and AI agents securely.',
    },
    {
      title: 'Testing',
      desc: 'Rigorous testing with real-world data scenarios to ensure 100% reliability.',
    },
    {
      title: 'Launch & Support',
      desc: 'We go live and provide ongoing monitoring to handle system updates and optimizations.',
    },
  ];

  return (
    <section id="process" className="py-24 bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white">
            How <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">It Works</span>
          </h2>
          <p className="text-slate-400 mt-4">
            A proven process that takes you from manual chaos to automated efficiency
          </p>
        </div>

        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-violet-500 via-cyan-500 to-slate-800 hidden md:block"></div>

          <div className="space-y-12">
            {steps.map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className={`flex flex-col md:flex-row items-center gap-8 ${
                  idx % 2 === 0 ? 'md:flex-row-reverse' : ''
                }`}
              >
                <div className="flex-1 text-center md:text-left">
                  <div
                    className={`bg-slate-800 p-6 rounded-xl border border-violet-500/30 hover:border-violet-500/60 shadow-lg hover:scale-105 transition-all duration-300 ${
                      idx % 2 === 0 ? 'md:text-left' : 'md:text-right'
                    }`}
                  >
                    <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
                    <p className="text-slate-400">{step.desc}</p>
                  </div>
                </div>

                <div className="relative z-10 flex items-center justify-center w-12 h-12 rounded-full bg-slate-900 border-2 border-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.5)]">
                  <span className="text-white font-bold">{idx + 1}</span>
                </div>

                <div className="flex-1"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
