import { renderHook } from '@testing-library/react';
import usePrefersReducedMotion from './usePrefersReducedMotion';

function mockMatchMedia(matches) {
  window.matchMedia = jest.fn().mockImplementation((query) => ({
    matches,
    media: query,
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    addListener: jest.fn(),
    removeListener: jest.fn(),
  }));
}

test('returns true when reduced motion is preferred', () => {
  mockMatchMedia(true);
  const { result } = renderHook(() => usePrefersReducedMotion());
  expect(result.current).toBe(true);
});

test('returns false when reduced motion is not preferred', () => {
  mockMatchMedia(false);
  const { result } = renderHook(() => usePrefersReducedMotion());
  expect(result.current).toBe(false);
});
