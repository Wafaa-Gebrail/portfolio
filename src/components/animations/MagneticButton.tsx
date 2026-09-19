import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useIsMobile } from '../../hooks/useMediaQuery';
import styles from './MagneticButton.module.css';

interface MagneticButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: 'primary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  external?: boolean;
  className?: string;
  type?: 'button' | 'submit';
  disabled?: boolean;
  icon?: React.ReactNode;
}

export function MagneticButton({
  children,
  href,
  onClick,
  variant = 'primary',
  size = 'md',
  external,
  className = '',
  type = 'button',
  disabled,
  icon,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const isMobile = useIsMobile();

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isMobile || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    setPos({
      x: (e.clientX - cx) * 0.28,
      y: (e.clientY - cy) * 0.28,
    });
  };

  const handleMouseLeave = () => setPos({ x: 0, y: 0 });

  const classes = `${styles.btn} ${styles[variant]} ${styles[size]} ${className}`;

  const inner = (
    <>
      <span className={styles.label}>{children}</span>
      {icon && <span className={styles.icon}>{icon}</span>}
    </>
  );

  const motionProps = {
    animate: { x: pos.x, y: pos.y },
    transition: { type: 'spring' as const, stiffness: 200, damping: 20, mass: 0.5 },
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
    whileTap: { scale: 0.96 },
  };

  return (
    <div ref={ref} style={{ display: 'inline-block' }}>
      {href ? (
        <motion.a
          href={href}
          className={classes}
          target={external ? '_blank' : undefined}
          rel={external ? 'noopener noreferrer' : undefined}
          {...motionProps}
        >
          {inner}
        </motion.a>
      ) : (
        <motion.button
          type={type}
          className={classes}
          onClick={onClick}
          disabled={disabled}
          {...motionProps}
        >
          {inner}
        </motion.button>
      )}
    </div>
  );
}
