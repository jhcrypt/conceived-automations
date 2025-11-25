import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';
import { useROI } from '@/contexts/ROIContext';

export default function PricingSection() {
  const [annual, setAnnual] = useState(false);
  const { results: calculatorResults } = useROI();
  const isDynamic = calculatorResults !== null;
  
  // Debug logging
  console.log('PricingSection render:', { calculatorResults, isDynamic });

  // Calculate dynamic pricing based on calculator results
  const getDynamicPricing = () => {
    if (!calculatorResults) {
      return {
        starter: 1250,
        growth: 2800,
        enterprise: 'Custom',
      };
    }
    
    const tav = calculatorResults.totalAnnualValue || 0;
    
    // Calculate recommended investment range (10-20% of TAV)
    const minInvestment = tav * 0.10;
    const maxInvestment = tav * 0.20;
    
    // Calculate monthly prices based on investment range
    const starterMonthly = Math.round((minInvestment * 0.7) / 12); // 70% of min investment
    const growthMonthly = Math.round((minInvestment + maxInvestment) / 2 / 12); // Average of range
    const enterpriseMonthly = Math.round((maxInvestment * 1.2) / 12); // 120% of max investment
    
    // Ensure minimum prices
    return {
      starter: Math.max(starterMonthly, 1000),
      growth: Math.max(growthMonthly, 2500),
      enterprise: enterpriseMonthly > 10000 ? 'Custom' : Math.max(enterpriseMonthly, 5000),
    };
  };
  
  const dynamicPrices = getDynamicPricing();
  
  // Debug logging
  console.log('Dynamic prices:', dynamicPrices);
  
  const plans = [
    {
      name: 'Starter',
      desc: 'Perfect for small businesses needing key processes automated.',
      monthly: dynamicPrices.starter,
      features: [
        'n8n Cloud Hosting included',
        'Up to 5 Active Workflows',
        'Monthly Maintenance & Monitoring',
        'Email Support (48h response)',
        '1 hour Strategy Call / month',
      ],
      cta: 'Start Automating',
    },
    {
      name: 'Growth',
      desc: 'For scaling companies requiring AI and complex integrations.',
      monthly: dynamicPrices.growth,
      popular: true,
      features: [
        'Everything in Starter',
        'Up to 15 Active Workflows',
        'AI Agent Integration (GPT/Claude)',
        'Priority Support (24h response)',
        'Custom Dashboard',
        'Quarterly Optimization Audit',
      ],
      cta: 'Scale Your Business',
    },
    {
      name: 'Enterprise',
      desc: 'Dedicated infrastructure for high-volume operations.',
      monthly: dynamicPrices.enterprise,
      features: [
        'Dedicated Server Infrastructure',
        'Unlimited Workflows',
        'SLA Guarantees',
        'Dedicated Account Manager',
        'On-premise deployment options',
        'Team Training',
      ],
      cta: 'Contact Sales',
    },
  ];

  const scrollToContact = () => {
    const element = document.querySelector('#contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="section bg-background" id="pricing">
      <div className="container py-20">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">
            <span className="text-white">Transparent </span>
            <span className="gradient-text">Pricing</span>
          </h2>
          <p className="text-gray-400 text-lg">
            Choose the plan that fits your automation maturity
          </p>
          {isDynamic && (
            <div className="mt-4 inline-block px-4 py-2 bg-violet-500/10 border border-violet-500/30 rounded-lg">
              <p className="text-violet-400 text-sm font-medium">
                ✨ Pricing customized based on your ${calculatorResults.totalAnnualValue.toLocaleString()} annual automation value
              </p>
            </div>
          )}
        </div>

        <div className="flex justify-center items-center gap-4 mt-8">
          <span className={`text-sm font-medium ${!annual ? 'text-white' : 'text-foreground/60'}`}>
            Monthly
          </span>
          <button
            onClick={() => setAnnual(!annual)}
            className="w-14 h-7 bg-slate-700 rounded-full relative p-1 transition-colors duration-300 hover:bg-slate-600"
          >
            <div
              className={`w-5 h-5 bg-cyan-400 rounded-full shadow-md transform transition-transform duration-300 ${
                annual ? 'translate-x-7' : 'translate-x-0'
              }`}
            ></div>
          </button>
          <span className={`text-sm font-medium ${annual ? 'text-white' : 'text-foreground/60'}`}>
            Annual (Save 20%)
          </span>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 relative">
          {/* Gradient glows */}
          <div className="absolute -top-10 right-1/4 w-[450px] h-[450px] bg-cyan-500/12 rounded-full blur-[140px] pointer-events-none"></div>
          <div className="absolute bottom-0 left-1/4 w-[450px] h-[450px] bg-purple-600/12 rounded-full blur-[140px] pointer-events-none"></div>
          
          {plans.map((plan, idx) => (
            <div
              key={idx}
              className={`glass rounded-lg p-8 border-violet-500/30 hover:border-violet-500/60 hover:shadow-[0_0_30px_rgba(139,92,246,0.3)] hover:scale-105 transition-all duration-300 group flex flex-col ${
                plan.popular ? 'border-violet-500/50 shadow-[0_0_30px_rgba(139,92,246,0.2)]' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-violet-600 to-cyan-500 text-white text-xs font-bold px-4 py-1 rounded-full uppercase tracking-wide">
                  Most Popular
                </div>
              )}

              <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
              <p className="text-foreground/70 text-sm mb-6 h-10">{plan.desc}</p>

              <div className="mb-8">
                <span className="text-4xl font-bold text-primary">
                  {typeof plan.monthly === 'number'
                    ? `$${annual ? Math.round(plan.monthly * 0.8) : plan.monthly}`
                    : plan.monthly}
                </span>
                {typeof plan.monthly === 'number' && (
                  <span className="text-foreground/60 text-sm">/month</span>
                )}
              </div>

              <ul className="space-y-4 mb-8 flex-grow">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-foreground/70 text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                onClick={scrollToContact}
                className={`w-full py-6 text-base font-bold rounded-lg transition-all duration-300 ${
                  plan.popular
                    ? 'border-2 border-violet-500 text-white hover:bg-violet-500/10 hover:shadow-[0_0_20px_rgba(139,92,246,0.5)]'
                    : 'bg-slate-800 text-white border border-violet-500/30 hover:border-violet-500/60 hover:bg-slate-700'
                }`}
              >
                {plan.cta}
              </Button>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-foreground/60 text-sm">
            All plans include ongoing maintenance, monitoring, and regular optimization reviews.
            <br />
            One-time setup fees may apply based on complexity.
          </p>
        </div>
      </div>
    </section>
  );
}
