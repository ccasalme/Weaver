import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom', // Perfect for testing browser environments
    setupFiles: ['./src/setupTests.ts'], // Optional: Setup file for initializing things like extending expect or global mocks
  }
});
