import React from 'react';
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
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  
  const navItems = [
    { label: 'Services', href: '#services' },
    { label: 'Process', href: '#process' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'Use Cases', href: '#use-cases' },
    { label: 'About', href: '#about' },
    { label: 'FAQ', href: '#faq' },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-foreground">
      {/* Sidebar */}
      <aside className={`fixed left-0 top-0 h-full bg-slate-900 border-r border-slate-800 transition-transform duration-300 z-50 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} w-64`}>
        <div className="h-16 flex items-center justify-between px-4 border-b border-slate-800">
          <span className="text-white font-semibold">Menu</span>
          <button onClick={() => setSidebarOpen(false)} className="text-slate-400 hover:text-white">
            ✕
          </button>
        </div>
        <nav className="p-4">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setSidebarOpen(false)}
              className="block px-4 py-3 text-slate-300 hover:bg-slate-800 hover:text-white rounded-md mb-1 transition-colors"
            >
              {item.label}
            </a>
          ))}
        </nav>
      </aside>

      {/* Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar Toggle Button */}
      <button
        onClick={() => setSidebarOpen(true)}
        className="fixed left-4 top-20 z-30 p-3 bg-slate-900 border border-slate-800 rounded-lg text-white hover:bg-slate-800 transition-colors"
      >
        ☰
      </button>

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
