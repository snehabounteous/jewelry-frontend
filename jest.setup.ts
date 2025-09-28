import '@testing-library/jest-dom';
import NextImageMock from './__mocks__/next/image';

// Mock next/image for Jest
jest.mock('next/image', () => NextImageMock);
