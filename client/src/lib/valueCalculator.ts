/**
 * Value-Based Pricing Calculator - Inference Engine
 * 
 * Calculates Total Annual Value (TAV) based on user responses
 * without asking intrusive questions about revenue or salaries
 */

import {
  INDUSTRY_BENCHMARKS,
  TEAM_SIZE_MULTIPLIERS,
  TIME_IMPACT_HOURS,
  SALARY_RANGE_RATES,
  type BusinessStage,
  type TimeImpact,
  type TeamSize,
  type SalaryRange,
  type Urgency,
  type DelayImpact,
  type GrowthChallenge,
} from "./industryBenchmarks";

export interface ValueCalculatorInputs {
  industry: string;
  businessStage: BusinessStage;
  teamSize: TeamSize;
  salaryRange: SalaryRange;
  timeSaved: TimeImpact;
  // Kept for backward compat but no longer shown in form
  delayImpact?: DelayImpact;
  growthChallenge?: GrowthChallenge;
  urgency?: Urgency;
}

export interface ValueCalculationResult {
  // Breakdown
  laborSavings: number;
  revenueImpact: number;
  errorReduction: number;
  strategicPremium: number;
  
  // Totals
  totalAnnualValue: number;
  threeYearValue: number;
  
  // Investment recommendation
  recommendedInvestmentMin: number;
  recommendedInvestmentMax: number;
  recommendedInvestmentAvg: number;
  
  // ROI metrics
  paybackMonths: number;
  yearOneROI: number;
  threeYearROI: number;
  
  // Context for display
  inferredRevenue: number;
  inferredHourlyRate: number;
  weeklyHoursSaved: number; // Total team hours
  perPersonHoursSaved: number; // Hours per person
  teamSizeMultiplier: number; // For reference
  
  // Additional metrics for display
  monthlySavings: number; // TAV / 12
  hoursSaved: number; // Annual hours saved
  timeReduction: number; // Percentage of time saved
}

/**
 * Main calculation function
 */
export function calculateValue(inputs: ValueCalculatorInputs): ValueCalculationResult {
  const benchmark = INDUSTRY_BENCHMARKS[inputs.industry] || INDUSTRY_BENCHMARKS.other;
  
  // Infer revenue based on industry and stage
  const revenueRange = benchmark.revenueByStage[inputs.businessStage];
  const inferredRevenue = (revenueRange.min + revenueRange.max) / 2;
  
  // Get hourly rate from user's salary selection — not inferred
  const inferredHourlyRate = SALARY_RANGE_RATES[inputs.salaryRange];
  
  // Calculate weekly hours saved
  const perPersonHoursSaved = TIME_IMPACT_HOURS[inputs.timeSaved];
  const teamSizeMultiplier = TEAM_SIZE_MULTIPLIERS[inputs.teamSize];
  const weeklyHoursSaved = perPersonHoursSaved * teamSizeMultiplier;
  
  // 1. Labor Savings — capped by business stage
  const stageCapMultiplier: Record<BusinessStage, number> = {
    startup: 0.3,
    growing: 0.55,
    scaling: 0.75,
    established: 1.0,
  };
  const laborSavings = calculateLaborSavings(weeklyHoursSaved, inferredHourlyRate) * stageCapMultiplier[inputs.businessStage];

  // 2. Revenue Impact — use moderate fixed multiplier since we removed delay impact step
  const revenueImpact = calculateRevenueImpact(inferredRevenue, 'lost_sales', inputs.businessStage);

  // 3. Error Reduction
  const errorReduction = calculateErrorReduction(laborSavings, benchmark.errorCostMultiplier, 'not_critical');

  // 4. Base TAV
  const baseTAV = laborSavings + revenueImpact + errorReduction;

  // 5. Fixed 20% strategic premium
  const strategicPremium = baseTAV * 0.20;

  // 6. Total Annual Value
  const totalAnnualValue = baseTAV + strategicPremium;

  // 7. Investment recommendation — no urgency multiplier
  const baseInvestment = totalAnnualValue * 0.15 + inferredRevenue * 0.01;
  const recommendedInvestmentMin = baseInvestment * 0.8;
  const recommendedInvestmentMax = baseInvestment * 1.2;
  const recommendedInvestmentAvg = baseInvestment;
  
  // 9. Calculate 3-year value (compound benefits)
  const threeYearValue = totalAnnualValue * 3.2;
  
  // 10. Calculate ROI metrics
  const paybackMonths = (recommendedInvestmentAvg / totalAnnualValue) * 12;
  const yearOneROI = Math.min(((totalAnnualValue - recommendedInvestmentAvg) / recommendedInvestmentAvg) * 100, 500);
  const threeYearROI = Math.min(((threeYearValue - recommendedInvestmentAvg) / recommendedInvestmentAvg) * 100, 900);
  
  // 11. Calculate additional display metrics
  const monthlySavings = totalAnnualValue / 12;
  const hoursSaved = weeklyHoursSaved * 52; // Annual hours saved
  const timeReduction = (perPersonHoursSaved / 40) * 100; // Assuming 40-hour work week
  
  return {
    laborSavings,
    revenueImpact,
    errorReduction,
    strategicPremium,
    totalAnnualValue,
    threeYearValue,
    recommendedInvestmentMin,
    recommendedInvestmentMax,
    recommendedInvestmentAvg,
    paybackMonths,
    yearOneROI,
    threeYearROI,
    inferredRevenue,
    inferredHourlyRate,
    weeklyHoursSaved,
    perPersonHoursSaved,
    teamSizeMultiplier,
    monthlySavings,
    hoursSaved,
    timeReduction,
  };
}

/**
 * Calculate labor savings
 * Formula: Hours saved per week × 52 weeks × Hourly rate × 0.7 (conservative)
 */
function calculateLaborSavings(weeklyHours: number, hourlyRate: number): number {
  return weeklyHours * 52 * hourlyRate * 0.7;
}

/**
 * Calculate revenue impact based on delay impact and business stage
 */
function calculateRevenueImpact(
  inferredRevenue: number,
  delayImpact: DelayImpact,
  businessStage: BusinessStage
): number {
  const impactMultiplier = DELAY_IMPACT_MULTIPLIERS[delayImpact];
  
  // Base revenue impact percentage by stage
  const stageImpactRate: Record<BusinessStage, number> = {
    startup: 0.10, // 10% revenue impact for startups
    growing: 0.08, // 8% for growing
    scaling: 0.06, // 6% for scaling
    established: 0.04, // 4% for established
  };
  
  const baseRate = stageImpactRate[businessStage];
  const adjustedRate = baseRate * (impactMultiplier / 2); // Normalize multiplier
  
  return inferredRevenue * adjustedRate;
}

/**
 * Calculate error reduction savings
 */
function calculateErrorReduction(
  laborSavings: number,
  errorCostMultiplier: number,
  delayImpact: DelayImpact
): number {
  // Base error cost as percentage of labor savings
  const baseErrorCost = laborSavings * 0.15; // 15% of labor cost typically goes to rework
  
  // Apply industry error multiplier
  const industryAdjusted = baseErrorCost * errorCostMultiplier;
  
  // If compliance or quality is a concern, increase error savings
  if (delayImpact === "compliance") {
    return industryAdjusted * 2.0; // Double for compliance issues
  }
  
  return industryAdjusted;
}

/**
 * Format currency for display
 */
export function formatCurrency(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

/**
 * Format percentage for display
 */
export function formatPercentage(value: number): string {
  return `${Math.round(value).toLocaleString('en-US')}%`;
}

/**
 * Format number with commas
 */
export function formatNumber(value: number): string {
  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 1,
  }).format(Math.round(value * 10) / 10);
}
