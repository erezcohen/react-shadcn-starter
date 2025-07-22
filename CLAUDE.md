# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `npm run dev` - Start development server on localhost:5173
- `npm run build` - Build for production (TypeScript check + Vite build)
- `npm run typecheck` - Run TypeScript type checking
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build locally
- `npm run build:gh` - Build for GitHub Pages deployment (sets base URL and hash routing)

## Testing Commands

- `npm test` - Run tests in watch mode with Vitest
- `npm run test:run` - Run tests once
- `npm run test:ui` - Run tests with interactive UI interface
- `npm run test:coverage` - Run tests with coverage report

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
- Vitest for testing framework
- React Testing Library for component testing

### Environment Variables

- `VITE_APP_NAME` - Application name (fallback: "Sample App")
- `VITE_BASE_URL` - Base URL for routing (fallback: "/")
- `VITE_USE_HASH_ROUTE` - Use hash routing when "true"

### Testing Architecture

**Test Framework**: Uses Vitest for fast, Vite-powered testing with jsdom environment for React component testing.

**Test Organization**:

- Test files located in `__tests__/` directories next to source files
- `src/test/setup.ts` - Global test configuration with jest-dom matchers
- `src/test/test-utils.tsx` - Custom render function with providers (Router, Theme)

**Testing Patterns**:

- Component tests focus on user interactions and rendering
- Uses React Testing Library for DOM queries and user event simulation
- Mock browser APIs (localStorage, matchMedia) for theme system testing

### Adding New Pages

1. Create component in `src/pages/`
2. Add route in `Router.tsx`
3. Add menu item in `src/config/menu.ts` if needed for navigation
4. Create test file in `src/pages/__tests__/` for component testing

### Adding Component Tests

1. Create `__tests__/` directory next to component
2. Import test utilities: `import { render, screen } from '@/test/test-utils'`
3. Use descriptive test names focused on user behavior
4. Test accessibility, user interactions, and visual states

## The workflow should be:

1. Make code changes
2. Run npm run lint to check code style
3. Run npm run typecheck to verify TypeScript correctness
4. Run npm run test:run to ensure tests pass

- Iterate on these steps as necessary until all checks pass
