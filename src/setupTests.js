import '@testing-library/jest-dom';

jest.mock('react-secure-storage', () => ({
  __esModule: true,
  default: {
    getItem: jest.fn((key) => {
      if (key === 'api-key') return 'mock-api-key';
      return null;
    }),
    setItem: jest.fn(),
    removeItem: jest.fn(),
    clear: jest.fn(),
  },
}));