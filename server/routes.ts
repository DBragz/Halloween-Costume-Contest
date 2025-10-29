import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContestantSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Contestant routes
  app.post("/api/contestants", async (req, res) => {
    try {
      const validatedData = insertContestantSchema.parse(req.body);
      const contestant = await storage.createContestant(validatedData);
      res.json(contestant);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  app.get("/api/contestants", async (req, res) => {
    try {
      const contestants = await storage.getContestants();
      res.json(contestants);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.delete("/api/contestants", async (req, res) => {
    try {
      await storage.deleteAllContestants();
      res.json({ success: true });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.post("/api/contestants/wipe-votes", async (req, res) => {
    try {
      await storage.wipeVotes();
      res.json({ success: true });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.post("/api/contestants/:id/vote", async (req, res) => {
    try {
      const contestant = await storage.voteForContestant(req.params.id);
      if (!contestant) {
        return res.status(404).json({ error: "Contestant not found" });
      }
      res.json(contestant);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
