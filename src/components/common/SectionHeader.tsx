import { motion } from 'framer-motion';
import { fadeUp, stagger } from '../../styles/animations';
import styles from './SectionHeader.module.css';

interface SectionHeaderProps {
  label?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
}

export function SectionHeader({ label, title, description, align = 'left' }: SectionHeaderProps) {
  return (
    <motion.div
      className={`${styles.header} ${styles[align]}`}
      variants={stagger(0.1)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
    >
      {label && (
        <motion.span className={styles.label} variants={fadeUp}>
          {label}
        </motion.span>
      )}
      <motion.h2 className={styles.title} variants={fadeUp}>
        {title}
      </motion.h2>
      {description && (
        <motion.p className={styles.description} variants={fadeUp}>
          {description}
        </motion.p>
      )}
    </motion.div>
  );
}
