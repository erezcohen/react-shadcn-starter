# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `npm run dev` - Start development server on localhost:5173
- `npm run build` - Build for production (TypeScript check + Vite build)
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build locally
- `npm run build:gh` - Build for GitHub Pages deployment (sets base URL and hash routing)

## Architecture Overview

This is a React + TypeScript starter template using shadcn/ui components built on Radix UI primitives.

### Core Architecture

**App Entry Point**: `App.tsx` sets up the theme provider and router wrapper. It conditionally uses `HashRouter` or `BrowserRouter` based on `VITE_USE_HASH_ROUTE` environment variable.

**Routing**: `Router.tsx` defines routes using React Router v7. All routes are wrapped in `AppLayout` component which provides header, footer, and main content area.

**Layout System**: `AppLayout` component provides the main application shell with responsive design and proper content spacing.

**Theme Management**: `ThemeContext.tsx` provides theme switching (light/dark/system) with localStorage persistence. Theme is applied by adding CSS classes to document root.

### Configuration System

**App Configuration**: `src/config/app.ts` - Contains app metadata (name, GitHub info, author) using environment variables with fallbacks.

**Menu Configuration**: `src/config/menu.ts` - Defines navigation menu items with icons (from Lucide React), titles, and URLs. Menu supports nested items and external links.

### Component Architecture

**UI Components**: Located in `src/components/ui/` - shadcn/ui components built on Radix UI primitives with Tailwind CSS styling and class-variance-authority for variant management.

**Layout Components**: `app-header.tsx`, `app-footer.tsx`, `app-sidebar.tsx` provide application shell components.

**Page Components**: Located in `src/pages/` - Feature pages that are routed to. Currently includes Dashboard and Sample pages.

### Styling System

Uses Tailwind CSS v4 with custom configuration. The project includes:
- `tailwind-merge` for merging Tailwind classes
- `tailwindcss-animate` for animations
- `clsx` for conditional class application
- CSS custom properties for theme variables

### Build and Deployment

**Development**: Uses Vite with React plugin and Tailwind CSS plugin for fast development.

**Production**: TypeScript compilation followed by Vite build.

**GitHub Pages**: Special build target (`build:gh`) that:
- Sets `VITE_BASE_URL` to `/react-shadcn-starter/` 
- Enables hash routing (`VITE_USE_HASH_ROUTE=true`)
- Automated deployment via GitHub Actions to `gh-pages` branch

### Key Dependencies

- React 19 with TypeScript
- React Router DOM v7 for routing
- Radix UI primitives for accessible components
- Lucide React for icons
- Tailwind CSS v4 for styling
- Vite for build tooling

### Environment Variables

- `VITE_APP_NAME` - Application name (fallback: "Sample App")
- `VITE_BASE_URL` - Base URL for routing (fallback: "/")
- `VITE_USE_HASH_ROUTE` - Use hash routing when "true"

### Adding New Pages

1. Create component in `src/pages/`
2. Add route in `Router.tsx`
3. Add menu item in `src/config/menu.ts` if needed for navigation