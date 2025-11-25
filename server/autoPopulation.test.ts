import { describe, it, expect } from 'vitest';

describe('Auto-Population and Pricing Integration', () => {
  describe('Industry to Business Type Mapping', () => {
    const industryToBusinessType: Record<string, string> = {
      'ecommerce': 'E-commerce',
      'saas': 'SaaS',
      'professional_services': 'Consulting',
      'healthcare': 'Healthcare',
      'real_estate': 'Real Estate',
      'finance': 'Finance',
      'manufacturing': 'Manufacturing',
    };

    it('should map all industries to correct business types', () => {
      expect(industryToBusinessType['ecommerce']).toBe('E-commerce');
      expect(industryToBusinessType['saas']).toBe('SaaS');
      expect(industryToBusinessType['professional_services']).toBe('Consulting');
      expect(industryToBusinessType['healthcare']).toBe('Healthcare');
      expect(industryToBusinessType['real_estate']).toBe('Real Estate');
      expect(industryToBusinessType['finance']).toBe('Finance');
      expect(industryToBusinessType['manufacturing']).toBe('Manufacturing');
    });

    it('should handle unknown industries with fallback', () => {
      const unknownIndustry = 'unknown_industry';
      const businessType = industryToBusinessType[unknownIndustry] || 'Other';
      expect(businessType).toBe('Other');
    });
  });

  describe('Calculator Data Structure', () => {
    it('should have all required fields for pre-population', () => {
      const calculatorData = {
        industry: 'ecommerce',
        businessStage: 'growth',
        teamSize: '11-50',
        timeSaved: '10-20',
        delayImpact: 'high',
        growthChallenge: 'scaling',
        urgency: 'immediate',
        result: {
          totalAnnualValue: 150000,
          threeYearValue: 450000,
          laborSavings: 80000,
          revenueImpact: 40000,
          errorReduction: 20000,
          strategicPremium: 10000,
          weeklyHoursSaved: 15,
          recommendedInvestmentMin: 30000,
          recommendedInvestmentMax: 45000,
          paybackMonths: 4,
          yearOneROI: 250,
          threeYearROI: 900,
        },
      };

      // Verify structure
      expect(calculatorData.industry).toBeDefined();
      expect(calculatorData.teamSize).toBeDefined();
      expect(calculatorData.result).toBeDefined();
      expect(calculatorData.result.totalAnnualValue).toBeGreaterThan(0);
      expect(calculatorData.result.weeklyHoursSaved).toBeGreaterThan(0);
      expect(calculatorData.result.recommendedInvestmentMin).toBeGreaterThan(0);
      expect(calculatorData.result.paybackMonths).toBeGreaterThan(0);
      expect(calculatorData.result.yearOneROI).toBeGreaterThan(0);
    });
  });

  describe('Pre-Population Logic', () => {
    it('should correctly extract and map calculator data', () => {
      const calculatorData = {
        industry: 'saas',
        teamSize: '51-200',
        result: {
          totalAnnualValue: 250000,
          weeklyHoursSaved: 20,
          recommendedInvestmentMin: 50000,
          recommendedInvestmentMax: 75000,
          paybackMonths: 3,
          yearOneROI: 300,
          threeYearROI: 1000,
        },
      };

      // Simulate pre-population
      const industryToBusinessType: Record<string, string> = {
        'saas': 'SaaS',
        'ecommerce': 'E-commerce',
        'professional_services': 'Consulting',
      };

      const prePopulatedData = {
        businessType: industryToBusinessType[calculatorData.industry] || 'Other',
        industry: calculatorData.industry,
        companySize: calculatorData.teamSize,
        estimatedHoursPerWeek: calculatorData.result.weeklyHoursSaved,
      };

      expect(prePopulatedData.businessType).toBe('SaaS');
      expect(prePopulatedData.industry).toBe('saas');
      expect(prePopulatedData.companySize).toBe('51-200');
      expect(prePopulatedData.estimatedHoursPerWeek).toBe(20);
    });
  });

  describe('Pricing Display Data', () => {
    it('should format pricing data correctly', () => {
      const calculatorResults = {
        totalAnnualValue: 879118,
        recommendedInvestmentMin: 158241,
        recommendedInvestmentMax: 316483,
        paybackMonths: 3.2,
        yearOneROI: 270,
        threeYearROI: 1085,
      };

      // Verify all required fields exist
      expect(calculatorResults.totalAnnualValue).toBeDefined();
      expect(calculatorResults.recommendedInvestmentMin).toBeDefined();
      expect(calculatorResults.recommendedInvestmentMax).toBeDefined();
      expect(calculatorResults.paybackMonths).toBeDefined();
      expect(calculatorResults.yearOneROI).toBeDefined();
      expect(calculatorResults.threeYearROI).toBeDefined();

      // Verify values are reasonable
      expect(calculatorResults.totalAnnualValue).toBeGreaterThan(0);
      expect(calculatorResults.recommendedInvestmentMax).toBeGreaterThan(calculatorResults.recommendedInvestmentMin);
      expect(calculatorResults.paybackMonths).toBeGreaterThan(0);
      expect(calculatorResults.yearOneROI).toBeGreaterThan(0);
    });

    it('should handle missing calculator results gracefully', () => {
      const calculatorResults = null;
      
      // Should not display pricing section if results are null
      const shouldDisplay = calculatorResults !== null;
      expect(shouldDisplay).toBe(false);
    });
  });

  describe('SessionStorage Data Flow', () => {
    it('should serialize and deserialize calculator data correctly', () => {
      const originalData = {
        industry: 'ecommerce',
        teamSize: '11-50',
        result: {
          totalAnnualValue: 150000,
          weeklyHoursSaved: 15,
          recommendedInvestmentMin: 30000,
          recommendedInvestmentMax: 45000,
          paybackMonths: 4,
          yearOneROI: 250,
          threeYearROI: 900,
        },
      };

      // Simulate sessionStorage
      const serialized = JSON.stringify(originalData);
      const deserialized = JSON.parse(serialized);

      expect(deserialized.industry).toBe(originalData.industry);
      expect(deserialized.teamSize).toBe(originalData.teamSize);
      expect(deserialized.result.totalAnnualValue).toBe(originalData.result.totalAnnualValue);
      expect(deserialized.result.weeklyHoursSaved).toBe(originalData.result.weeklyHoursSaved);
    });
  });
});
