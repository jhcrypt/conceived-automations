// server/_core/index.ts (Complete Edited File)

import "dotenv/config";
import express from "express";
import { createServer } from "http";
import net from "net";
import path from "path"; // ⬅️ NEW: Import path module
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { registerOAuthRoutes } from "./oauth";
import { appRouter } from "../routers";
import { createContext } from "./context";
import { serveStatic, setupVite } from "./vite"; // serveStatic remains, but we override it below

function isPortAvailable(port: number): Promise<boolean> {
// ... (isPortAvailable function remains the same)
}

async function findAvailablePort(startPort: number = 3000): Promise<number> {
// ... (findAvailablePort function remains the same)
}

async function startServer() {
  const app = express();
  const server = createServer(app);
  // Configure body parser with larger size limit for file uploads
  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ limit: "50mb", extended: true }));
  // OAuth callback under /api/oauth/callback
  registerOAuthRoutes(app);
  // tRPC API
  app.use(
    "/api/trpc",
    createExpressMiddleware({
      router: appRouter,
      createContext,
    })
  );
  
  // ⬅️ FINAL FIX: Inject explicit static middleware path
  if (process.env.NODE_ENV !== "development") {
    // This line assumes your built frontend files are placed in a 'public' folder 
    // inside the same directory where the server binary (index.js) is running (the 'dist' folder).
    // The complex path is required for the client/server separation.
    app.use(express.static(path.join(process.cwd(), 'public')));
  }

  // development mode uses Vite, production mode uses static files
  if (process.env.NODE_ENV === "development") {
    await setupVite(app, server);
  } else {
    // The original call to serveStatic is likely where the error is, but we keep it and add the fix above.
    serveStatic(app);
  }
  // ⬅️ END FINAL FIX

  const preferredPort = parseInt(process.env.PORT || "3000");
  const port = await findAvailablePort(preferredPort);

  if (port !== preferredPort) {
    console.log(`Port ${preferredPort} is busy, using port ${port} instead`);
  }

  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}

startServer().catch(console.error);