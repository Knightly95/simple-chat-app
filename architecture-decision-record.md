# Technical Decisions

## State Management: Zustand

I chose Zustand over Redux or Context API to handle and store data

**Why Zustand?**

The main requirement is displaying "real-time" chat interface and Zustand keeps things simple—no provider wrappers, minimal boilerplate, and the code stays readable. Since I've worked with it before, I knew I could implement it cleanly.

**Trade-offs considered:**

- **Redux**: More powerful but overkill for this scope, plus more boilerplate
- **Zustand**: Right balance of simplicity and performance for real-time data

The goal was to show I can pick the right tool for the job—something lightweight that handles

## Component Library - Material-UI

I chose Material-UI (MUI) as the component library for the UI.

**Why Material-UI?**

Material-UI (MUI) offers a comprehensive set of production-ready React components with built-in accessibility, theming, and responsiveness. This allows for rapid development of a polished, consistent UI that meets modern standards without building every component from scratch.

**Trade-offs considered:**

- **Custom components:** More control over look/feel but much slower to build and harder to maintain.
- **MUI:** Slightly larger bundle size, but the time saved and accessibility features outweigh this for the project scope.

The priority was to deliver a visually appealing, accessible UI efficiently.

## Mock Data Architecture - MSW Structure with Playwright

I structured mock data using MSW conventions but use Playwright's native `page.route()` for E2E test interception.

**Why this approach?**

Mock data is centralized in `src/mocks/data/` and reusable across development and tests. Playwright's `page.route()` provides reliable browser-level interception for E2E tests without the complexity of running MSW's service worker in the test environment.

**Trade-offs considered:**

- **MSW service worker in tests:** Industry standard but adds complexity for E2E setup.
- **Centralized data + Playwright routes:** Best of both worlds—reusable mock data with simpler, more reliable E2E interception.

The goal was to demonstrate separation of concerns and reusability without over-engineering the test layer.

## Code Quality - Prettier + ESLint

I chose Prettier and ESLint for code quality and consistency.

**Why Prettier + ESLint?**

Consistent code style and early error detection are essential for maintainability, especially in collaborative or assessment settings. Prettier enforces a uniform code format, while ESLint catches potential bugs and enforces best practices.

Both tools are already widely adopted and easy to integrate into modern React projects. They help keep the codebase clean, readable, and error-free, which is important for both development speed and code review.

The goal was to ensure high code quality with minimal overhead.

## Unit Testing - Vitest

I used Vitest for unit and component testing.

**Why Vitest?**

Vitest is fast, works out of the box with Vite, and has a Jest-like API. This made it easy to write and run tests without extra setup. It also integrates well with React Testing Library for component tests.

**Trade-offs considered:**

- **Jest:** More mature, but slower and less integrated with Vite.
- **Vitest:** Faster and simpler for Vite projects, also already had some experience with it.

The goal was to keep testing fast and frictionless.

## End-to-End Testing - Playwright

I used Playwright for end-to-end (E2E) testing.

**Why Playwright?**

Playwright makes it easy to write reliable browser tests that cover real user flows. It supports multiple browsers and has a good UI for debugging. This helps catch issues that only appear in the full app, not just in unit tests.

**Trade-offs considered:**

- **Cypress:** Also good, but Playwright is faster and supports more browsers.
- **Playwright:** Great for cross-browser testing and debugging, also already had some experience with it.
