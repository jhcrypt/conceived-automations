import { Quote } from 'lucide-react';

export default function TestimonialsSection() {
  const testimonials = [
    {
      quote: 'Conceived Automations transformed our operations. We reclaimed 120+ hours each month and doubled our output without adding staff.',
      author: 'Sarah Chen',
      role: 'Operations Director',
      company: 'TechFlow Solutions',
    },
    {
      quote: 'The AI-powered workflows are incredible. Our lead response time went from hours to minutes, and conversion rates increased by 40%.',
      author: 'Michael Rodriguez',
      role: 'Head of Sales',
      company: 'GrowthLabs Inc',
    },
    {
      quote: 'Best investment we made this year. The team understood our needs perfectly and delivered automation that actually works.',
      author: 'Emily Thompson',
      role: 'CEO',
      company: 'Streamline Co',
    },
  ];

  return (
    <section className="section bg-card/30 relative overflow-hidden" id="testimonials">
      {/* Gradient glows */}
      <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-blue-400/10 rounded-full blur-[130px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/3 w-[400px] h-[400px] bg-pink-500/10 rounded-full blur-[130px] pointer-events-none"></div>
      
      <div className="container relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Trusted by <span className="gradient-text">Growing Businesses</span>
          </h2>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            See what our clients say about working with us
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="group p-8 rounded-2xl bg-slate-800/50 border border-violet-500/30 hover:border-violet-500/60 hover:bg-slate-800 hover:scale-105 transition-all duration-300 hover:shadow-2xl hover:shadow-violet-900/20">
              <Quote className="w-10 h-10 text-primary/40 mb-4" />
              <p className="text-foreground/80 mb-6 italic">"{testimonial.quote}"</p>
              <div className="border-t border-violet-500/30 pt-4">
                <p className="font-bold">{testimonial.author}</p>
                <p className="text-sm text-foreground/60">{testimonial.role}</p>
                <p className="text-sm text-primary">{testimonial.company}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
