import { motion } from 'framer-motion';
import { ease, durations } from '../../styles/animations';

interface AnimatedTextProps {
  text: string;
  el?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
  className?: string;
  delay?: number;
  stagger?: number;
  mode?: 'words' | 'lines';
}

export function AnimatedText({
  text,
  el: El = 'span',
  className = '',
  delay = 0,
  stagger = 0.06,
  mode = 'words',
}: AnimatedTextProps) {
  const units = mode === 'words' ? text.split(' ') : text.split('\n');

  return (
    <El className={className} aria-label={text}>
      {units.map((unit, i) => (
        <span
          key={i}
          style={{ overflow: 'hidden', display: 'inline-block', verticalAlign: 'bottom' }}
          aria-hidden="true"
        >
          <motion.span
            style={{ display: 'inline-block' }}
            initial={{ y: '110%', opacity: 0 }}
            whileInView={{ y: '0%', opacity: 1 }}
            viewport={{ once: true }}
            transition={{
              duration: durations.slow,
              ease: ease.expo,
              delay: delay + i * stagger,
            }}
          >
            {unit}
            {mode === 'words' && i < units.length - 1 ? '\u00A0' : ''}
          </motion.span>
        </span>
      ))}
    </El>
  );
}
