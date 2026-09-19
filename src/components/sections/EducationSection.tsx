import { motion } from 'framer-motion';
import { education, certifications } from '../../data/education';
import { stagger, staggerItem } from '../../styles/animations';
import styles from './EducationSection.module.css';

export function EducationSection() {
  if (education.length === 0 && certifications.length === 0) return null;

  return (
    <section id="education" className={`${styles.education} section`}>
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
            <span className={styles.labelText}>Education</span>
          </div>
          <h2 className={styles.heading}>Academic background.</h2>
        </motion.div>

        <div className={styles.grid}>
          {/* Degrees */}
          <div>
            <p className={styles.colTitle}>Degrees</p>
            <motion.div
              className={styles.list}
              variants={stagger(0.1)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
            >
              {education.map((edu) => (
                <motion.div key={edu.id} className={styles.card} variants={staggerItem}>
                  <div className={styles.cardTop}>
                    <div>
                      <h3 className={styles.degree}>{edu.degree} in {edu.field}</h3>
                      <p className={styles.institution}>{edu.institution}</p>
                    </div>
                    <span className={styles.dates}>{edu.startDate} — {edu.endDate}</span>
                  </div>
                  {edu.description && <p className={styles.desc}>{edu.description}</p>}
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Certifications */}
          {certifications.length > 0 && (
            <div>
              <p className={styles.colTitle}>Certifications</p>
              <motion.div
                className={styles.list}
                variants={stagger(0.1)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-80px' }}
              >
                {certifications.map((cert) => (
                  <motion.div key={cert.id} className={styles.card} variants={staggerItem}>
                    <div className={styles.cardTop}>
                      <div>
                        <h3 className={styles.degree}>{cert.title}</h3>
                        <p className={styles.institution}>{cert.issuer}</p>
                      </div>
                      <span className={styles.dates}>{cert.date}</span>
                    </div>
                    {cert.url && (
                      <a href={cert.url} target="_blank" rel="noopener noreferrer" className={styles.certLink}>
                        View Certificate →
                      </a>
                    )}
                  </motion.div>
                ))}
              </motion.div>
            </div>
          )}
        </div>

      </div>
    </section>
  );
}
