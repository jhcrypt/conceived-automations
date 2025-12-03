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
  const [sidebarHovered, setSidebarHovered] = React.useState(false);
  
  const navItems = [
    { label: 'Services', href: '#services', icon: '🔧' },
    { label: 'Process', href: '#process', icon: '⚙️' },
    { label: 'Pricing', href: '#pricing', icon: '💰' },
    { label: 'Use Cases', href: '#use-cases', icon: '📋' },
    { label: 'About', href: '#about', icon: 'ℹ️' },
    { label: 'FAQ', href: '#faq', icon: '❓' },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-foreground">
      {/* Sidebar */}
      <aside 
        className={`fixed left-0 top-16 h-[calc(100vh-4rem)] bg-slate-900 border-r border-slate-800 transition-all duration-300 z-40 ${sidebarHovered ? 'w-64' : 'w-16'}`}
        onMouseEnter={() => setSidebarHovered(true)}
        onMouseLeave={() => setSidebarHovered(false)}
      >
        <nav className="p-2 mt-2">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 px-3 py-3 text-slate-300 hover:bg-slate-800 hover:text-white rounded-md mb-1 transition-colors group"
            >
              <span className="text-xl flex-shrink-0">{item.icon}</span>
              <span className={`whitespace-nowrap transition-opacity duration-300 ${sidebarHovered ? 'opacity-100' : 'opacity-0 w-0 overflow-hidden'}`}>
                {item.label}
              </span>
            </a>
          ))}
        </nav>
      </aside>

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
