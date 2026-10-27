# 🌟 PeoplePulse (`pulse-hr`)

> **Know your people. Grow your culture.**  
> A calm, clear, and actionable People Analytics & HR Intelligence platform built for modern People Operations.

[![Next.js](https://img.shields.io/badge/Next.js-16.4.3-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-blue?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.3-38bdf8?logo=tailwind-css)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)

---

## ✨ Features

- 📊 **Executive Overview Dashboard**: Real-time synthesized KPI cards, engagement trends, headcount distribution by department, and tenure-based attrition rates.
- 🎯 **Engagement Analytics (`/engagement`)**: Deep dive into question favorability, score distributions, and sentiment breakdowns across teams and tenures.
- 📉 **Attrition & Retention Risk (`/attrition`)**: Exploratory cohort attrition tracking to identify early tenure drop-offs and support proactive retention.
- 📑 **Department Report & Exports (`/department-report`)**: Compare metrics across teams with one-click **CSV download** and **Executive Print / PDF** export.
- 💡 **Actionable Recommendations (`/recommendations`)**: AI/signal-grounded suggestions with expandable supporting metrics, benchmarks, and tactical steps.
- 📖 **Data Dictionary (`/data-dictionary`)**: Complete reference catalog of all metrics, calculations, data sources, and refresh cadences with instant live search.
- ⚙️ **Workspace Settings (`/settings`)**: Configurable appearance (Light / Dark mode, Compact mode), privacy rules (minimum reporting group sizes), and alert preferences.
- 🔍 **Global Command Bar (`⌘K` / `Ctrl+K`)**: Rapid keyboard-driven search for pages, metrics, and department filters.
- 🔔 **In-App Notification Center**: Floating drawer tracking key threshold alerts, survey participation milestones, and digests.
- 🌓 **Comprehensive Dark Mode**: Tailored HSL color palette and CSS variables for maximum contrast and readability in both light and dark environments.
- 🛡️ **Privacy by Design**: Guaranteed k-anonymity (suppresses groups below minimum size) to ensure individual employee anonymity.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router, Turbopack)
- **Frontend Library**: [React 19](https://react.dev/)
- **Language**: [TypeScript 5](https://www.typescriptlang.org/)
- **Charts & Visualizations**: [Recharts](https://recharts.org/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Styling**: Vanilla CSS tokens & variables with Tailwind CSS 4
- **Feedback**: Custom React Contexts for Toast alerts, Filters, and Notifications

---

## 🚀 Quick Start

### 1. Clone the repository
```bash
git clone https://github.com/Pankaj52141/pulse-hr.git
cd pulse-hr
```

### 2. Install dependencies
```bash
npm install
```

### 3. Run the development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to explore the dashboard.

### 4. Build for production
```bash
npm run build
npm start
```

---

## 📁 Project Structure

```text
├── app/
│   ├── attrition/             # Attrition analysis & retention trends
│   ├── data-dictionary/       # Searchable metric glossary & formulas
│   ├── department-report/     # Department table & CSV/PDF export
│   ├── engagement/            # Employee sentiment & survey intelligence
│   ├── recommendations/       # Decision-support recommendations
│   ├── settings/              # Appearance, notifications, privacy config
│   ├── error.tsx              # Error boundary with retry actions
│   ├── globals.css            # Design system, CSS variables & dark mode
│   ├── layout.tsx             # Root layout with Providers & AppShell
│   ├── loading.tsx            # Shimmer skeleton loader
│   ├── not-found.tsx          # Custom 404 page
│   └── page.tsx               # Overview dashboard
├── components/
│   ├── dashboard/             # StatCard, ChartCard, FilterBar, Methodology
│   ├── layout/                # AppShell, Sidebar, Topbar
│   └── ui/                    # SearchModal, NotificationPanel, Toast, ProfileDropdown
├── lib/
│   ├── contexts.tsx           # Filter, Theme, Toast, Notification & Search Contexts
│   ├── data.ts                # Synthetic dataset, survey items & dictionary
│   ├── hooks.ts               # Computed analytics hooks
│   └── types.ts               # Strict TypeScript definitions
└── next.config.mjs            # Production security headers & optimizations
```

---

## 🛡️ License

This project is licensed under the [MIT License](LICENSE).
