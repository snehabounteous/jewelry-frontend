import '@testing-library/jest-dom';

// jest.setup.js or setupTests.ts
jest.mock('next/image', () => require('./__mocks__/next/image.js'));
