import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import React, { useEffect } from 'react';
import { ROIProvider, useROI } from '@/contexts/ROIContext';
import PricingSection from '../PricingSection';

describe('Dynamic Pricing', () => {
  it('should show default pricing when no calculator results', () => {
    const { container } = render(
      <ROIProvider>
        <PricingSection />
      </ROIProvider>
    );

    // Should show default prices
    const content = container.textContent || '';
    expect(content).toContain('$1250');
    expect(content).toContain('$2800');
    
    // Should not show dynamic pricing indicator
    expect(content).not.toContain('Pricing customized based on');
  });

  it('should show dynamic pricing indicator when calculator results exist', () => {
    // Component that sets ROI results
    function TestWrapper() {
      const { setResults } = useROI();
      
      useEffect(() => {
        setResults({
          totalAnnualValue: 100000,
          monthlySavings: 5000,
          hoursSaved: 120,
          timeReduction: 75,
        });
      }, [setResults]);

      return <PricingSection />;
    }

    const { container } = render(
      <ROIProvider>
        <TestWrapper />
      </ROIProvider>
    );

    // Should show dynamic pricing indicator with TAV
    const content = container.textContent || '';
    expect(content).toContain('Pricing customized based on your $100,000 annual automation value');
  });

  it('should calculate higher pricing for larger TAV', () => {
    // Component that sets high TAV
    function TestWrapper() {
      const { setResults } = useROI();
      
      useEffect(() => {
        setResults({
          totalAnnualValue: 500000, // $500k TAV
          monthlySavings: 25000,
          hoursSaved: 600,
          timeReduction: 80,
        });
      }, [setResults]);

      return <PricingSection />;
    }

    const { container } = render(
      <ROIProvider>
        <TestWrapper />
      </ROIProvider>
    );

    const content = container.textContent || '';
    
    // With $500k TAV:
    // Min investment: $50k, Max investment: $100k
    // Starter: ($50k * 0.7) / 12 = $2,917
    // Growth: ($50k + $100k) / 2 / 12 = $6,250
    // Prices should be higher than defaults
    expect(content).toContain('$500,000');
    
    // Verify prices are calculated (not showing defaults)
    const hasDefaultPrices = content.includes('$1250') && content.includes('$2800');
    expect(hasDefaultPrices).toBe(false);
  });
});
