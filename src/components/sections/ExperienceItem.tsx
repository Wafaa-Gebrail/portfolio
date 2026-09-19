import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import type { Experience } from '../../data/experience';
import styles from './ExperienceItem.module.css';

interface Props { experience: Experience; index: number; }

export function ExperienceItem({ experience, index }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <div ref={ref} className={styles.item}>
      {/* Timeline dot */}
      <div className={styles.dotCol}>
        <motion.div
          className={styles.dot}
          initial={{ scale: 0, opacity: 0 }}
          animate={inView ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 0.4, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className={styles.dotInner} />
        </motion.div>
      </div>

      {/* Card */}
      <motion.div
        className={styles.card}
        initial={{ opacity: 0, x: -24 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.65, delay: index * 0.1 + 0.1, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Header */}
        <div className={styles.cardHeader}>
          <div className={styles.cardMeta}>
            <h3 className={styles.position}>{experience.position}</h3>
            <div className={styles.company}>
              <span className={styles.companyName}>{experience.company}</span>
              <span className={styles.sep}>·</span>
              <span className={styles.location}>{experience.location}</span>
            </div>
          </div>
          <div className={styles.dateBlock}>
            <span className={styles.dates}>{experience.startDate} — {experience.endDate}</span>
            {experience.current && <span className={styles.currentBadge}>Current</span>}
          </div>
        </div>

        {/* Description */}
        <ul className={styles.desc}>
          {experience.description.map((pt, i) => (
            <li key={i} className={styles.pt}>
              <span className={styles.bullet} aria-hidden="true" />
              {pt}
            </li>
          ))}
        </ul>

        {/* Tech tags */}
        {experience.technologies.length > 0 && (
          <div className={styles.tags}>
            {experience.technologies.map((t) => (
              <span key={t} className={styles.tag}>{t}</span>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
}
