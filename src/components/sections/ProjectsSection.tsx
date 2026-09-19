import { motion } from 'framer-motion';
import { projects } from '../../data/projects';
import { ProjectCard } from './ProjectCard';
import { stagger, staggerItem } from '../../styles/animations';
import styles from './ProjectsSection.module.css';

export function ProjectsSection() {
  const featured = projects.filter((p) => p.featured);
  const others   = projects.filter((p) => !p.featured);

  return (
    <section id="projects" className={`${styles.projects} section`}>
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
            <span className={styles.labelText}>Projects</span>
          </div>
          <h2 className={styles.heading}>Things I've built.</h2>
          <p className={styles.sub}>
            A collection of projects I’ve built across different technologies and platforms.
          </p>
        </motion.div>

        {/* Featured */}
        {featured.length > 0 && (
          <motion.div
            className={styles.featuredGrid}
            variants={stagger(0.12)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
          >
            {featured.map((p) => (
              <motion.div key={p.id} variants={staggerItem}>
                <ProjectCard project={p} featured />
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Others */}
        {others.length > 0 && (
          <>
            <p className={styles.otherLabel}>More Projects</p>
            <motion.div
              className={styles.otherGrid}
              variants={stagger(0.08)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
            >
              {others.map((p) => (
                <motion.div key={p.id} variants={staggerItem}>
                  <ProjectCard project={p} />
                </motion.div>
              ))}
            </motion.div>
          </>
        )}

      </div>
    </section>
  );
}
