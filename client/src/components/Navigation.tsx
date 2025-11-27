import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X, Workflow } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ThemeToggle } from './ThemeToggle';

const navItems = [
  { label: 'Services', href: '#services' },
  { label: 'Process', href: '#process' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Custom Workflow', href: '#workflow-questionnaire' },
  { label: 'Use Cases', href: '#use-cases' },
  { label: 'Benefits', href: '#benefits' },
  { label: 'About', href: '#about' },
  { label: 'FAQ', href: '#faq' },
];

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      // Detect active section
      const sections = navItems.map(item => item.href.substring(1));
      const scrollPosition = window.scrollY + 100;
      
      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetBottom = offsetTop + element.offsetHeight;
          
          if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
            setActiveSection(`#${sectionId}`);
            break;
          }
        }
      }
    };
    
    handleScroll(); // Initial check
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-slate-950/70 backdrop-blur-lg border-b border-violet-500/30 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="bg-gradient-to-br from-violet-600 to-cyan-500 p-2 rounded-lg">
            <Workflow className="text-white w-6 h-6" />
          </div>
          <span className="text-2xl font-bold text-white tracking-tight">
            Conceived<span className="text-violet-400">Automations</span>
          </span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6">
          <ThemeToggle />
          {navItems.map((item) => {
            const isActive = activeSection === item.href;
            return (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(item.href);
                }}
                className={`text-sm font-medium transition-all pb-1 border-b-2 ${
                  isActive
                    ? 'bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent border-violet-500'
                    : 'text-slate-300 hover:text-white border-transparent'
                }`}
              >
                {item.label}
              </a>
            );
          })}
          <button
            onClick={() => scrollToSection('#contact')}
            className="bg-white text-slate-950 px-5 py-2 rounded-lg font-bold text-sm hover:bg-cyan-50 transition-all hover:shadow-[0_0_20px_rgba(6,182,212,0.5)]"
          >
            Get Started
          </button>
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden flex items-center gap-2">
          <ThemeToggle />
          <button
            className="text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-slate-950 border-b border-white/10 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-2">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(item.href);
                  }}
                  className="block px-3 py-2 text-base font-medium text-slate-300 hover:text-white hover:bg-white/5 rounded-md"
                >
                  {item.label}
                </a>
              ))}
              <button
                onClick={() => scrollToSection('#contact')}
                className="w-full mt-4 bg-gradient-to-r from-violet-600 to-cyan-500 text-white px-5 py-3 rounded-lg font-bold"
              >
                Get Started
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
