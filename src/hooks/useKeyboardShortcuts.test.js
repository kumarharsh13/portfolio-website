import { renderHook } from '@testing-library/react';
import useKeyboardShortcuts from './useKeyboardShortcuts';

function press(key, target) {
  const e = new KeyboardEvent('keydown', { key, bubbles: true });
  if (target) Object.defineProperty(e, 'target', { value: target });
  window.dispatchEvent(e);
}

test('fires handler for a mapped key', () => {
  const fn = jest.fn();
  renderHook(() => useKeyboardShortcuts({ g: fn }, { enabled: true }));
  press('g');
  expect(fn).toHaveBeenCalledTimes(1);
});

test('ignores keys when typing in an input', () => {
  const fn = jest.fn();
  renderHook(() => useKeyboardShortcuts({ g: fn }, { enabled: true }));
  press('g', document.createElement('input'));
  expect(fn).not.toHaveBeenCalled();
});

test('ignores keys when disabled', () => {
  const fn = jest.fn();
  renderHook(() => useKeyboardShortcuts({ g: fn }, { enabled: false }));
  press('g');
  expect(fn).not.toHaveBeenCalled();
});
