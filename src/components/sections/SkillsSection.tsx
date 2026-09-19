import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { skillCategories } from '../../data/skills';
import { ease, durations } from '../../styles/animations';
import styles from './SkillsSection.module.css';

// ─── Variants ─────────────────────────────────────────────────────────────────

const rowVariant = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: durations.slow, ease: ease.expo } },
};

const pillVariant = {
  hidden: { opacity: 0, scale: 0.88, y: 10 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: durations.base, ease: ease.expo } },
};

const rowStagger = (i: number) => ({
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.055, delayChildren: i * 0.08 },
  },
});

// ─── Pill ─────────────────────────────────────────────────────────────────────

function Pill({ name, reduced }: { name: string; reduced: boolean | null }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.span
      className={`${styles.pill} ${hovered ? styles.pillHovered : ''}`}
      variants={reduced ? {} : pillVariant}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      whileHover={reduced ? {} : { y: -3, scale: 1.04 }}
      whileTap={reduced ? {} : { scale: 0.97 }}
      transition={{ duration: 0.2, ease: ease.smooth }}
    >
      <span className={`${styles.pillDot} ${hovered && !reduced ? styles.pillDotActive : ''}`} />
      {name}
    </motion.span>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────

export function SkillsSection() {
  const reduced = useReducedMotion();

  return (
    <section id="skills" className={`${styles.skills} section`}>
      <div className="container">

        {/* Header */}
        <motion.div
          className={styles.header}
          initial={reduced ? false : { opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: durations.slow, ease: ease.expo }}
        >
          <div className={styles.sectionLabel}>
            <motion.span
              className={styles.labelLine}
              initial={reduced ? false : { scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: durations.slow, ease: ease.expo, delay: 0.1 }}
              style={{ transformOrigin: 'left' }}
            />
            <span className={styles.labelText}>Tech Stack</span>
          </div>
          <h2 className={styles.heading}>Technologies I work with.</h2>
        </motion.div>

        {/* Category rows */}
        <div className={styles.rows}>
          {skillCategories.map((cat, i) => (
            <motion.div
              key={cat.number}
              className={styles.row}
              variants={reduced ? {} : rowVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              transition={{ delay: i * 0.07 }}
            >
              {/* Left: number + category */}
              <div className={styles.rowMeta}>
                <span className={styles.rowNumber}>{cat.number}</span>
                <span className={styles.rowDivider}>—</span>
                <span className={styles.rowCategory}>{cat.category}</span>
              </div>

              {/* Right: pills */}
              <motion.div
                className={styles.pillGroup}
                variants={reduced ? {} : rowStagger(i)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-60px' }}
              >
                {cat.skills.map((name) => (
                  <Pill key={name} name={name} reduced={reduced} />
                ))}
              </motion.div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
