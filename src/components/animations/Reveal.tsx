import { motion } from 'framer-motion';
import { fadeUp, scaleIn, slideLeft, slideRight, clipRevealX } from '../../styles/animations';

type RevealVariant = 'fadeUp' | 'scale' | 'left' | 'right' | 'clip';

interface RevealProps {
  children: React.ReactNode;
  variant?: RevealVariant;
  delay?: number;
  className?: string;
  as?: React.ElementType;
}

const variantMap = {
  fadeUp,
  scale: scaleIn,
  left: slideLeft,
  right: slideRight,
  clip: clipRevealX,
};

export function Reveal({ children, variant = 'fadeUp', delay = 0, className, as: Tag = 'div' }: RevealProps) {
  const chosen = variantMap[variant];

  const patchedVariant = delay
    ? {
        hidden: chosen.hidden,
        visible: {
          ...chosen.visible,
          transition: {
            ...(chosen.visible as { transition?: object }).transition,
            delay,
          },
        },
      }
    : chosen;

  return (
    <motion.div
      className={className}
      variants={patchedVariant}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      // @ts-expect-error polymorphic
      as={Tag}
    >
      {children}
    </motion.div>
  );
}
