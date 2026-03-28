/**
 * Industry Benchmarks for Value-Based Pricing Calculator
 * 
 * This database contains industry-specific benchmarks for:
 * - Average hourly labor costs
 * - Revenue ranges by business stage
 * - Error cost multipliers
 * - Strategic value premiums
 */

export interface IndustryBenchmark {
  id: string;
  name: string;
  avgHourlyRate: number; // Average hourly cost including benefits
  revenueByStage: {
    startup: { min: number; max: number };
    growing: { min: number; max: number };
    scaling: { min: number; max: number };
    established: { min: number; max: number };
  };
  errorCostMultiplier: number; // Multiplier for error impact
  strategicPremiumRange: { min: number; max: number }; // % of TAV
}

export const INDUSTRY_BENCHMARKS: Record<string, IndustryBenchmark> = {
  ecommerce: {
    id: "ecommerce",
    name: "E-commerce/Retail",
    avgHourlyRate: 35,
    revenueByStage: {
      startup: { min: 0, max: 250000 },
      growing: { min: 250000, max: 1000000 },
      scaling: { min: 1000000, max: 5000000 },
      established: { min: 5000000, max: 50000000 },
    },
    errorCostMultiplier: 1.2, // Order errors, inventory issues
    strategicPremiumRange: { min: 15, max: 25 },
  },
  professionalServices: {
    id: "professionalServices",
    name: "Professional Services (Legal, Accounting, Consulting)",
    avgHourlyRate: 75,
    revenueByStage: {
      startup: { min: 0, max: 500000 },
      growing: { min: 500000, max: 2000000 },
      scaling: { min: 2000000, max: 10000000 },
      established: { min: 10000000, max: 100000000 },
    },
    errorCostMultiplier: 2.5, // High cost of errors, compliance risks
    strategicPremiumRange: { min: 20, max: 30 },
  },
  saas: {
    id: "saas",
    name: "SaaS/Technology",
    avgHourlyRate: 65,
    revenueByStage: {
      startup: { min: 0, max: 500000 },
      growing: { min: 500000, max: 3000000 },
      scaling: { min: 3000000, max: 20000000 },
      established: { min: 20000000, max: 200000000 },
    },
    errorCostMultiplier: 1.8, // Customer churn, data issues
    strategicPremiumRange: { min: 20, max: 30 },
  },
  healthcare: {
    id: "healthcare",
    name: "Healthcare/Medical",
    avgHourlyRate: 55,
    revenueByStage: {
      startup: { min: 0, max: 1000000 },
      growing: { min: 1000000, max: 5000000 },
      scaling: { min: 5000000, max: 25000000 },
      established: { min: 25000000, max: 250000000 },
    },
    errorCostMultiplier: 3.0, // Compliance, patient safety, HIPAA
    strategicPremiumRange: { min: 25, max: 30 },
  },
  realEstate: {
    id: "realEstate",
    name: "Real Estate",
    avgHourlyRate: 45,
    revenueByStage: {
      startup: { min: 0, max: 500000 },
      growing: { min: 500000, max: 2000000 },
      scaling: { min: 2000000, max: 10000000 },
      established: { min: 10000000, max: 100000000 },
    },
    errorCostMultiplier: 1.5, // Deal delays, communication gaps
    strategicPremiumRange: { min: 15, max: 25 },
  },
  marketing: {
    id: "marketing",
    name: "Marketing/Agency",
    avgHourlyRate: 50,
    revenueByStage: {
      startup: { min: 0, max: 300000 },
      growing: { min: 300000, max: 1500000 },
      scaling: { min: 1500000, max: 7500000 },
      established: { min: 7500000, max: 75000000 },
    },
    errorCostMultiplier: 1.3, // Campaign delays, client churn
    strategicPremiumRange: { min: 15, max: 25 },
  },
  manufacturing: {
    id: "manufacturing",
    name: "Manufacturing/Distribution",
    avgHourlyRate: 40,
    revenueByStage: {
      startup: { min: 0, max: 1000000 },
      growing: { min: 1000000, max: 5000000 },
      scaling: { min: 5000000, max: 25000000 },
      established: { min: 25000000, max: 250000000 },
    },
    errorCostMultiplier: 2.0, // Inventory, quality control, logistics
    strategicPremiumRange: { min: 20, max: 30 },
  },
  other: {
    id: "other",
    name: "Other",
    avgHourlyRate: 45,
    revenueByStage: {
      startup: { min: 0, max: 500000 },
      growing: { min: 500000, max: 2000000 },
      scaling: { min: 2000000, max: 10000000 },
      established: { min: 10000000, max: 100000000 },
    },
    errorCostMultiplier: 1.5,
    strategicPremiumRange: { min: 15, max: 25 },
  },
};

export type BusinessStage = "startup" | "growing" | "scaling" | "established";
export type TimeImpact = "1-5" | "5-10" | "10-20" | "20-40" | "40+";
export type TeamSize = "solo" | "small" | "department" | "multiple";
export type Urgency = "urgent" | "soon" | "planning" | "exploring";
export type DelayImpact = "lost_sales" | "unhappy_customers" | "missed_deadlines" | "compliance" | "burnout" | "not_critical";
export type GrowthChallenge = "demand" | "quality" | "manual_work" | "churn" | "speed" | "hiring";

/**
 * Team size to multiplier mapping
 * Affects labor savings calculation
 */
export const TEAM_SIZE_MULTIPLIERS: Record<TeamSize, number> = {
  solo: 1,
  small: 3,    // 2-5 people avg = 3
  department: 8,  // 6-20 people avg, conservative = 8
  multiple: 15,   // 20+ people avg, conservative = 15
};

/**
 * Time impact to hours per week mapping
 */
export const TIME_IMPACT_HOURS: Record<TimeImpact, number> = {
  "1-5": 3,
  "5-10": 7,
  "10-20": 13,
  "20-40": 25,
  "40+": 35,  // Capped — no one automates a full 50hr work week
};

/**
 * Urgency to pricing multiplier
 */
export const URGENCY_MULTIPLIERS: Record<Urgency, number> = {
  urgent: 1.2, // +20% for urgent
  soon: 1.1, // +10% for soon
  planning: 1.0, // No multiplier
  exploring: 0.9, // -10% for exploring
};

/**
 * Delay impact to opportunity cost multiplier
 */
export const DELAY_IMPACT_MULTIPLIERS: Record<DelayImpact, number> = {
  lost_sales: 2.5, // High revenue impact
  unhappy_customers: 2.0, // Churn risk
  missed_deadlines: 1.5, // Moderate impact
  compliance: 3.0, // High risk/penalty
  burnout: 1.3, // Team retention
  not_critical: 1.0, // No multiplier
};

/**
 * Growth challenge to strategic premium multiplier
 */
export const GROWTH_CHALLENGE_PREMIUMS: Record<GrowthChallenge, number> = {
  demand: 0.30, // 30% premium - critical for scaling
  quality: 0.25, // 25% premium - competitive advantage
  manual_work: 0.20, // 20% premium - operational efficiency
  churn: 0.28, // 28% premium - revenue protection
  speed: 0.25, // 25% premium - competitive positioning
  hiring: 0.22, // 22% premium - growth enablement
};
