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

Useful scripts

- `npm run dev` — start dev server
- `npm run build` — run TypeScript build and Vite production build
- `npm run preview` — preview the production build locally
- `npm run lint` — run ESLint checks
- `npm run test` — run tests with Vitest UI
- `npm run test:coverage` — run tests with coverage report
- `npm run e2e` — run Playwright E2E tests
