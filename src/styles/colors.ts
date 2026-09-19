export const colors = {
  primary: '#3A8FA3',
  primaryDark: '#286C7A',
  primaryLight: '#AAD2DC',
  accent: '#7BC4D1',

  background: '#F7FAFB',
  surface: '#FFFFFF',
  surfaceAlt: '#F0F6F8',

  textDark: '#172126',
  textSecondary: '#5F6B72',
  textMuted: '#8A9BA3',

  border: '#DDE7EA',
  borderLight: '#EEF4F6',

  overlay: 'rgba(23, 33, 38, 0.6)',
  overlayLight: 'rgba(23, 33, 38, 0.04)',

  white: '#FFFFFF',
  black: '#000000',
} as const;

export type ColorKey = keyof typeof colors;
