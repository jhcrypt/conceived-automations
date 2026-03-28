import React, { lazy, Suspense } from 'react';
import Navigation from '@/components/Navigation';
import HeroSection from '@/components/sections/HeroSection';
import ProblemSolutionSection from '@/components/sections/ProblemSolutionSection';
import ServicesSection from '@/components/sections/ServicesSection';
import HowItWorksSection from '@/components/sections/HowItWorksSection';
import PricingSection from '@/components/sections/PricingSection';
import ValueBasedROICalculator from '@/components/sections/ValueBasedROICalculator';
import TechnologyStackSection from '@/components/sections/TechnologyStackSection';
import UseCasesSection from '@/components/sections/UseCasesSection';
import BenefitsSection from '@/components/sections/BenefitsSection';
import FAQSection from '@/components/sections/FAQSection';
import AboutSection from '@/components/sections/AboutSection';
import OperationalScanSection from '@/components/sections/OperationalScanSection';
import TestimonialsSection from '@/components/sections/TestimonialsSection';
import WorkflowQuestionnaireSection from '@/components/sections/WorkflowQuestionnaireSection';
import CTASection from '@/components/sections/CTASection';
import Footer from '@/components/Footer';

export default function Home() {
  const [showBackToTop, setShowBackToTop] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-foreground">
      {/* Under Construction Banner */}
      <div className="sticky top-0 z-[60] bg-slate-950/80 backdrop-blur-lg border-b border-violet-500/30 py-2.5 px-4 flex items-center justify-center gap-2 text-sm font-medium text-foreground/70">
        <span>🚧</span>
        <span><span className="text-violet-400 font-semibold">Conceived Automations</span> is under active development — exciting new features launching soon. Stay tuned!</span>
        <span>🚧</span>
      </div>
      <Navigation />
      <HeroSection />
      <div className="bg-slate-900"><ProblemSolutionSection /></div>
      <div className="bg-slate-950"><ServicesSection /></div>
      <div className="bg-slate-900"><HowItWorksSection /></div>
      <ValueBasedROICalculator />
      <div className="bg-slate-900"><WorkflowQuestionnaireSection /></div>
      <div className="bg-slate-950"><PricingSection /></div>
      <div className="bg-slate-900"><TechnologyStackSection /></div>
      <div className="bg-slate-950"><UseCasesSection /></div>
      <div className="bg-slate-900"><BenefitsSection /></div>
      <div className="bg-slate-950"><TestimonialsSection /></div>
      <div className="bg-slate-900"><AboutSection /></div>
      <div className="bg-slate-950"><FAQSection /></div>
      <div className="bg-slate-900"><OperationalScanSection /></div>
      <div className="bg-slate-950"><CTASection /></div>
      <Footer />
      
      {/* Back to Top Button */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-24 right-6 z-50 p-3 bg-violet-600 hover:bg-violet-700 text-white rounded-full shadow-lg transition-all duration-300 hover:scale-110"
          aria-label="Back to top"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </button>
      )}
    </div>
  );
}
