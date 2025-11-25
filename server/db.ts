import { eq, isNull } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { 
  InsertUser, 
  users, 
  contactSubmissions, 
  InsertContactSubmission,
  roiCalculations,
  InsertRoiCalculation,
  emailSubscribers,
  InsertEmailSubscriber,
  workflowQuestionnaires,
  workflows,
  magicLinks,
  workflowAnalytics
} from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

/**
 * Contact form submission helpers
 */
export async function createContactSubmission(submission: InsertContactSubmission) {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }
  
  const result = await db.insert(contactSubmissions).values(submission);
  return result;
}

export async function getAllContactSubmissions() {
  const db = await getDb();
  if (!db) {
    return [];
  }
  
  return await db.select().from(contactSubmissions).orderBy(contactSubmissions.createdAt);
}

/**
 * ROI Calculator helpers
 */
export async function createRoiCalculation(calculation: InsertRoiCalculation) {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }
  
  const result = await db.insert(roiCalculations).values(calculation);
  return result;
}

export async function getAllRoiCalculations() {
  const db = await getDb();
  if (!db) {
    return [];
  }
  
  return await db.select().from(roiCalculations).orderBy(roiCalculations.createdAt);
}

/**
 * Email subscriber helpers
 */
export async function createEmailSubscriber(email: string) {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }
  
  try {
    const result = await db.insert(emailSubscribers).values({ email });
    return result;
  } catch (error: any) {
    // Handle duplicate email error
    if (error.code === 'ER_DUP_ENTRY') {
      throw new Error("Email already subscribed");
    }
    throw error;
  }
}

export async function getAllEmailSubscribers() {
  const db = await getDb();
  if (!db) {
    return [];
  }
  
  return await db.select().from(emailSubscribers)
    .where(isNull(emailSubscribers.unsubscribedAt))
    .orderBy(emailSubscribers.subscribedAt);
}

/**
 * Workflow questionnaire helpers
 */
export async function createWorkflowQuestionnaire(data: {
  email: string;
  businessType: string;
  industry?: string;
  companySize: string;
  processDescription: string;
  currentTools: string;
  painPoints: string;
  desiredOutcome: string;
  estimatedHoursPerWeek: number;
}) {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }
  
  const result = await db.insert(workflowQuestionnaires).values(data);
  return result[0].insertId;
}

/**
 * Workflow generation and management helpers
 */
export async function generateWorkflow(data: {
  questionnaireId: number;
  email: string;
  name: string;
  businessType: string;
  processDescription: string;
  currentTools: string;
  desiredOutcome: string;
  estimatedHoursPerWeek: number;
}) {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }
  
  // Import AI generation helper
  const { generateWorkflowWithAI } = await import('./workflowGenerator');
  
  // Generate workflow using AI
  const aiWorkflow = await generateWorkflowWithAI({
    businessType: data.businessType,
    processDescription: data.processDescription,
    currentTools: JSON.parse(data.currentTools),
    desiredOutcome: data.desiredOutcome,
  });
  
  // Save workflow to database
  const result = await db.insert(workflows).values({
    questionnaireId: data.questionnaireId,
    email: data.email,
    name: aiWorkflow.name,
    description: aiWorkflow.description,
    toolsUsed: JSON.stringify(aiWorkflow.toolsUsed),
    complexity: aiWorkflow.complexity,
    estimatedSavingsHours: Math.round(data.estimatedHoursPerWeek * 0.75),
    nodeCount: aiWorkflow.nodeCount,
    workflowData: JSON.stringify(aiWorkflow.fullWorkflow),
    iconOnlyData: JSON.stringify(aiWorkflow.iconOnlyWorkflow),
    status: 'generated',
  });
  
  const workflowId = result[0].insertId;
  
  // Track analytics
  await db.insert(workflowAnalytics).values({
    workflowId,
    email: data.email,
    eventType: 'link_sent',
    metadata: JSON.stringify({ name: data.name }),
  });
  
  return {
    id: workflowId,
    name: aiWorkflow.name,
    description: aiWorkflow.description,
  };
}

export async function getWorkflowById(workflowId: number) {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }
  
  const result = await db.select().from(workflows).where(eq(workflows.id, workflowId)).limit(1);
  return result.length > 0 ? result[0] : null;
}

/**
 * Magic link helpers
 */
export async function createMagicLink(data: {
  email: string;
  workflowId: number;
}) {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }
  
  // Generate secure random token
  const crypto = await import('crypto');
  const token = crypto.randomBytes(32).toString('hex');
  
  // Set expiration to 48 hours from now
  const expiresAt = new Date(Date.now() + 48 * 60 * 60 * 1000);
  
  await db.insert(magicLinks).values({
    email: data.email,
    workflowId: data.workflowId,
    token,
    expiresAt,
  });
  
  // Send magic link email
  const { sendMagicLinkEmail } = await import('./emailService');
  await sendMagicLinkEmail({
    email: data.email,
    token,
    workflowId: data.workflowId,
  });
  
  return { token, expiresAt };
}

export async function verifyMagicLink(token: string) {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }
  
  const result = await db.select().from(magicLinks).where(eq(magicLinks.token, token)).limit(1);
  
  if (result.length === 0) {
    return null;
  }
  
  const link = result[0];
  
  // Check if expired
  if (new Date() > link.expiresAt) {
    return null;
  }
  
  // Check if already used
  if (link.usedAt) {
    return null;
  }
  
  // Mark as used
  await db.update(magicLinks)
    .set({ usedAt: new Date() })
    .where(eq(magicLinks.id, link.id));
  
  // Track analytics
  await db.insert(workflowAnalytics).values({
    workflowId: link.workflowId,
    email: link.email,
    eventType: 'link_opened',
  });
  
  return {
    workflowId: link.workflowId,
    email: link.email,
  };
}


export async function getMagicLinkByToken(token: string) {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }
  
  const result = await db.select().from(magicLinks).where(eq(magicLinks.token, token)).limit(1);
  return result.length > 0 ? result[0] : null;
}

export async function trackWorkflowEvent(data: {
  workflowId: number;
  email: string;
  eventType: 'link_sent' | 'link_opened' | 'preview_viewed' | 'cta_clicked' | 'call_scheduled';
  metadata?: string;
}) {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }
  
  await db.insert(workflowAnalytics).values(data);
}
