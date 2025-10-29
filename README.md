# Halloween Costume Contest

A decentralized Halloween costume contest application built with Web3 wallet integration. Users can enter the contest with their costume descriptions, vote for their favorite contestants, and view live rankings. The application features a modern UI with gradient effects and glow animations.

## Features

- **Web3 Wallet Authentication**: Connect using WalletConnect for secure, decentralized authentication
- **Contest Entry**: Submit your Halloween costume with name and description
- **Voting System**: Browse and vote for your favorite costume entries
- **Live Rankings Dashboard**: Real-time leaderboard showing top contestants and vote counts
- **Admin Panel**: Administrative controls for managing contests and votes
  - View contest statistics (total votes, contestants, voters)
  - Wipe all votes while keeping contestants
  - Delete all contestants and associated data
- **Responsive Design**: Mobile-friendly interface with dark theme
- **Modern UI**: Gradient text effects, glow animations, and smooth transitions

## Tech Stack

### Frontend
- **React 18** - UI library
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and dev server
- **Wouter** - Lightweight routing
- **TanStack Query** - Server state management
- **Shadcn UI** - Component library built on Radix UI
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Animation library
- **Lucide React** - Icon library

### Web3 Integration
- **Wagmi** - React hooks for Ethereum
- **Viem** - TypeScript Ethereum library
- **Web3Modal** - Multi-wallet connection UI
- **Ethers.js** - Ethereum wallet implementation

### Backend
- **Express** - Node.js web framework
- **PostgreSQL** - Database (via Neon)
- **Drizzle ORM** - Type-safe database toolkit
- **Express Session** - Session management
- **WebSocket (ws)** - Real-time communication

### Development Tools
- **tsx** - TypeScript execution
- **ESBuild** - Fast JavaScript bundler
- **Drizzle Kit** - Database migration tool

## Prerequisites

Before running this application, ensure you have the following installed:

- **Node.js** (v20.x or higher)
- **npm** (comes with Node.js)
- **PostgreSQL database** (or use the built-in Replit database)

## Environment Variables

The application requires the following environment variables:

```bash
# Database (automatically provided by Replit)
DATABASE_URL=postgresql://...

# WalletConnect Project ID (required for Web3 wallet connection)
VITE_WALLETCONNECT_PROJECT_ID=your_project_id_here
```

To get a WalletConnect Project ID:
1. Visit [WalletConnect Cloud](https://cloud.walletconnect.com/)
2. Create a free account
3. Create a new project
4. Copy your Project ID

## Installation

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd halloween-costume-contest
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up the database** (if using a local PostgreSQL database):
   ```bash
   npm run db:push
   ```

## Running the Development Instance

### Development Mode

To start the development server with hot-reload:

```bash
npm run dev
```

This will start:
- Express backend server on port 5000
- Vite dev server with HMR (Hot Module Replacement)
- The app will be available at `http://localhost:5000`

### Production Build

To build the application for production:

```bash
npm run build
```

To run the production build:

```bash
npm start
```

### Type Checking

To check TypeScript types without building:

```bash
npm run check
```

### Database Management

To push schema changes to the database:

```bash
npm run db:push
```

If you encounter data-loss warnings and want to force the push:

```bash
npm run db:push --force
```

## Project Structure

```
halloween-costume-contest/
├── client/               # Frontend React application
│   ├── public/          # Static assets
│   └── src/
│       ├── components/  # React components
│       ├── contexts/    # React context providers
│       ├── hooks/       # Custom React hooks
│       ├── lib/         # Utility libraries
│       ├── pages/       # Page components
│       ├── types/       # TypeScript type definitions
│       ├── App.tsx      # Main app component
│       └── main.tsx     # Application entry point
├── server/              # Backend Express application
│   ├── db.ts           # Database connection
│   ├── index.ts        # Server entry point
│   ├── routes.ts       # API routes
│   ├── storage.ts      # Data storage interface
│   └── vite.ts         # Vite middleware
├── shared/              # Shared code between client and server
│   └── schema.ts       # Database schema and types
└── package.json        # Project dependencies and scripts
```

## Usage

### Connecting Your Wallet

1. Click "Connect Wallet" on the welcome screen
2. Scan the QR code with your mobile wallet or select a wallet extension
3. Approve the connection request

### Entering the Contest

1. Click "Enter Contest" from the main menu
2. Fill in your name and costume description
3. Submit your entry

### Voting for Contestants

1. Click "Vote for Contestants" from the main menu
2. Browse through all costume entries
3. Click "Vote" on your favorite costume
4. You can only vote once per session

### Viewing Rankings

1. Click "Rankings" in the navigation bar
2. View the top 3 contestants with podium positions
3. See all other contestants ranked by vote count

### Admin Features

1. Click "Admin" in the navigation bar
2. View contest statistics
3. Use admin controls to:
   - Wipe all votes (keeps contestants)
   - Delete all contestants (removes all data)

## Color Scheme

The application uses a Halloween-themed color palette:

- **Chart 1 (Purple)**: Admin features and accent elements
- **Chart 2 (Baby Blue)**: Voting features and interactive elements
- **Chart 3 (Orange)**: Contest entry and primary highlights

## Authors

- [Daniel Ribeirinha-Braga](https://github.com/DBragz)
- [Editor](https://github.com/replit) - AI Code Assistant

---

## License

This project is licensed under the MIT License.

## Support

For issues, questions, or contributions, please open an issue in the repository.
