import { int, mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * Contact form submissions table
 */
export const contactSubmissions = mysqlTable("contactSubmissions", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 320 }).notNull(),
  companyName: varchar("companyName", { length: 255 }),
  message: text("message").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type ContactSubmission = typeof contactSubmissions.$inferSelect;
export type InsertContactSubmission = typeof contactSubmissions.$inferInsert;

/**
 * Email subscribers for newsletter
 */
export const emailSubscribers = mysqlTable("emailSubscribers", {
  id: int("id").autoincrement().primaryKey(),
  email: varchar("email", { length: 320 }).notNull().unique(),
  subscribedAt: timestamp("subscribedAt").defaultNow().notNull(),
  unsubscribedAt: timestamp("unsubscribedAt"),
});

export type EmailSubscriber = typeof emailSubscribers.$inferSelect;
export type InsertEmailSubscriber = typeof emailSubscribers.$inferInsert;

/**
 * ROI Calculator submissions with calculated savings
 */
export const roiCalculations = mysqlTable("roiCalculations", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 320 }).notNull(),
  companyName: varchar("companyName", { length: 255 }),
  employeeCount: int("employeeCount").notNull(),
  avgHourlyRate: int("avgHourlyRate").notNull(),
  hoursPerWeek: int("hoursPerWeek").notNull(),
  monthlySavings: int("monthlySavings").notNull(),
  yearlySavings: int("yearlySavings").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type RoiCalculation = typeof roiCalculations.$inferSelect;
export type InsertRoiCalculation = typeof roiCalculations.$inferInsert;

/**
 * Workflow questionnaire responses - captures user needs before workflow generation
 */
export const workflowQuestionnaires = mysqlTable("workflowQuestionnaires", {
  id: int("id").autoincrement().primaryKey(),
  email: varchar("email", { length: 320 }).notNull(),
  businessType: varchar("businessType", { length: 255 }).notNull(),
  industry: varchar("industry", { length: 255 }),
  companySize: varchar("companySize", { length: 50 }),
  processDescription: text("processDescription").notNull(),
  currentTools: text("currentTools"), // JSON array of tool names
  painPoints: text("painPoints"),
  desiredOutcome: text("desiredOutcome").notNull(),
  estimatedHoursPerWeek: int("estimatedHoursPerWeek"),
  submittedAt: timestamp("submittedAt").defaultNow().notNull(),
});

export type WorkflowQuestionnaire = typeof workflowQuestionnaires.$inferSelect;
export type InsertWorkflowQuestionnaire = typeof workflowQuestionnaires.$inferInsert;

/**
 * Generated workflows - AI-created automation workflows
 */
export const workflows = mysqlTable("workflows", {
  id: int("id").autoincrement().primaryKey(),
  questionnaireId: int("questionnaireId").notNull(),
  email: varchar("email", { length: 320 }).notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description"),
  toolsUsed: text("toolsUsed"), // JSON array of tool names
  complexity: mysqlEnum("complexity", ["simple", "moderate", "complex"]).default("moderate").notNull(),
  estimatedSavingsHours: int("estimatedSavingsHours"),
  nodeCount: int("nodeCount").notNull(),
  workflowData: text("workflowData").notNull(), // JSON of full workflow structure
  iconOnlyData: text("iconOnlyData").notNull(), // JSON of icon-only version (no labels)
  status: mysqlEnum("status", ["generated", "viewed", "scheduled", "converted"]).default("generated").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  viewedAt: timestamp("viewedAt"),
});

export type Workflow = typeof workflows.$inferSelect;
export type InsertWorkflow = typeof workflows.$inferInsert;

/**
 * Magic links for passwordless workflow preview access
 */
export const magicLinks = mysqlTable("magicLinks", {
  id: int("id").autoincrement().primaryKey(),
  email: varchar("email", { length: 320 }).notNull(),
  workflowId: int("workflowId").notNull(),
  token: varchar("token", { length: 255 }).notNull().unique(),
  expiresAt: timestamp("expiresAt").notNull(),
  usedAt: timestamp("usedAt"),
  ipAddress: varchar("ipAddress", { length: 45 }),
  userAgent: text("userAgent"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type MagicLink = typeof magicLinks.$inferSelect;
export type InsertMagicLink = typeof magicLinks.$inferInsert;

/**
 * Workflow analytics - track user engagement with workflow previews
 */
export const workflowAnalytics = mysqlTable("workflowAnalytics", {
  id: int("id").autoincrement().primaryKey(),
  workflowId: int("workflowId").notNull(),
  email: varchar("email", { length: 320 }).notNull(),
  eventType: mysqlEnum("eventType", ["link_sent", "link_opened", "preview_viewed", "cta_clicked", "call_scheduled"]).notNull(),
  metadata: text("metadata"), // JSON for additional event data
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type WorkflowAnalytic = typeof workflowAnalytics.$inferSelect;
export type InsertWorkflowAnalytic = typeof workflowAnalytics.$inferInsert;
