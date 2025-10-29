# Halloween Costume Contest - Replit Configuration

## Overview

A decentralized Halloween costume contest application where users can connect their Web3 wallets to enter the contest with costume descriptions, vote for their favorite entries, and view live rankings. The application features an admin panel for contest management and uses WalletConnect for secure, decentralized authentication.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Build Tool**
- React 18 with TypeScript for type-safe component development
- Vite as the build tool and development server for fast hot module replacement
- Wouter for lightweight client-side routing

**State Management**
- TanStack Query (React Query) for server state management and data fetching
- Custom React Context (Web3Context) for wallet connection state
- Local component state for UI interactions

**UI Component System**
- Shadcn UI component library built on Radix UI primitives
- Tailwind CSS for utility-first styling with custom configuration
- Design system follows a neon futuristic/cyberpunk aesthetic with purple (#A855F7), baby blue (#7DD3FC), and orange (#FB923C) color palette
- Typography uses Orbitron for display text and Inter for body text
- Custom CSS variables for theming and glow effects

**Web3 Integration**
- Wagmi provides React hooks for Ethereum wallet interactions
- Viem serves as the TypeScript Ethereum library
- WalletConnect connector enables multi-wallet support with QR code modal
- Supports Ethereum mainnet and Sepolia testnet
- Project requires `VITE_WALLETCONNECT_PROJECT_ID` environment variable

### Backend Architecture

**Server Framework**
- Express.js handles HTTP requests and middleware
- Custom logging middleware tracks API requests with duration and response data
- JSON body parsing with raw body preservation for webhook compatibility

**API Design**
- RESTful endpoints for contestant management:
  - `POST /api/contestants` - Create new contestant entry
  - `GET /api/contestants` - Retrieve all contestants
  - `DELETE /api/contestants` - Remove all contestants
  - `POST /api/contestants/wipe-votes` - Reset vote counts
- Input validation using Zod schemas from shared schema definitions
- Error responses include descriptive messages

**Data Storage**
- Dual storage implementation: in-memory storage for development and database storage for production
- IStorage interface defines CRUD operations for users and contestants
- MemStorage provides HashMap-based storage with UUID generation

### Database Architecture

**ORM & Migrations**
- Drizzle ORM provides type-safe database operations
- Schema definitions in TypeScript generate both types and runtime validators
- Drizzle Kit manages schema migrations
- PostgreSQL dialect configuration

**Schema Design**
- `users` table: id (UUID), username (unique), password
- `contestants` table: id (UUID), personName, costumeName, walletAddress, votes (default 0), createdAt (timestamp)
- Zod schemas for insert validation exclude auto-generated fields

**Database Provider**
- Neon Serverless PostgreSQL with WebSocket support
- Connection pooling via @neondatabase/serverless
- Requires `DATABASE_URL` environment variable

### External Dependencies

**Web3 Services**
- WalletConnect Cloud (requires project ID from WalletConnect dashboard)
- Ethereum RPC providers for mainnet and Sepolia testnet

**Database**
- Neon Serverless PostgreSQL database
- Must provision database and set DATABASE_URL before running

**Development Tools**
- Replit-specific plugins for development (cartographer, dev-banner, runtime-error-modal)
- Only loaded in development mode when REPL_ID is present

**Build & Runtime**
- Node.js runtime (ESM modules)
- tsx for TypeScript execution in development
- esbuild for production server bundling

### Session Management

**Session Storage**
- Express Session with connect-pg-simple for PostgreSQL-backed sessions
- Session data persists across server restarts
- Cookie-based session identification

### Development Workflow

**Build Process**
- Development: `npm run dev` runs tsx server with Vite middleware
- Production: `npm run build` bundles client with Vite and server with esbuild
- Type checking: `npm run check` validates TypeScript without emitting files
- Database: `npm run db:push` applies schema changes to database

**Vite Configuration**
- Custom aliases: `@` for client/src, `@shared` for shared, `@assets` for attached_assets
- Client root in `client` directory, build output to `dist/public`
- Strict file system access denying dotfiles