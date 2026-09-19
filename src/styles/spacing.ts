export const spacing = {
  0: '0',
  1: '0.25rem',
  2: '0.5rem',
  3: '0.75rem',
  4: '1rem',
  5: '1.25rem',
  6: '1.5rem',
  8: '2rem',
  10: '2.5rem',
  12: '3rem',
  16: '4rem',
  20: '5rem',
  24: '6rem',
  32: '8rem',
  40: '10rem',
  48: '12rem',
} as const;

export const borderRadius = {
  none: '0',
  sm: '0.25rem',
  base: '0.5rem',
  md: '0.75rem',
  lg: '1rem',
  xl: '1.5rem',
  '2xl': '2rem',
  full: '9999px',
} as const;

export const shadows = {
  sm: '0 1px 3px rgba(23, 33, 38, 0.06), 0 1px 2px rgba(23, 33, 38, 0.04)',
  base: '0 4px 16px rgba(23, 33, 38, 0.08)',
  md: '0 8px 32px rgba(23, 33, 38, 0.10)',
  lg: '0 16px 48px rgba(23, 33, 38, 0.12)',
  xl: '0 24px 64px rgba(23, 33, 38, 0.14)',
  primary: '0 8px 32px rgba(58, 143, 163, 0.25)',
  primaryLg: '0 16px 48px rgba(58, 143, 163, 0.30)',
} as const;

export const breakpoints = {
  sm: '480px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1440px',
} as const;

export const zIndex = {
  base: 0,
  raised: 10,
  dropdown: 100,
  sticky: 200,
  overlay: 300,
  modal: 400,
  toast: 500,
  cursor: 9999,
} as const;
