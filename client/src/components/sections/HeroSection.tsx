import { ArrowRight, Workflow } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { useParallax } from '@/hooks/useParallax';

export default function HeroSection() {
  const scrollY = useParallax();
  const scrollToSection = (id: string) => {
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden pt-20 pb-12">
      {/* Circuit Board Background */}
      <div 
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{ backgroundImage: 'url(/hero-circuit-board.png)' }}
      ></div>
      
      {/* Dark Overlay for Text Readability */}
      <div className="absolute inset-0 bg-slate-950/60 z-0"></div>
      
      <div 
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
        style={{ transform: `translateY(${scrollY * 0.3}px)` }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="relative inline-block w-full"
        >
          
          {/* Main Headline - Updated with strong drop-shadow for legibility */}
          <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight mb-6 leading-tight drop-shadow-[0_5px_5px_rgba(0,0,0,0.8)]">
            We Automate the <br className="hidden md:block" />
            <span className="text-white">
                Boring Stuff
              </span>          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-slate-300 mb-8 max-w-3xl mx-auto leading-relaxed drop-shadow-md">
            Transform repetitive tasks into intelligent workflows with n8n and AI agents. 
            Save time, reduce errors, and scale efficiently—without adding headcount.
          </p>

          {/* CTAs - Updated with shadows on buttons/text */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Button
              size="lg"
              className="px-8 py-6 h-auto text-base font-bold rounded-lg hover:shadow-[0_0_30px_rgba(139,92,246,0.6)] transition-all duration-300 hover:scale-105 drop-shadow-md"
              onClick={() => scrollToSection('#contact')}
            >
              Start Automating
              <ArrowRight className="ml-2 w-5 h-5 drop-shadow-md" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-violet-500/30 hover:border-violet-500/60 text-white px-8 py-6 h-auto text-base font-bold rounded-lg hover:bg-white/10 transition-all duration-300 drop-shadow-md bg-slate-900/40 backdrop-blur-sm"
              onClick={() => scrollToSection('#how-it-works')}
            >
              See How It Works
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-3xl mx-auto mt-8">
            <div className="flex flex-col items-center gap-2 p-4 rounded-lg bg-slate-900/50 border border-violet-500/30 hover:border-violet-500/60 hover:scale-105 transition-all duration-300 backdrop-blur-sm">
              <div className="text-3xl md:text-4xl font-bold text-white">500+</div>
              <p className="text-sm text-slate-400">Workflows Automated</p>
            </div>
            <div className="flex flex-col items-center gap-2 p-4 rounded-lg bg-slate-900/50 border border-violet-500/30 hover:border-violet-500/60 hover:scale-105 transition-all duration-300 backdrop-blur-sm">
              <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">Up to 75%</div>
              <p className="text-sm text-slate-400">Time Saved on Average</p>
            </div>
            <div className="flex flex-col items-center gap-2 p-4 rounded-lg bg-slate-900/50 border border-violet-500/30 hover:border-violet-500/60 hover:scale-105 transition-all duration-300 backdrop-blur-sm">
              <div className="text-3xl md:text-4xl font-bold text-white">50+</div>
              <p className="text-sm text-slate-400">Happy Clients</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/20 rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-3 bg-white/40 rounded-full"></div>
        </div>
      </div>
    </section>
  );
}