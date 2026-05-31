import { ArrowRight, PhoneCall, UserCheck, CalendarCheck, MessageSquareMore, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Footer from '@/components/Footer';

const features = [
  {
    icon: PhoneCall,
    title: 'Answer Every Lead',
    desc: 'Respond instantly when new leads call, submit forms, or need follow-up.',
  },
  {
    icon: UserCheck,
    title: 'Qualify Prospects',
    desc: 'Ask the right questions and score leads before your team gets involved.',
  },
  {
    icon: CalendarCheck,
    title: 'Book Appointments',
    desc: 'Route qualified prospects directly to your calendar or sales team.',
  },
  {
    icon: MessageSquareMore,
    title: 'Follow Up Automatically',
    desc: 'Trigger SMS, email, and missed-call recovery so fewer leads go cold.',
  },
];

export default function VoiceAgentLanding() {
  const scrollToDemo = () => {
    document.querySelector('#voice-agent-demo')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="relative overflow-hidden py-24 md:py-32">
        <div className="absolute inset-0 bg-[url('/hero-circuit-board.webp')] bg-cover bg-center opacity-30" />
        <div className="absolute inset-0 bg-slate-950/75" />
        <div className="absolute -top-32 right-0 w-96 h-96 bg-violet-600/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl" />

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-500/10 border border-violet-500/30 text-violet-200 text-sm font-semibold mb-6">
            AI Voice Agent Platform
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-tight mb-6">
            Never Miss Another Lead
          </h1>

          <p className="text-lg md:text-2xl text-slate-300 max-w-3xl mx-auto leading-relaxed mb-10">
            AI voice agents that answer, qualify, follow up, and book appointments automatically — so your team only talks to ready buyers.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
            <Button size="lg" className="px-8 py-6 h-auto text-base font-bold rounded-lg" onClick={scrollToDemo}>
              Book a Demo
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="border-violet-500/30 text-white bg-slate-900/60 px-8 py-6 h-auto text-base font-bold rounded-lg hover:bg-white/10"
              onClick={scrollToDemo}
            >
              Join Early Access
            </Button>
          </div>

          <div className="grid sm:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {['Respond instantly', 'Qualify automatically', 'Book appointments'].map((item) => (
              <div key={item} className="rounded-xl border border-violet-500/30 bg-slate-900/60 p-4 text-slate-200 font-semibold">
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-slate-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <h2 className="text-3xl md:text-5xl font-bold mb-5">Your AI Front Desk + Sales Qualifier</h2>
            <p className="text-slate-400 text-lg">
              Built for service businesses that need faster lead response, cleaner qualification, and fewer missed opportunities.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div key={feature.title} className="rounded-2xl border border-violet-500/30 bg-slate-800/50 p-8">
                  <div className="mb-5 p-4 bg-slate-950 rounded-xl w-fit border border-white/5">
                    <Icon className="w-7 h-7 text-cyan-400" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-slate-400 leading-relaxed">{feature.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20 bg-slate-950">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <h2 className="text-3xl md:text-5xl font-bold mb-5">How It Works</h2>
            <p className="text-slate-400 text-lg">A simple path from missed leads to booked conversations.</p>
          </div>

          <div className="grid md:grid-cols-4 gap-5">
            {['Connect lead sources', 'Configure questions', 'Launch AI agent', 'Book or hand off leads'].map((step, index) => (
              <div key={step} className="rounded-2xl border border-cyan-500/20 bg-slate-900 p-6">
                <div className="w-10 h-10 rounded-full bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center mb-5 font-bold">
                  {index + 1}
                </div>
                <p className="font-semibold text-slate-100">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="voice-agent-demo" className="py-20 bg-slate-900">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-500/10 border border-violet-500/30 text-violet-200 text-sm font-semibold mb-6">
              Early Access
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mb-5">Request Your AI Voice Agent Demo</h2>
            <p className="text-slate-400 text-lg mb-6">
              We’ll map your lead flow, qualification questions, booking process, and follow-up opportunities.
            </p>

            <div className="space-y-3">
              {['Lead response strategy', 'Qualification script outline', 'CRM + calendar integration plan'].map((item) => (
                <div key={item} className="flex items-center gap-3 text-slate-300">
                  <CheckCircle2 className="w-5 h-5 text-cyan-400" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-violet-500/30 bg-slate-950/80 p-8">
            <h3 className="text-2xl font-bold mb-4">Best fit for:</h3>
            <ul className="space-y-3 text-slate-300">
              <li>• Insurance agencies</li>
              <li>• Contractors and home services</li>
              <li>• Med spas and healthcare offices</li>
              <li>• Law firms and real estate teams</li>
              <li>• Any business that depends on booked appointments</li>
            </ul>
            <Button className="w-full mt-8 py-6 h-auto font-bold" onClick={() => (window.location.href = '/#contact')}>
              Book a Demo
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
