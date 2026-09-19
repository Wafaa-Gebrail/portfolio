import { useRef, useState } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import type { Project } from '../../data/projects';
import styles from './ProjectCard.module.css';

interface Props { project: Project; featured?: boolean; }

export function ProjectCard({ project, featured = false }: Props) {
  const cardRef = useRef<HTMLElement>(null);
  const [hovered, setHovered] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Subtle tilt on hover
  const rotateX = useTransform(mouseY, [-0.5, 0.5], [2, -2]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-2, 2]);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setHovered(false);
  };

  return (
    <motion.article
      ref={cardRef}
      className={`${styles.card} ${featured ? styles.featured : ''}`}
      data-cursor="project"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformPerspective: 800 }}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Image */}
      <div className={styles.imageWrap}>
        {project.image ? (
          <motion.img
            src={project.image}
            alt={project.title}
            className={styles.image}
            animate={{ scale: hovered ? 1.06 : 1 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            loading="lazy"
          />
        ) : (
          <div className={styles.placeholder}>
            <CodeIcon />
          </div>
        )}
        <div className={styles.imageOverlay} />
        <span className={styles.category}>{project.category}</span>

        {/* Hover reveal links */}
        <motion.div
          className={styles.hoverLinks}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 8 }}
          transition={{ duration: 0.25 }}
        >
          {project.githubUrl && (
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className={styles.hoverLink} aria-label="GitHub">
              <GithubIcon /> GitHub
            </a>
          )}
          {project.liveUrl && (
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className={styles.hoverLink} aria-label="Live demo">
              <ExternalIcon /> Live
            </a>
          )}
        </motion.div>
      </div>

      {/* Content */}
      <div className={styles.content}>
        <div className={styles.titleRow}>
          <h3 className={styles.title}>{project.title}</h3>
          <motion.span
            className={styles.arrow}
            animate={{ x: hovered ? 4 : 0 }}
            transition={{ duration: 0.25 }}
          >
            →
          </motion.span>
        </div>

        <p className={styles.desc}>{project.description}</p>

        {featured && project.highlights && (
          <ul className={styles.highlights}>
            {project.highlights.map((h, i) => (
              <li key={i} className={styles.highlight}>
                <span className={styles.hDot} aria-hidden="true" />
                {h}
              </li>
            ))}
          </ul>
        )}

        <div className={styles.footer}>
          <div className={styles.tags}>
            {project.technologies.slice(0, featured ? 5 : 4).map((t) => (
              <span key={t} className={styles.tag}>{t}</span>
            ))}
            {project.technologies.length > (featured ? 5 : 4) && (
              <span className={styles.moreTag}>+{project.technologies.length - (featured ? 5 : 4)}</span>
            )}
          </div>
          <div className={styles.links}>
            {project.githubUrl && (
              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className={styles.iconLink} aria-label="GitHub">
                <GithubIcon />
              </a>
            )}
            {project.liveUrl && (
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className={styles.iconLink} aria-label="Live">
                <ExternalIcon />
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.article>
  );
}

function CodeIcon() {
  return (
    <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
    </svg>
  );
}
function GithubIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
    </svg>
  );
}
function ExternalIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
    </svg>
  );
}
