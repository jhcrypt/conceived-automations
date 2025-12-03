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
  return (
    <div className="min-h-screen bg-slate-950 text-foreground">
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
    </div>
  );
}
