# CampusCompare — College Discovery & Comparison Platform

Discover, compare, and choose colleges with absolute confidence. CampusCompare is a high-performance web platform that simplifies college searching and parallel comparison.

---

## 🚀 Core Features

- **Smart Search & Live Filters:** Search instantly for engineering, medical, management, or arts colleges with debounced query matching. Filter results dynamically by Location, Annual Fees, Ratings, Course Type, and Ownership.
- **Dynamic 3-Way Compare:** Select up to 3 colleges and review their criteria side-by-side inside a responsive comparison matrix. Includes metric leaders highlights (Highest Placement, Lowest Fees, Highest Rated) and a summary typewriter analysis.
- **Bookmark / Saved List:** Save matching institutions locally with a simple click. Keeps track of your saved colleges count on the navigation bar (uses persistent browser `localStorage`).
- **Global Page Transitions & Hover System:** Loaded with professional scroll animations, horizontal page slide transitions, right-aligned mobile drawers, and distinct hover identities (featured card lifts, list-card border emphasis, row cell highlights).
- **Responsive Layouts:** Designed to adapt flawlessly across viewports from mobile (320px) to large desktop screens (1440px) at 100% browser zoom with zero layout shift.

---

## 🛠️ Technology Stack

- **Frontend Framework:** Next.js (App Router), React, TypeScript
- **Styling:** CSS, TailwindCSS (v4)
- **Animation Engine:** Framer Motion (with `prefers-reduced-motion` accessibility support)
- **Icons:** Lucide React
- **Database Layer:** Mock Prisma Client Adapter + Local Flat-file JSON Data Engine
- **Target OS Compatibility:** Fully compatible across Windows x64/ARM64, macOS, and Linux out-of-the-box.

---

## 📁 Project Architecture & File Splits

The project's code structure is cleanly decoupled into three main conceptual layers:

```
[ FRONTEND LAYER ]  ──(HTTP / fetch)──>  [ BACKEND LAYER ]  ──(Adapter/Client)──>  [ DATABASE LAYER ]
 (Next.js Pages &                           (API Route                           (colleges.json &
 React Components)                           Handlers)                            Query Engine)
```

### 1. Database Layer (`src/lib/db/`)
Manages raw college records, client caching layers, and logical query-matching operations.
- 📄 `colleges.json`: Flat-file database containing 60+ seeded college records (fees, average package, placements, rating, logo/cover links, description).
- 📄 `queryEngine.ts`: Core processing engine evaluating nested logical groups (`AND`, `OR`, `NOT`) and relational queries (`contains`, `in`, `lte`, `gte`, `equals`).
- 📄 `client.ts`: Mock Prisma client wrapper mapping calls to `colleges.json` and managing lookup cache layers to prevent redundant JSON reads.
- 📄 `src/lib/prisma.ts`: Entry point re-exporting the client for clean backwards compatibility.

### 2. Backend Layer (`src/app/api/`)
Declares handlers for incoming API requests.
- 📄 `api/colleges/route.ts`: List handler processing search query strings, parsing checkboxes arrays, paginating, and responding with filtered college lists.
- 📄 `api/colleges/[slug]/route.ts`: Detail handler query resolver looking up single colleges by slug.

### 3. Frontend Layer (`src/app/` & `src/components/`)
Handles presentation elements, React state contexts, and scroll triggers.
- 📄 `src/app/template.tsx`: Wraps page routing to animate page entries (`y: 8 -> 0`, `opacity 0 -> 1`).
- 📁 `src/components/`: Houses cards, filter sidebars, details grids, and comparison rows.
- 📁 `src/context/`: Manages toast popups (`ToastContext`), comparison lists (`CompareContext`), and bookmarking lists (`SavedContext`).

---

## ⚙️ Getting Started

### 1. Installation
Clone the repository and install dependencies:
```bash
git clone https://github.com/sakthi-velr/Campus_Compare.git
cd Campus_Compare
npm install
```

### 2. Running Locally (Development)
Start the hot-reloading development server:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser to view the platform.

### 3. Production Build
Compile and verify the production bundle:
```bash
npm run build
npm run start
```
Check that all pages are statically pre-rendered successfully.
