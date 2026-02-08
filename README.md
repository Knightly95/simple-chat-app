# Simple Chat App — Quickstart

This repository is a small React + TypeScript app bootstrapped with Vite.

## Prerequisites

You must have Node.js installed to use this project. This project was created with Node.js v24.12.0. Some older Node.js versions may cause errors or incompatibilities.

Quick steps to get running locally:

## Dependencies

To run this app first make sure you install the projects dependencies running the following command upon cloning the repository.

```bash
npm install
```

## Run backend server server

Please note that this project has a backend dependency on [This repo](https://github.com/DoodleScheduling/frontend-challenge-chat-api), api that has to be up and running for the front end to work.

Follow the instructions of the repo and visit <http://localhost:3000/health> in your browser to make sure its working

## Open the app

To run both frontend app please run:

```bash
npm run dev
```

And visit <http://localhost:5173>

## Multi-User Simulation

The app simulates multiple users by generating a unique user identity for each browser/window using localStorage.

**To test multi-user functionality:**

1. Open the app in your normal browser window → you'll be assigned a random user (e.g., "Alice123")
2. Open the app in a private/incognito window → you'll be assigned a different user (e.g., "Bob456")
3. Send a message from either window
4. **Reload the other window** to see the new message appear from the other user

**Note about real-time updates:** This implementation requires manual page reloads to fetch new messages because the assignment does not include WebSocket support. In a production environment with WebSocket integration, the app could subscribe to message events and display real-time updates automatically without requiring page refreshes.

## Useful Scripts

- `npm run dev` — start dev server
- `npm run build` — run TypeScript build and Vite production build
- `npm run preview` — preview the production build locally
- `npm run lint` — run ESLint checks
- `npm run test` — run tests with Vitest UI
- `npm run test:coverage` — run tests with coverage report
- `npm run e2e` — run Playwright E2E tests
