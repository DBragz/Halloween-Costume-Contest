# Halloween Costume Contest - Design Guidelines

## Design Approach

**Selected Aesthetic:** Neon Futuristic with Cyberpunk influence, inspired by the user's specific color palette (purple, baby blue, orange, black) and neon lights requirement. Drawing inspiration from Spotify's dark mode sophistication, Stripe's clarity, and cyberpunk gaming interfaces for the neon glow effects.

## Color System

**Primary Palette:**
- Neon Purple: #A855F7 (primary actions, highlights)
- Baby Blue: #7DD3FC (secondary actions, accents)
- Neon Orange: #FB923C (rankings, warnings, CTAs)
- Deep Black: #0A0A0A (background base)

**Supporting Colors:**
- Dark Gray: #1A1A1A (card backgrounds)
- Medium Gray: #2D2D2D (borders, dividers)
- Glow Effects: Use the primary colors at 40-60% opacity for neon glow halos

**Visual Treatment:**
- All interactive elements should have subtle neon glow effects using box-shadow
- Card borders glow on hover with primary color
- Active states intensify glow brightness
- Text on dark backgrounds uses white (#FFFFFF) with slight glow for readability

## Typography

**Font Families:**
- Primary: 'Orbitron' (Google Fonts) - futuristic display font for headers, navigation
- Secondary: 'Inter' (Google Fonts) - clean sans-serif for body text, forms

**Type Scale:**
- H1: Orbitron Bold, 48px/56px (hero titles, page headers)
- H2: Orbitron SemiBold, 36px/44px (section headers)
- H3: Orbitron Medium, 24px/32px (card titles, subsections)
- Body Large: Inter Regular, 18px/28px (important descriptions)
- Body: Inter Regular, 16px/24px (standard text)
- Small: Inter Regular, 14px/20px (meta info, timestamps)
- Button: Orbitron Medium, 16px (all button text)

## Layout System

**Spacing Units:** Use Tailwind spacing of 2, 4, 6, 8, 12, 16, 20, 24 for consistent rhythm
- Component padding: p-6 or p-8
- Section spacing: mb-12 to mb-20
- Card gaps: gap-6 or gap-8
- Button padding: px-8 py-4

**Grid System:**
- Contest cards: 3 columns on desktop (grid-cols-3), 2 on tablet (md:grid-cols-2), 1 on mobile
- Rankings display: Single column with prominent cards
- Admin controls: 2-column layout for action buttons

## Screen-by-Breakdown

### 1. Login/Welcome Screen
- Full-screen centered layout with gradient background (black to deep purple)
- Large Orbitron heading: "Halloween Costume Contest 2024" with neon purple glow
- Prominent "Connect Wallet" button (baby blue with intense glow effect)
- Small text below explaining Web3 wallet requirement
- Decorative neon line accents framing the content
- No hero image needed - pure neon futuristic aesthetic with geometric shapes

### 2. User Choice Screen (Post-Login)
- Split-screen design with two large interactive cards
- Left card: "Enter Contest" (neon orange glow)
- Right card: "Vote for Contestants" (baby blue glow)
- Each card shows icon, title, brief description
- Wallet address displayed in top-right corner with neon border
- Cards expand slightly with intensified glow on hover

### 3. Contest Registration Form
- Centered card (max-width 600px) on dark background
- Form fields with neon borders that glow on focus
- Input placeholders in gray, text in white
- Fields: Name, Costume Description (textarea), optional image upload
- Large "Submit Entry" button (neon orange)
- "Back" link in top-left with subtle glow

### 4. Voting Screen
- Masonry grid layout of contestant cards (3 columns desktop, 2 tablet, 1 mobile)
- Each card features:
  - Contestant name (H3 with neon glow)
  - Costume description
  - Current vote count with animated number
  - "Vote" button (baby blue, disabled if already voted)
  - Neon border that pulses gently
- Already-voted cards show "Voted" badge (neon purple) and dimmed state
- Real-time updates animate vote count changes

### 5. Live Rankings Dashboard
- Hero section with large "LIVE RANKINGS" title (neon purple glow)
- Podium-style layout for top 3:
  - 1st Place: Large card, center, neon orange border, prominent trophy icon
  - 2nd Place: Medium card, left, baby blue border
  - 3rd Place: Medium card, right, neon purple border
- Each ranking card displays:
  - Large position number with glow effect
  - Contestant name (H2)
  - Costume description
  - Live vote count (large, animated)
  - Decorative neon accents
- Auto-refreshing indicator (pulsing dot) in top-right
- Below top 3: scrollable list of remaining contestants in simple cards

### 6. Admin Panel (dbragz.eth only)
- Dark dashboard layout with neon purple accent bar at top
- Authentication status prominently displayed
- Two main action sections:
  - "Wipe All Votes" - orange button with warning icon, requires confirmation modal
  - "Delete All Contestants" - red-orange button with trash icon, requires confirmation modal
- Confirmation modals use dark overlay with neon-bordered cards
- Admin statistics panel showing total votes, total contestants
- Action history log (recent admin actions with timestamps)

## Component Library

**Buttons:**
- Primary: Neon orange background, white text, intense glow effect
- Secondary: Baby blue background, black text, moderate glow
- Tertiary: Transparent with neon purple border, purple text, glow on hover
- All buttons use px-8 py-4 padding, Orbitron Medium font
- Hover states intensify glow and slightly increase brightness

**Cards:**
- Dark gray background (#1A1A1A)
- Neon colored borders (2px solid, color varies by context)
- Subtle glow effect using box-shadow
- Rounded corners (border-radius: 12px)
- Padding: p-6 or p-8
- Hover: Intensify border glow, slight scale transform

**Form Inputs:**
- Dark background (#2D2D2D)
- Neon purple border (1px)
- White text, gray placeholder
- Focus state: border glows with baby blue
- Height: 48px for inputs, 120px for textareas
- Padding: px-4

**Badges:**
- Small rounded pills (px-4 py-1)
- Neon colored background at 20% opacity
- Matching border color
- Text: Small size, Orbitron Medium

**Modal Overlays:**
- Dark semi-transparent backdrop (black at 80% opacity)
- Centered card with neon border matching action severity
- Max-width: 500px
- Padding: p-8
- Close button in top-right with neon glow

## Animations

Use sparingly for maximum impact:
- Vote count numbers: Animate on increment with scale + glow pulse (0.5s)
- Card hover: Smooth glow intensification (0.3s ease)
- Loading states: Pulsing neon line across top of screen
- Real-time updates: Brief flash of neon color on updated elements (0.6s)
- Page transitions: Fade in content (0.4s)

## Accessibility

- Maintain 4.5:1 contrast ratio for white text on dark backgrounds
- Glow effects are decorative only, never relied upon for information
- All interactive elements have clear focus states with visible neon borders
- Form labels always visible, never placeholder-only
- Confirmation modals for destructive actions
- Keyboard navigation fully supported with visible focus indicators

## Images

**No Hero Images Required** - The futuristic neon aesthetic relies on geometric shapes, gradients, and glowing effects rather than photography.

**Optional Contestant Photos:** If users upload images during registration, display them in voting cards with neon border frames. Images should be cropped to square aspect ratio, overlaid with subtle purple gradient for cohesion.

This design creates an immersive, futuristic experience that feels like stepping into a cyberpunk Halloween event, with clear hierarchy, intuitive navigation, and the requested neon aesthetic throughout.