import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, animate, useReducedMotion } from 'framer-motion';
import profileImg from '../../assets/profile.png';
import { personal } from '../../data/personal';
import styles from './IntroExperience.module.css';

// Total intro duration before auto-exit (ms)
const INTRO_DURATION = 2200;

interface Props { onComplete: () => void; }

export function IntroExperience({ onComplete }: Props) {
  const [phase, setPhase] = useState<'intro' | 'exit'>('intro');
  const reducedMotion = useReducedMotion();
  const scanY = useMotionValue(0); // 0 → 100 (percentage)
  const timerRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    if (reducedMotion) { onComplete(); return; }

    // Animate scan line from top to bottom over 1.0s, starting after 0.2s
    const controls = animate(scanY, 110, {
      duration: 1.0,
      delay: 0.2,
      ease: [0.4, 0, 0.2, 1],
    });

    timerRef.current = setTimeout(() => setPhase('exit'), INTRO_DURATION);

    return () => {
      controls.stop();
      clearTimeout(timerRef.current);
    };
  }, [reducedMotion, onComplete, scanY]);

  useEffect(() => {
    if (phase === 'exit') {
      timerRef.current = setTimeout(onComplete, 150);
      return () => clearTimeout(timerRef.current);
    }
  }, [phase, onComplete]);

  // The scan line position as a CSS percentage string
  const scanLineTop = useTransform(scanY, (v) => `${v}%`);

  // Above the scan line: sharp + color; below: blurred + desaturated
  // We achieve this with two stacked images + a clip-path driven by scanY
  const revealedClip = useTransform(scanY, (v) => `inset(0 0 ${100 - v}% 0)`);
  const hiddenClip   = useTransform(scanY, (v) => `inset(${v}% 0 0 0)`);

  return (
    <AnimatePresence>
      {phase === 'intro' && (
        <motion.div
          className={styles.intro}
          key="intro"
          exit={{ clipPath: 'inset(100% 0 0 0)', transition: { duration: 0.25, ease: [0.76, 0, 0.24, 1] } }}
        >
          {/* Dark background */}
          <div className={styles.bg} />

          {/* Photo: blurred / desaturated layer (below scan) */}
          <motion.div className={styles.photoWrap} style={{ clipPath: hiddenClip }}>
            <img src={profileImg} alt="" className={`${styles.photo} ${styles.photoBlur}`} aria-hidden="true" />
          </motion.div>

          {/* Photo: sharp / color layer (above scan) */}
          <motion.div className={styles.photoWrap} style={{ clipPath: revealedClip }}>
            <img src={profileImg} alt="" className={styles.photo} aria-hidden="true" />
          </motion.div>

          {/* Scan line */}
          <motion.div className={styles.scanLine} style={{ top: scanLineTop }} />

          {/* Dark gradient overlay */}
          <div className={styles.overlay} />

          {/* Text content */}
          <div className={styles.content}>
            <motion.span
              className={styles.label}
              initial={{ opacity: 0, letterSpacing: '0.4em' }}
              animate={{ opacity: 1, letterSpacing: '0.18em' }}
              transition={{ duration: 0.7, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              {personal.title}
            </motion.span>

            <h1 className={styles.name} aria-label={personal.name}>
              {personal.name.split(' ').map((word, i) => (
                <span key={i} className={styles.wordMask}>
                  <motion.span
                    className={styles.word}
                    initial={{ y: '110%' }}
                    animate={{ y: '0%' }}
                    transition={{ duration: 0.7, delay: 0.9 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                  >
                    {word}
                  </motion.span>
                </span>
              ))}
            </h1>

            {/* Teal accent line */}
            <motion.div
              className={styles.accentLine}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.6, delay: 1.4, ease: [0.16, 1, 0.3, 1] }}
              style={{ transformOrigin: 'left' }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
