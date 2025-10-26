# Overview

This is a Hebrew language e-commerce website for selling books by Rabbi Nachman of Breslov. The site features a modern React frontend with a Node.js/Express backend, designed specifically for the Israeli/Hebrew-speaking market. It includes features like book browsing, shopping cart functionality, and promotional campaigns such as flight giveaways to Uman (a significant pilgrimage site for Breslov Hasidim).

## 🔥 TRANSFORMATION PLANNED - September 2025

A comprehensive design improvement plan has been developed to transform Haesh Sheli into the **world's premier Breslov website**. The transformation includes:

- **Modern Design System**: White/blue color scheme inspired by leading Breslov sites
- **Premium UX**: Amazon-inspired e-commerce patterns with advanced product pages
- **Content Ecosystem**: Daily teachings, Ask the Rabbi, video library, community features
- **Mobile-First Responsive**: Optimized for 60%+ mobile traffic
- **Performance Excellence**: Core Web Vitals optimization for premium user experience

**Documentation**:
- `DESIGN_IMPROVEMENT_PLAN.md` - Complete transformation specifications
- `IMPLEMENTATION_PRIORITIES.md` - Execution roadmap with priority matrix

**Timeline**: 16 weeks in 4 phases, targeting 300%+ conversion rate improvement

# User Preferences

Preferred communication style: Simple, everyday language.

## IMPORTANT CORRECTIONS TO REMEMBER:
- **Yaakov's correct name**: "Yaakov Hen יעקוב חן" (NOT "Yaakov Ren")
- This must be hardcoded and never forgotten

# Recent Changes

## September 11, 2025 - Design Transformation Plan
- **Created comprehensive design improvement plan** targeting world-class Breslov website status
- **Analyzed competitor landscape** including breslev.co.il, breslov.org for best practices
- **Developed 4-phase implementation roadmap** with priority matrix and ROI projections
- **Established modern design system** with white/blue Breslov-inspired palette
- **Planned advanced e-commerce features** including reviews, recommendations, video integration
- **Defined content strategy** with daily teachings, Ask the Rabbi, community features

# System Architecture

## Frontend Architecture
- **Framework**: React 18 with TypeScript using Vite for build tooling
- **UI Library**: Radix UI components with shadcn/ui design system
- **Styling**: Tailwind CSS with custom Hebrew/RTL design tokens and color scheme (warm beige/cream background with red primary colors)
- **State Management**: TanStack Query (React Query) for server state management
- **Routing**: Wouter for lightweight client-side routing
- **Forms**: React Hook Form with Zod validation through @hookform/resolvers
- **Internationalization**: Built specifically for Hebrew (RTL) with proper font support (Assistant, Rubik fonts)

## Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **Database**: PostgreSQL with Drizzle ORM for type-safe database operations
- **Database Provider**: Neon Database (@neondatabase/serverless)
- **Session Management**: Express sessions with PostgreSQL session store (connect-pg-simple)
- **Development**: Hot module replacement via Vite integration

## Data Storage
- **Primary Database**: PostgreSQL hosted on Neon Database
- **ORM**: Drizzle ORM with full TypeScript support and Zod schema validation
- **Schema Location**: Shared schema definitions in `/shared/schema.ts`
- **Migrations**: Drizzle Kit for database schema migrations stored in `/migrations`
- **Development Storage**: In-memory storage implementation for development/testing

## Authentication & Authorization
- **Session-based Authentication**: Express sessions with PostgreSQL persistence
- **User Schema**: Basic user model with username/password authentication
- **Storage Interface**: Abstract storage interface allowing for multiple implementations (currently in-memory for development)

## External Dependencies
- **Database**: Neon Database (PostgreSQL-compatible serverless database)
- **UI Components**: Radix UI primitives for accessible component foundation
- **Fonts**: Google Fonts (Assistant, Rubik) optimized for Hebrew text
- **Development Tools**: 
  - Replit integration for development environment
  - Vite plugins for runtime error handling and cartographer (development mapping)
- **Build Tools**: 
  - esbuild for server-side bundling
  - Vite for client-side bundling and development server
- **Validation**: Zod for runtime type validation and schema definition