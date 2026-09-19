import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useIsMobile } from '../../hooks/useMediaQuery';
import styles from './CustomCursor.module.css';

type State = 'default' | 'hover' | 'project';

export function CustomCursor() {
  const dotRef   = useRef<HTMLDivElement>(null);
  const ringRef  = useRef<HTMLDivElement>(null);
  const stateRef = useRef<State>('default');
  const [state, setStateRaw] = useState<State>('default');
  const isMobile = useIsMobile();

  const setState = (val: State | ((s: State) => State)) => {
    setStateRaw((prev) => {
      const next = typeof val === 'function' ? val(prev) : val;
      stateRef.current = next;
      return next;
    });
  };

  useEffect(() => {
    if (isMobile) return;

    let rx = 0, ry = 0, mx = 0, my = 0, raf: number;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX; my = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${mx - 4}px, ${my - 4}px)`;
      }
    };

    const loop = () => {
      rx += (mx - rx) * 0.1;
      ry += (my - ry) * 0.1;
      if (ringRef.current) {
        const s = stateRef.current === 'project' ? 36 : stateRef.current === 'hover' ? 26 : 20;
        ringRef.current.style.transform = `translate(${rx - s}px, ${ry - s}px)`;
      }
      raf = requestAnimationFrame(loop);
    };

    const attach = () => {
      document.querySelectorAll('[data-cursor="project"]').forEach((el) => {
        el.addEventListener('mouseenter', () => setState('project'));
        el.addEventListener('mouseleave', () => setState('default'));
      });
      document.querySelectorAll('a:not([data-cursor]), button:not([data-cursor])').forEach((el) => {
        el.addEventListener('mouseenter', () => setState((s) => s === 'project' ? s : 'hover'));
        el.addEventListener('mouseleave', () => setState((s) => s === 'project' ? s : 'default'));
      });
    };

    document.addEventListener('mousemove', onMove, { passive: true });
    attach();
    raf = requestAnimationFrame(loop);

    const obs = new MutationObserver(attach);
    obs.observe(document.body, { childList: true, subtree: true });

    return () => {
      document.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf);
      obs.disconnect();
    };
  }, [isMobile]);

  if (isMobile) return null;

  const ringSize = state === 'project' ? 72 : state === 'hover' ? 52 : 40;

  return (
    <>
      <div
        ref={dotRef}
        className={styles.dot}
        style={{ opacity: state !== 'default' ? 0 : 1 }}
        aria-hidden="true"
      />
      <motion.div
        ref={ringRef}
        className={styles.ring}
        animate={{
          width: ringSize,
          height: ringSize,
          borderColor: state === 'project' ? 'var(--c-primary)' : 'rgba(58,143,163,.4)',
          backgroundColor: state === 'project' ? 'rgba(58,143,163,.07)' : 'transparent',
        }}
        transition={{ type: 'spring', stiffness: 220, damping: 28 }}
        aria-hidden="true"
      >
        <AnimatePresence>
          {state === 'project' && (
            <motion.span
              className={styles.viewLabel}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.18 }}
            >
              VIEW
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
}
