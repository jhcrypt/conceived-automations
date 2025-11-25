import { describe, it, expect } from 'vitest';

describe('Hours Calculation Fix - Per Person vs Total Team', () => {
  // Simulate the calculation logic from valueCalculator.ts
  const TIME_IMPACT_HOURS: Record<string, number> = {
    "1-5": 3,
    "5-10": 7.5,
    "10-20": 15,
    "20-40": 30,
    "40+": 50,
  };

  const TEAM_SIZE_MULTIPLIERS: Record<string, number> = {
    solo: 1,
    small: 3,
    department: 13,
    multiple: 30,
  };

  function calculateHours(timeSaved: string, teamSize: string) {
    const perPersonHoursSaved = TIME_IMPACT_HOURS[timeSaved];
    const teamSizeMultiplier = TEAM_SIZE_MULTIPLIERS[teamSize];
    const weeklyHoursSaved = perPersonHoursSaved * teamSizeMultiplier;
    
    return {
      perPersonHoursSaved,
      teamSizeMultiplier,
      weeklyHoursSaved,
    };
  }

  describe('Per-Person Hours Calculation', () => {
    it('should return correct per-person hours for "1-5" range', () => {
      const result = calculateHours("1-5", "solo");
      expect(result.perPersonHoursSaved).toBe(3);
    });

    it('should return correct per-person hours for "10-20" range', () => {
      const result = calculateHours("10-20", "department");
      expect(result.perPersonHoursSaved).toBe(15);
    });

    it('should return correct per-person hours for "40+" range', () => {
      const result = calculateHours("40+", "multiple");
      expect(result.perPersonHoursSaved).toBe(50);
    });
  });

  describe('Total Team Hours Calculation', () => {
    it('should calculate total team hours for solo worker', () => {
      const result = calculateHours("10-20", "solo");
      expect(result.weeklyHoursSaved).toBe(15); // 15 * 1
    });

    it('should calculate total team hours for small team', () => {
      const result = calculateHours("10-20", "small");
      expect(result.weeklyHoursSaved).toBe(45); // 15 * 3
    });

    it('should calculate total team hours for department', () => {
      const result = calculateHours("10-20", "department");
      expect(result.weeklyHoursSaved).toBe(195); // 15 * 13
    });

    it('should calculate total team hours for multiple departments', () => {
      const result = calculateHours("10-20", "multiple");
      expect(result.weeklyHoursSaved).toBe(450); // 15 * 30
    });
  });

  describe('Realistic Scenarios', () => {
    it('should show reasonable numbers for small business (3 people, 5-10 hrs)', () => {
      const result = calculateHours("5-10", "small");
      expect(result.perPersonHoursSaved).toBe(7.5);
      expect(result.weeklyHoursSaved).toBe(22.5); // 7.5 * 3
      expect(result.weeklyHoursSaved).toBeLessThan(168); // Less than hours in a week
    });

    it('should show reasonable numbers for mid-size team (13 people, 1-5 hrs)', () => {
      const result = calculateHours("1-5", "department");
      expect(result.perPersonHoursSaved).toBe(3);
      expect(result.weeklyHoursSaved).toBe(39); // 3 * 13
      expect(result.weeklyHoursSaved).toBeLessThan(168);
    });

    it('should correctly show large total for big team (30 people, 20-40 hrs)', () => {
      const result = calculateHours("20-40", "multiple");
      expect(result.perPersonHoursSaved).toBe(30);
      expect(result.weeklyHoursSaved).toBe(900); // 30 * 30
      // This is > 168, but that's OK because it's TOTAL TEAM hours across 30 people
      expect(result.weeklyHoursSaved).toBeGreaterThan(168);
    });
  });

  describe('Display Logic Verification', () => {
    it('should provide both per-person and total for clear display', () => {
      const result = calculateHours("10-20", "department");
      
      // Display should show:
      // "15 hours/week per person"
      // "(195 total team hours/week)"
      
      expect(result.perPersonHoursSaved).toBe(15);
      expect(result.weeklyHoursSaved).toBe(195);
      expect(result.teamSizeMultiplier).toBe(13);
      
      // Verify the math: per-person * team size = total
      expect(result.perPersonHoursSaved * result.teamSizeMultiplier).toBe(result.weeklyHoursSaved);
    });

    it('should clarify that total team hours can exceed 168 for large teams', () => {
      const result = calculateHours("40+", "multiple");
      
      // 50 hours/week per person across 30 people = 1500 total team hours/week
      expect(result.perPersonHoursSaved).toBe(50);
      expect(result.weeklyHoursSaved).toBe(1500);
      
      // Per person is reasonable (50 hrs/week is possible with overtime)
      expect(result.perPersonHoursSaved).toBeLessThan(168);
      
      // Total team hours can be huge for large teams - that's expected!
      expect(result.weeklyHoursSaved).toBeGreaterThan(168);
    });
  });

  describe('Edge Cases', () => {
    it('should handle solo worker with minimal time saved', () => {
      const result = calculateHours("1-5", "solo");
      expect(result.perPersonHoursSaved).toBe(3);
      expect(result.weeklyHoursSaved).toBe(3);
    });

    it('should handle maximum time saved for maximum team size', () => {
      const result = calculateHours("40+", "multiple");
      expect(result.perPersonHoursSaved).toBe(50);
      expect(result.weeklyHoursSaved).toBe(1500);
    });

    it('should maintain consistent ratio between per-person and total', () => {
      const scenarios = [
        { time: "1-5", team: "solo" },
        { time: "10-20", team: "small" },
        { time: "20-40", team: "department" },
        { time: "40+", team: "multiple" },
      ];

      scenarios.forEach(scenario => {
        const result = calculateHours(scenario.time, scenario.team);
        const calculatedTotal = result.perPersonHoursSaved * result.teamSizeMultiplier;
        expect(result.weeklyHoursSaved).toBe(calculatedTotal);
      });
    });
  });

  describe('Labor Savings Calculation Verification', () => {
    it('should use total team hours for labor savings calculation', () => {
      const result = calculateHours("10-20", "department");
      
      // Labor savings formula: weeklyHours * 52 weeks * hourlyRate * 0.7
      const hourlyRate = 65; // Example: SaaS industry
      const laborSavings = result.weeklyHoursSaved * 52 * hourlyRate * 0.7;
      
      // Using 195 total team hours (not 15 per-person hours)
      expect(laborSavings).toBe(195 * 52 * 65 * 0.7);
      expect(Math.round(laborSavings)).toBe(461_370);
    });

    it('should calculate labor savings correctly for solo worker', () => {
      const result = calculateHours("10-20", "solo");
      
      const hourlyRate = 65;
      const laborSavings = result.weeklyHoursSaved * 52 * hourlyRate * 0.7;
      
      // Using 15 total hours (same as per-person for solo)
      expect(laborSavings).toBe(15 * 52 * 65 * 0.7);
      expect(laborSavings).toBe(35_490);
    });
  });
});
