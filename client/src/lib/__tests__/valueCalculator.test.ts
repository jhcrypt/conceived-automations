import { describe, it, expect } from 'vitest';
import { calculateValue } from '../valueCalculator';
import type { ValueCalculatorInputs } from '../valueCalculator';

describe('Value Calculator Accuracy', () => {
  it('should calculate correct values for a typical e-commerce business', () => {
    const inputs: ValueCalculatorInputs = {
      industry: 'ecommerce',
      businessStage: 'growing',
      teamSize: '11-25',
      timeSaved: '10-20',
      delayImpact: 'moderate',
      growthChallenge: 'scaling',
      urgency: 'moderate',
    };

    console.log('Input values:', JSON.stringify(inputs, null, 2));
    const result = calculateValue(inputs);
    console.log('Result:', JSON.stringify(result, null, 2));

    // Verify all required fields exist
    expect(result.totalAnnualValue).toBeGreaterThan(0);
    expect(result.monthlySavings).toBeGreaterThan(0);
    expect(result.hoursSaved).toBeGreaterThan(0);
    expect(result.timeReduction).toBeGreaterThan(0);

    // Verify monthlySavings is TAV / 12
    expect(result.monthlySavings).toBe(result.totalAnnualValue / 12);

    // Verify hoursSaved is weeklyHoursSaved * 52
    expect(result.hoursSaved).toBe(result.weeklyHoursSaved * 52);

    // Verify timeReduction is percentage (0-100)
    expect(result.timeReduction).toBeGreaterThanOrEqual(0);
    expect(result.timeReduction).toBeLessThanOrEqual(100);

    // Log values for manual verification
    console.log('E-commerce Growing Business (11-25 employees, 10-20 hours saved):');
    console.log(`  Total Annual Value: $${result.totalAnnualValue.toLocaleString()}`);
    console.log(`  Monthly Savings: $${result.monthlySavings.toLocaleString()}`);
    console.log(`  Hours Saved (Annual): ${result.hoursSaved.toLocaleString()}`);
    console.log(`  Time Reduction: ${result.timeReduction.toFixed(1)}%`);
    console.log(`  Weekly Hours Saved: ${result.weeklyHoursSaved}`);
    console.log(`  Per Person Hours Saved: ${result.perPersonHoursSaved}`);
  });

  it('should calculate correct values for a small startup', () => {
    const inputs: ValueCalculatorInputs = {
      industry: 'saas',
      businessStage: 'startup',
      teamSize: '1-5',
      timeSaved: '5-10',
      delayImpact: 'minor',
      growthChallenge: 'capacity',
      urgency: 'low',
    };

    const result = calculateValue(inputs);

    // Verify calculations
    expect(result.monthlySavings).toBe(result.totalAnnualValue / 12);
    expect(result.hoursSaved).toBe(result.weeklyHoursSaved * 52);

    console.log('\\nSaaS Startup (1-5 employees, 5-10 hours saved):');
    console.log(`  Total Annual Value: $${result.totalAnnualValue.toLocaleString()}`);
    console.log(`  Monthly Savings: $${result.monthlySavings.toLocaleString()}`);
    console.log(`  Hours Saved (Annual): ${result.hoursSaved.toLocaleString()}`);
    console.log(`  Time Reduction: ${result.timeReduction.toFixed(1)}%`);
  });

  it('should calculate correct values for a large established company', () => {
    const inputs: ValueCalculatorInputs = {
      industry: 'healthcare',
      businessStage: 'established',
      teamSize: '50+',
      timeSaved: '20+',
      delayImpact: 'severe',
      growthChallenge: 'complexity',
      urgency: 'high',
    };

    const result = calculateValue(inputs);

    // Verify calculations
    expect(result.monthlySavings).toBe(result.totalAnnualValue / 12);
    expect(result.hoursSaved).toBe(result.weeklyHoursSaved * 52);

    // Large companies should have higher values
    expect(result.totalAnnualValue).toBeGreaterThan(100000);

    console.log('\\nHealthcare Established (50+ employees, 20+ hours saved):');
    console.log(`  Total Annual Value: $${result.totalAnnualValue.toLocaleString()}`);
    console.log(`  Monthly Savings: $${result.monthlySavings.toLocaleString()}`);
    console.log(`  Hours Saved (Annual): ${result.hoursSaved.toLocaleString()}`);
    console.log(`  Time Reduction: ${result.timeReduction.toFixed(1)}%`);
  });

  it('should have consistent relationships between values', () => {
    const inputs: ValueCalculatorInputs = {
      industry: 'manufacturing',
      businessStage: 'scaling',
      teamSize: '26-50',
      timeSaved: '15-20',
      delayImpact: 'moderate',
      growthChallenge: 'scaling',
      urgency: 'moderate',
    };

    const result = calculateValue(inputs);

    // TAV should be sum of components
    const calculatedTAV = result.laborSavings + result.revenueImpact + result.errorReduction + result.strategicPremium;
    expect(Math.abs(result.totalAnnualValue - calculatedTAV)).toBeLessThan(1); // Allow for rounding

    // 3-year value should be TAV * 3.2
    expect(result.threeYearValue).toBe(result.totalAnnualValue * 3.2);

    // Monthly savings should be TAV / 12
    expect(result.monthlySavings).toBe(result.totalAnnualValue / 12);

    console.log('\\nManufacturing Scaling (26-50 employees):');
    console.log(`  Labor Savings: $${result.laborSavings.toLocaleString()}`);
    console.log(`  Revenue Impact: $${result.revenueImpact.toLocaleString()}`);
    console.log(`  Error Reduction: $${result.errorReduction.toLocaleString()}`);
    console.log(`  Strategic Premium: $${result.strategicPremium.toLocaleString()}`);
    console.log(`  Total Annual Value: $${result.totalAnnualValue.toLocaleString()}`);
    console.log(`  Calculated TAV: $${calculatedTAV.toLocaleString()}`);
  });
});
