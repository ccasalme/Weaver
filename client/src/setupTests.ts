// src/setupTests.ts
import { vi } from 'vitest';

// Mocking the alert function to do nothing
// This prevents alert dialogs from interrupting the test flow
vi.stubGlobal('alert', () => {});
