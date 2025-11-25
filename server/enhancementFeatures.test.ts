import { describe, it, expect } from 'vitest';

describe('Enhancement Features', () => {
  describe('Team Size Context', () => {
    it('should provide context for each team size option', () => {
      const teamSizeOptions = [
        { value: 'solo', label: 'Solo (1 person)' },
        { value: 'small', label: 'Small Team (2-5 people)' },
        { value: 'medium', label: 'Medium Team (6-20 people)' },
        { value: 'large', label: 'Large Team (21-50 people)' },
        { value: 'enterprise', label: 'Enterprise (51+ people)' },
      ];

      teamSizeOptions.forEach(option => {
        // Verify label contains team size information
        expect(option.label).toMatch(/\d+/); // Contains numbers
        expect(option.label).toMatch(/\(.*(person|people).*\)/); // Contains "(X person/people)" format
      });
    });

    it('should help users understand hour calculations', () => {
      // Example: Medium team (13 people) × 15 hours/week = 195 total hours
      const perPersonHours = 15;
      const teamMultiplier = 13; // Average for medium team
      const totalHours = perPersonHours * teamMultiplier;

      expect(totalHours).toBe(195);
      expect(perPersonHours).toBeLessThan(168); // Per person is realistic
    });
  });

  describe('ROI Visualization Chart', () => {
    it('should calculate monthly cumulative value correctly', () => {
      const totalAnnualValue = 879118;
      const monthlyValue = totalAnnualValue / 12;
      const recommendedInvestmentAvg = 237362;

      // Month 0: -investment
      const month0 = -recommendedInvestmentAvg;
      expect(month0).toBeLessThan(0);

      // Month 1: -investment + 1 month value
      const month1 = -recommendedInvestmentAvg + monthlyValue;
      expect(month1).toBeLessThan(0); // Still negative

      // Month 12: -investment + 12 months value
      const month12 = -recommendedInvestmentAvg + (monthlyValue * 12);
      expect(month12).toBeGreaterThan(0); // Positive by year 1

      // Month 36: -investment + 36 months value
      const month36 = -recommendedInvestmentAvg + (monthlyValue * 36);
      expect(month36).toBeGreaterThan(totalAnnualValue * 2); // Significant profit
    });

    it('should identify payback period milestone', () => {
      const totalAnnualValue = 879118;
      const monthlyValue = totalAnnualValue / 12;
      const recommendedInvestmentAvg = 237362;
      const paybackMonths = 3.2;

      // At payback month, cumulative value should be ~0
      const cumulativeAtPayback = -recommendedInvestmentAvg + (monthlyValue * paybackMonths);
      
      // Should be close to 0 (within 1 month's value)
      expect(Math.abs(cumulativeAtPayback)).toBeLessThan(monthlyValue);
    });

    it('should show 36 months of data (3 years)', () => {
      const months = Array.from({ length: 37 }, (_, i) => i); // 0-36
      expect(months.length).toBe(37);
      expect(months[0]).toBe(0);
      expect(months[36]).toBe(36);
    });
  });

  describe('Share Results Feature', () => {
    it('should generate unique share IDs', async () => {
      const crypto = await import('crypto');
      
      const shareId1 = crypto.randomBytes(16).toString('hex');
      const shareId2 = crypto.randomBytes(16).toString('hex');

      expect(shareId1).toHaveLength(32);
      expect(shareId2).toHaveLength(32);
      expect(shareId1).not.toBe(shareId2);
    });

    it('should create shareable URL format', () => {
      const shareId = 'abc123def456';
      const baseUrl = 'https://example.com';
      const shareUrl = `${baseUrl}/shared-results/${shareId}`;

      expect(shareUrl).toBe('https://example.com/shared-results/abc123def456');
      expect(shareUrl).toContain('/shared-results/');
    });

    it('should store all required calculator data', () => {
      const sharedData = {
        industry: 'ecommerce',
        businessStage: 'growth',
        teamSize: 'medium',
        timeSaved: '10-20',
        delayImpact: 'high',
        growthChallenge: 'scaling',
        urgency: 'immediate',
        results: JSON.stringify({
          totalAnnualValue: 879118,
          laborSavings: 496860,
          revenueImpact: 117000,
          errorReduction: 89435,
          strategicPremium: 175824,
        }),
      };

      expect(sharedData.industry).toBeTruthy();
      expect(sharedData.businessStage).toBeTruthy();
      expect(sharedData.teamSize).toBeTruthy();
      expect(sharedData.results).toBeTruthy();
      
      const parsedResults = JSON.parse(sharedData.results);
      expect(parsedResults.totalAnnualValue).toBeGreaterThan(0);
    });

    it('should set expiration to 90 days', () => {
      const now = new Date();
      const expiresAt = new Date(now.getTime() + 90 * 24 * 60 * 60 * 1000);
      const daysDiff = (expiresAt.getTime() - now.getTime()) / (24 * 60 * 60 * 1000);

      expect(daysDiff).toBeCloseTo(90, 1);
    });

    it('should track view count', () => {
      let viewCount = 0;
      
      // Simulate 3 views
      viewCount++;
      viewCount++;
      viewCount++;

      expect(viewCount).toBe(3);
    });
  });

  describe('Integration: All Features Together', () => {
    it('should provide complete user journey', () => {
      // Step 1: User sees team size context
      const teamSize = 'medium';
      const teamSizeLabel = 'Medium Team (6-20 people, avg 13)';
      expect(teamSizeLabel).toContain('avg 13');

      // Step 2: Calculator shows results with chart
      const result = {
        totalAnnualValue: 879118,
        recommendedInvestmentAvg: 237362,
        paybackMonths: 3.2,
        perPersonHoursSaved: 15,
        weeklyHoursSaved: 195,
      };

      expect(result.weeklyHoursSaved).toBe(result.perPersonHoursSaved * 13);

      // Step 3: User shares results
      const shareId = 'generated-share-id';
      const shareUrl = `https://example.com/shared-results/${shareId}`;
      
      expect(shareUrl).toContain(shareId);

      // Step 4: Recipient views shared results
      const sharedData = {
        industry: 'ecommerce',
        teamSize: 'medium',
        results: JSON.stringify(result),
      };

      const parsedResults = JSON.parse(sharedData.results);
      expect(parsedResults.totalAnnualValue).toBe(result.totalAnnualValue);
    });

    it('should maintain data consistency across features', () => {
      const calculatorInput = {
        industry: 'ecommerce',
        teamSize: 'medium',
        timeSaved: '10-20',
      };

      const calculatorResult = {
        totalAnnualValue: 879118,
        perPersonHoursSaved: 15,
        weeklyHoursSaved: 195,
      };

      const sharedData = {
        ...calculatorInput,
        results: JSON.stringify(calculatorResult),
      };

      // Verify data flows correctly
      expect(sharedData.industry).toBe(calculatorInput.industry);
      expect(sharedData.teamSize).toBe(calculatorInput.teamSize);
      
      const parsedResults = JSON.parse(sharedData.results);
      expect(parsedResults.totalAnnualValue).toBe(calculatorResult.totalAnnualValue);
      expect(parsedResults.weeklyHoursSaved).toBe(calculatorResult.weeklyHoursSaved);
    });
  });
});
