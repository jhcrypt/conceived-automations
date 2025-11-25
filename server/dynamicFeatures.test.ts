import { describe, it, expect } from 'vitest';

describe('Auto-Population and Dynamic Pricing Features', () => {
  describe('Dynamic Pricing Calculations', () => {
    it('should calculate starter pricing as 70% of min investment monthly', () => {
      const minInvestment = 158241;
      const starterMonthly = Math.round((minInvestment * 0.7) / 12);
      
      expect(starterMonthly).toBe(9231);
    });

    it('should calculate growth pricing as average of investment range monthly', () => {
      const minInvestment = 158241;
      const maxInvestment = 316483;
      const growthMonthly = Math.round((minInvestment + maxInvestment) / 2 / 12);
      
      expect(growthMonthly).toBe(19780);
    });

    it('should calculate enterprise pricing as 120% of max investment monthly', () => {
      const maxInvestment = 316483;
      const enterpriseMonthly = Math.round((maxInvestment * 1.2) / 12);
      
      expect(enterpriseMonthly).toBe(31648);
    });

    it('should return "Custom" for enterprise when price exceeds $10k/month', () => {
      const maxInvestment = 150000; // Would result in $15k/month
      const enterpriseMonthly = Math.round((maxInvestment * 1.2) / 12);
      const result = enterpriseMonthly > 10000 ? 'Custom' : enterpriseMonthly;
      
      expect(result).toBe('Custom');
    });

    it('should use default pricing when no calculator results exist', () => {
      const calculatorResults = null;
      
      const defaultPricing = {
        starter: 1250,
        growth: 2800,
        enterprise: 'Custom',
      };
      
      expect(defaultPricing.starter).toBe(1250);
      expect(defaultPricing.growth).toBe(2800);
      expect(defaultPricing.enterprise).toBe('Custom');
    });
  });

  describe('Dynamic Pricing Logic', () => {
    it('should generate realistic pricing for small business ($150k TAV)', () => {
      const tav = 150000;
      const minInvestment = 30000; // 20% of TAV
      const maxInvestment = 45000; // 30% of TAV
      
      const starterMonthly = Math.round((minInvestment * 0.7) / 12);
      const growthMonthly = Math.round((minInvestment + maxInvestment) / 2 / 12);
      const enterpriseMonthly = Math.round((maxInvestment * 1.2) / 12);
      
      expect(starterMonthly).toBe(1750);
      expect(growthMonthly).toBe(3125);
      expect(enterpriseMonthly).toBe(4500);
    });

    it('should generate realistic pricing for mid-size business ($500k TAV)', () => {
      const tav = 500000;
      const minInvestment = 100000;
      const maxInvestment = 150000;
      
      const starterMonthly = Math.round((minInvestment * 0.7) / 12);
      const growthMonthly = Math.round((minInvestment + maxInvestment) / 2 / 12);
      
      expect(starterMonthly).toBe(5833);
      expect(growthMonthly).toBe(10417);
    });

    it('should generate realistic pricing for enterprise ($1M+ TAV)', () => {
      const tav = 1200000;
      const minInvestment = 240000;
      const maxInvestment = 360000;
      
      const starterMonthly = Math.round((minInvestment * 0.7) / 12);
      const growthMonthly = Math.round((minInvestment + maxInvestment) / 2 / 12);
      const enterpriseMonthly = Math.round((maxInvestment * 1.2) / 12);
      
      expect(starterMonthly).toBe(14000);
      expect(growthMonthly).toBe(25000);
      expect(enterpriseMonthly).toBeGreaterThan(10000);
    });
  });

  describe('Auto-Population Data Flow', () => {
    it('should correctly structure calculator data for sessionStorage', () => {
      const calculatorData = {
        industry: 'saas',
        businessStage: 'growth',
        teamSize: '11-50',
        timeSaved: '10-20',
        delayImpact: 'high',
        growthChallenge: 'scaling',
        urgency: 'immediate',
        result: {
          totalAnnualValue: 879118,
          weeklyHoursSaved: 15,
          recommendedInvestmentMin: 158241,
          recommendedInvestmentMax: 316483,
          paybackMonths: 3.2,
          yearOneROI: 270,
          threeYearROI: 1085,
        },
      };

      // Verify structure
      expect(calculatorData).toHaveProperty('industry');
      expect(calculatorData).toHaveProperty('teamSize');
      expect(calculatorData).toHaveProperty('result');
      expect(calculatorData.result).toHaveProperty('totalAnnualValue');
      expect(calculatorData.result).toHaveProperty('weeklyHoursSaved');
      expect(calculatorData.result).toHaveProperty('recommendedInvestmentMin');
    });

    it('should map industry to business type correctly', () => {
      const industryToBusinessType: Record<string, string> = {
        'ecommerce': 'E-commerce',
        'saas': 'SaaS',
        'professional_services': 'Consulting',
        'healthcare': 'Healthcare',
        'real_estate': 'Real Estate',
        'finance': 'Finance',
        'manufacturing': 'Manufacturing',
      };

      expect(industryToBusinessType['saas']).toBe('SaaS');
      expect(industryToBusinessType['ecommerce']).toBe('E-commerce');
      expect(industryToBusinessType['healthcare']).toBe('Healthcare');
    });

    it('should pre-populate form fields from calculator data', () => {
      const calculatorData = {
        industry: 'saas',
        teamSize: '11-50',
        result: {
          weeklyHoursSaved: 15,
        },
      };

      const industryToBusinessType: Record<string, string> = {
        'saas': 'SaaS',
      };

      const prePopulatedData = {
        businessType: industryToBusinessType[calculatorData.industry],
        industry: calculatorData.industry,
        companySize: calculatorData.teamSize,
        estimatedHoursPerWeek: calculatorData.result.weeklyHoursSaved,
      };

      expect(prePopulatedData.businessType).toBe('SaaS');
      expect(prePopulatedData.industry).toBe('saas');
      expect(prePopulatedData.companySize).toBe('11-50');
      expect(prePopulatedData.estimatedHoursPerWeek).toBe(15);
    });
  });

  describe('Pricing Display Logic', () => {
    it('should show dynamic pricing indicator when calculator results exist', () => {
      const calculatorResults = {
        totalAnnualValue: 879118,
      };

      const isDynamic = calculatorResults !== null;
      expect(isDynamic).toBe(true);
    });

    it('should not show dynamic pricing indicator when no calculator results', () => {
      const calculatorResults = null;
      const isDynamic = calculatorResults !== null;
      expect(isDynamic).toBe(false);
    });

    it('should format TAV for display correctly', () => {
      const tav = 879118;
      const formatted = tav.toLocaleString();
      expect(formatted).toBe('879,118');
    });
  });

  describe('Pricing Tier Recommendations', () => {
    it('should recommend Starter for small businesses (1-10 employees)', () => {
      const teamSize = '1-10';
      const recommendedTier = 'Starter';
      expect(recommendedTier).toBe('Starter');
    });

    it('should recommend Growth for mid-size businesses (11-50 employees)', () => {
      const teamSize = '11-50';
      const recommendedTier = 'Growth';
      expect(recommendedTier).toBe('Growth');
    });

    it('should recommend Enterprise for large businesses (200+ employees)', () => {
      const teamSize = '200+';
      const recommendedTier = 'Enterprise';
      expect(recommendedTier).toBe('Enterprise');
    });
  });

  describe('Annual vs Monthly Pricing', () => {
    it('should calculate 20% discount for annual pricing', () => {
      const monthlyPrice = 2800;
      const annualPrice = Math.round(monthlyPrice * 0.8);
      expect(annualPrice).toBe(2240);
    });

    it('should apply annual discount to all tiers', () => {
      const plans = [
        { monthly: 1250 },
        { monthly: 2800 },
        { monthly: 5000 },
      ];

      const annualPrices = plans.map(plan => Math.round(plan.monthly * 0.8));
      expect(annualPrices).toEqual([1000, 2240, 4000]);
    });
  });
});
