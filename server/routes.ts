import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContestantSchema, insertVoteSchema } from "@shared/schema";

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

  app.delete("/api/contestants/:id", async (req, res) => {
    try {
      const deleted = await storage.deleteContestant(req.params.id);
      if (!deleted) {
        return res.status(404).json({ error: "Contestant not found" });
      }
      res.json({ success: true });
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
      await storage.deleteAllVotes();
      res.json({ success: true });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.post("/api/contestants/:id/vote", async (req, res) => {
    try {
      const { walletAddress } = req.body;
      
      if (!walletAddress) {
        return res.status(400).json({ error: "Wallet address is required" });
      }

      // Check if user has already voted
      const existingVote = await storage.getVoteByWalletAddress(walletAddress);
      if (existingVote) {
        return res.status(400).json({ 
          error: "You have already voted",
          votedFor: existingVote.contestantId 
        });
      }

      // Record the vote
      const contestant = await storage.voteForContestant(req.params.id);
      if (!contestant) {
        return res.status(404).json({ error: "Contestant not found" });
      }

      // Save vote record
      await storage.recordVote({
        walletAddress,
        contestantId: req.params.id
      });

      res.json(contestant);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Get vote status for a wallet address
  app.get("/api/votes/:walletAddress", async (req, res) => {
    try {
      const vote = await storage.getVoteByWalletAddress(req.params.walletAddress);
      res.json(vote || null);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
