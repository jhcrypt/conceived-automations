import { Target, Users, Award } from 'lucide-react';

export default function AboutSection() {
  const values = [
    {
      icon: Target,
      title: 'Our Mission',
      description: 'Democratize intelligent automation for businesses of all sizes',
    },
    {
      icon: Users,
      title: 'Our Team',
      description: 'Expert automation engineers and AI specialists dedicated to your success',
    },
    {
      icon: Award,
      title: 'Our Commitment',
      description: 'Long-term partnerships built on trust, transparency, and measurable results',
    },
  ];

  return (
    <section className="section bg-background" id="about">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white">
            About Conceived Automations
          </h2>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            Empowering businesses to work smarter through intelligent automation
          </p>
        </div>

        <div className="max-w-4xl mx-auto mb-16">
          <div className="group p-8 md:p-12 rounded-2xl bg-slate-800/50 border border-white/5 hover:border-violet-500/30 hover:bg-slate-800 hover:scale-105 transition-all duration-300 hover:shadow-2xl hover:shadow-violet-900/20">
            <p className="text-lg text-foreground/80 mb-6">
              We're a team of automation experts passionate about helping businesses break free from manual work. 
              With deep expertise in n8n, AI integration, and process optimization, we transform how companies operate.
            </p>
            <p className="text-lg text-foreground/80">
              Our mission is simple: empower businesses to work smarter, not harder. We believe every company deserves 
              access to enterprise-grade automation, regardless of size. That's why we've built our services around 
              flexibility, transparency, and real results.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 relative">
          {/* Gradient glows */}
          <div className="absolute -top-10 right-1/4 w-[450px] h-[450px] bg-cyan-500/12 rounded-full blur-[140px] pointer-events-none"></div>
          <div className="absolute bottom-0 left-1/4 w-[450px] h-[450px] bg-purple-600/12 rounded-full blur-[140px] pointer-events-none"></div>
          
          {values.map((value, index) => {
            const Icon = value.icon;
            return (
              <div
                key={index}
                className="glass rounded-lg p-8 border-violet-500/30 hover:border-violet-500/60 hover:scale-105 transition-all duration-300 group text-center"
              >
                <div className="w-16 h-16 rounded-lg bg-primary/20 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">{value.title}</h3>
                <p className="text-foreground/70">{value.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
