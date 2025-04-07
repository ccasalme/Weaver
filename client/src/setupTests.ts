import '@testing-library/jest-dom'; // 👈 this adds `.toBeInTheDocument()` and other matchers
import { vi } from 'vitest';

// Already existing global stub for alerts
vi.stubGlobal('alert', () => {});
