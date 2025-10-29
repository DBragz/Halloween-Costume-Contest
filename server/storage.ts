import { type User, type InsertUser, type Contestant, type InsertContestant } from "@shared/schema";
import { randomUUID } from "crypto";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Contestant methods
  createContestant(contestant: InsertContestant): Promise<Contestant>;
  getContestants(): Promise<Contestant[]>;
  getContestant(id: string): Promise<Contestant | undefined>;
  deleteAllContestants(): Promise<void>;
  wipeVotes(): Promise<void>;
  voteForContestant(id: string): Promise<Contestant | undefined>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private contestants: Map<string, Contestant>;

  constructor() {
    this.users = new Map();
    this.contestants = new Map();
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Contestant methods
  async createContestant(insertContestant: InsertContestant): Promise<Contestant> {
    const id = randomUUID();
    const contestant: Contestant = {
      ...insertContestant,
      id,
      votes: 0,
      createdAt: new Date(),
    };
    this.contestants.set(id, contestant);
    return contestant;
  }

  async getContestants(): Promise<Contestant[]> {
    return Array.from(this.contestants.values()).sort(
      (a, b) => b.votes - a.votes
    );
  }

  async getContestant(id: string): Promise<Contestant | undefined> {
    return this.contestants.get(id);
  }

  async deleteAllContestants(): Promise<void> {
    this.contestants.clear();
  }

  async wipeVotes(): Promise<void> {
    Array.from(this.contestants.entries()).forEach(([id, contestant]) => {
      this.contestants.set(id, { ...contestant, votes: 0 });
    });
  }

  async voteForContestant(id: string): Promise<Contestant | undefined> {
    const contestant = this.contestants.get(id);
    if (!contestant) {
      return undefined;
    }
    const updatedContestant = { ...contestant, votes: contestant.votes + 1 };
    this.contestants.set(id, updatedContestant);
    return updatedContestant;
  }
}

export const storage = new MemStorage();
