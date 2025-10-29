# Halloween Costume Contest

## Overview

A Web3-powered Halloween costume contest platform that enables users to submit costume entries and vote for their favorites using blockchain wallet authentication. The application features real-time rankings, admin controls, and a neon futuristic cyberpunk aesthetic with purple, baby blue, and orange color scheme.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Build System**
- React 18+ with TypeScript using Vite as the build tool
- Client-side routing implemented with Wouter
- Component library based on Radix UI primitives with shadcn/ui styling
- Tailwind CSS for styling with custom design tokens

**State Management**
- TanStack Query (React Query) for server state management and data fetching
- React Context API for global state (Web3 wallet connection)
- Local component state using React hooks

**Design System**
- Custom neon cyberpunk theme with specific color palette:
  - Neon Purple (#A855F7) for primary actions
  - Baby Blue (#7DD3FC) for secondary elements
  - Neon Orange (#FB923C) for rankings and CTAs
  - Deep Black (#0A0A0A) for backgrounds
- Typography using Orbitron (display) and Inter (body) fonts from Google Fonts
- Responsive grid layouts with mobile-first approach
- Glow effects and visual treatments applied via custom CSS classes

**Component Architecture**
- Atomic design pattern with reusable UI components in `client/src/components/ui/`
- Feature components for major screens (WelcomeScreen, VotingScreen, LiveRankingsDashboard, AdminPanel)
- Example components for development and testing in `client/src/components/examples/`

### Backend Architecture

**Server Framework**
- Express.js server with TypeScript
- Custom Vite middleware integration for development
- RESTful API structure with `/api` prefix for all endpoints

**Database Layer**
- Drizzle ORM for type-safe database operations
- PostgreSQL via Neon serverless driver
- Database connection pooling with `@neondatabase/serverless`
- Schema definitions in `shared/schema.ts` using Drizzle schema builder

**Storage Abstraction**
- Interface-based storage system (`IStorage`) for data operations
- In-memory implementation (`MemStorage`) provided as starting point
- Designed for easy swap to database-backed implementation
- Currently supports basic user CRUD operations

**Session Management**
- Prepared for session-based authentication using `connect-pg-simple`
- Express session middleware configured for production use

**API Design**
- Centralized route registration in `server/routes.ts`
- Request/response logging middleware for API endpoints
- JSON body parsing with raw body preservation for webhook verification
- CORS and security headers configured

### Authentication & Authorization

**Web3 Wallet Integration**
- Wagmi library for Ethereum wallet connections
- Support for MetaMask (injected provider) and WalletConnect v2
- Web3Modal integration for multi-wallet support
- React Context (`Web3Context`) managing wallet connection state
- Wallet address used as primary user identifier

**Admin Access Control**
- Hardcoded admin Ethereum address (intended for ENS resolution)
- Admin-only routes protected with address verification
- Special permissions for contest management (wiping votes, deleting contestants)

### Data Flow

**Client-Server Communication**
- Custom `apiRequest` wrapper for fetch calls with error handling
- Query client configured with custom fetch function
- Credentials included for session-based requests
- Optimistic updates for improved UX

**Form Handling**
- React Hook Form with Zod schema validation
- `@hookform/resolvers` for validation integration
- Type-safe form submissions using Drizzle-Zod schema generation

## External Dependencies

### Third-Party Services

**WalletConnect**
- Project ID required via environment variable `VITE_WALLETCONNECT_PROJECT_ID`
- Enables mobile wallet connections via QR code scanning
- Web3Modal theming customized to match application design

**Neon Database**
- Serverless PostgreSQL hosting
- Connection via `DATABASE_URL` environment variable
- WebSocket support for real-time features
- Connection pooling for scalability

### Key Libraries

**UI & Styling**
- Radix UI primitives for accessible component foundations
- Tailwind CSS with custom configuration
- shadcn/ui component patterns
- class-variance-authority for component variants
- Lucide React for iconography

**Blockchain & Web3**
- wagmi: React hooks for Ethereum
- @web3modal/wagmi: Wallet connection modal
- viem: TypeScript Ethereum library (wagmi dependency)

**Data & Forms**
- TanStack Query: Server state management
- React Hook Form: Form state and validation
- Zod: Schema validation
- Drizzle ORM: Type-safe database queries
- drizzle-zod: Schema to validation conversion

**Utilities**
- date-fns: Date manipulation
- clsx & tailwind-merge: Class name utilities
- nanoid: Unique ID generation

### Development Tools

**Build & Dev Experience**
- Vite plugins for Replit integration (cartographer, dev banner, runtime error overlay)
- TypeScript with strict mode enabled
- ESBuild for production server bundling
- Drizzle Kit for database migrations

**Configuration Requirements**
- `DATABASE_URL`: PostgreSQL connection string
- `VITE_WALLETCONNECT_PROJECT_ID`: WalletConnect project identifier
- Node.js environment with ESM module support