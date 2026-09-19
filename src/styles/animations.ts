// ─── Durations ────────────────────────────────────────────────────────────────
export const durations = {
  fast: 0.22,
  base: 0.42,
  slow: 0.65,
  slower: 0.9,
  cinematic: 1.1,
} as const;

// ─── Easings ──────────────────────────────────────────────────────────────────
export const ease = {
  smooth: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
  expo: [0.16, 1, 0.3, 1] as [number, number, number, number],
  inOut: [0.76, 0, 0.24, 1] as [number, number, number, number],
  spring: { type: 'spring' as const, stiffness: 90, damping: 22 },
  springSnap: { type: 'spring' as const, stiffness: 180, damping: 24 },
} as const;

// ─── Viewport ─────────────────────────────────────────────────────────────────
export const vp = { once: true, margin: '-80px' } as const;

// ─── Shared variants ──────────────────────────────────────────────────────────
export const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: durations.slow, ease: ease.expo } },
};

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: durations.slow, ease: ease.smooth } },
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: durations.slow, ease: ease.expo } },
};

export const slideLeft = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0, transition: { duration: durations.slow, ease: ease.expo } },
};

export const slideRight = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0, transition: { duration: durations.slow, ease: ease.expo } },
};

// Clip-path reveal — left to right
export const clipRevealX = {
  hidden: { clipPath: 'inset(0 100% 0 0)' },
  visible: {
    clipPath: 'inset(0 0% 0 0)',
    transition: { duration: durations.slower, ease: ease.expo },
  },
};

// Stagger helpers
export const stagger = (children = 0.1, delay = 0) => ({
  hidden: {},
  visible: { transition: { staggerChildren: children, delayChildren: delay } },
});

export const staggerItem = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: durations.base, ease: ease.expo } },
};

// Word-by-word reveal (use inside overflow:hidden wrapper)
export const wordUp = {
  hidden: { y: '105%', opacity: 0 },
  visible: { y: '0%', opacity: 1, transition: { duration: durations.slow, ease: ease.expo } },
};
