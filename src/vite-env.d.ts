// VITE ENVIRONMENT TYPE DEFINITIONS
// This file provides TypeScript type definitions for Vite-specific features

/// <reference types="vite/client" />
// Triple-slash directive - tells TypeScript to include type definitions from vite/client
// This gives you types for:
// - import.meta.env (environment variables)
// - import.meta.hot (Hot Module Replacement API)
// - Vite-specific import types (e.g., ?url, ?raw imports)

// What this enables:
// - import.meta.env.VITE_API_URL (typed environment variables)
// - import.meta.env.MODE (development, production, etc.)
// - import.meta.env.DEV (boolean - true in development)
// - import.meta.env.PROD (boolean - true in production)

// Example usage in your code:
// const apiUrl = import.meta.env.VITE_API_URL;
// if (import.meta.env.DEV) {
//   console.log("Running in development mode");
// }

// .d.ts file = Declaration file (only types, no code)
// Provides type information to TypeScript compiler
// Does not produce any JavaScript output