import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { experiences } from '../../data/experience';
import { ExperienceItem } from './ExperienceItem';
import styles from './ExperienceSection.module.css';

export function ExperienceSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.8', 'end 0.6'] });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <section id="experience" className={`${styles.experience} section`}>
      <div className="container">

        {/* Header */}
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className={styles.sectionLabel}>
            <span className={styles.labelLine} />
            <span className={styles.labelText}>Experience</span>
          </div>
          <h2 className={styles.heading}>My professional journey.</h2>
          <p className={styles.sub}>
            The roles and projects that have shaped my engineering perspective.
          </p>
        </motion.div>

        {/* Timeline */}
        <div ref={ref} className={styles.timeline}>
          {/* Animated progress line */}
          <div className={styles.lineTrack}>
            <motion.div className={styles.lineFill} style={{ height: lineHeight }} />
          </div>

          <div className={styles.items}>
            {experiences.map((exp, i) => (
              <ExperienceItem key={exp.id} experience={exp} index={i} />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
