import { ArrowRight } from 'lucide-react';
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
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden pt-20 pb-12 bg-background transition-colors duration-300">
      {/* Background Image - Adapted for Warm Theme (Sepia + Lower Opacity) */}
      <div 
        className="absolute inset-0 bg-cover bg-center z-0 opacity-5 dark:opacity-10 grayscale sepia mix-blend-overlay pointer-events-none"
        style={{ backgroundImage: 'url(/hero-circuit-board.png)' }}
      ></div>
      
      {/* Gradient Overlay to fade image into background color */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background z-0"></div>
      
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
          
          {/* Main Headline */}
          <h1 className="text-5xl md:text-7xl font-extrabold text-foreground tracking-tight mb-6 leading-tight drop-shadow-sm">
            We Automate the <br className="hidden md:block" />
            {/* Gradient Text: Now Terra Cotta to Warm Orange */}
            <span className="bg-gradient-to-r from-primary to-orange-500 bg-clip-text text-transparent">
              Boring Stuff
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
            Transform repetitive tasks into intelligent workflows with n8n and AI agents. 
            Save time, reduce errors, and scale efficiently—without adding headcount.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            {/* Primary Button */}
            <Button
              size="lg"
              className="px-8 py-6 h-auto text-base font-bold rounded-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 bg-primary text-primary-foreground hover:bg-primary/90"
              onClick={() => scrollToSection('#contact')}
            >
              Start Automating
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            
            {/* Secondary Outline Button */}
            <Button
              size="lg"
              variant="outline"
              className="px-8 py-6 h-auto text-base font-bold rounded-lg border-primary/20 text-foreground hover:bg-primary/5 backdrop-blur-sm transition-all duration-300"
              onClick={() => scrollToSection('#how-it-works')}
            >
              See How It Works
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-3xl mx-auto mt-8">
            <div className="flex flex-col items-center gap-2 p-4 rounded-lg bg-card/50 border border-border hover:border-primary/30 hover:shadow-lg transition-all duration-300 backdrop-blur-sm">
              <div className="text-3xl md:text-4xl font-bold text-foreground">500+</div>
              <p className="text-sm text-muted-foreground">Workflows Automated</p>
            </div>
            <div className="flex flex-col items-center gap-2 p-4 rounded-lg bg-card/50 border border-border hover:border-primary/30 hover:shadow-lg transition-all duration-300 backdrop-blur-sm">
              <div className="text-3xl md:text-4xl font-bold text-primary">75%</div>
              <p className="text-sm text-muted-foreground">Time Saved Average</p>
            </div>
            <div className="flex flex-col items-center gap-2 p-4 rounded-lg bg-card/50 border border-border hover:border-primary/30 hover:shadow-lg transition-all duration-300 backdrop-blur-sm">
              <div className="text-3xl md:text-4xl font-bold text-foreground">50+</div>
              <p className="text-sm text-muted-foreground">Happy Clients</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}