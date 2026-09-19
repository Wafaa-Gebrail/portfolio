import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { personal } from '../../data/personal';
import { social } from '../../data/social';
import { ease } from '../../styles/animations';
import styles from './Footer.module.css';

function SocialIcon({ icon }: { icon: string }) {
  if (icon === 'github') return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
  if (icon === 'linkedin') return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

export function Footer() {
  const ref  = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  const year = new Date().getFullYear();
  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <motion.footer
      ref={ref}
      className={styles.footer}
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      transition={{ duration: 0.6 }}
    >
      {/* Animated teal rule */}
      <div className={styles.topRuleWrap} aria-hidden="true">
        <motion.div
          className={styles.topRule}
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 1.2, delay: 0.1, ease: ease.expo }}
          style={{ transformOrigin: 'left' }}
        />
        {/* Travelling dot along the rule */}
        <motion.div
          className={styles.ruleDot}
          initial={{ left: '0%', opacity: 0 }}
          animate={inView ? { left: ['0%', '100%'], opacity: [0, 1, 1, 0] } : {}}
          transition={{ duration: 1.4, delay: 0.3, ease: ease.smooth }}
        />
      </div>

      <div className={styles.inner}>

        {/* Brand */}
        <motion.div
          className={styles.brand}
          initial={{ opacity: 0, x: -20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.25, ease: ease.expo }}
        >
          <span className={styles.name}>
            <span className={styles.nameFirst}>{personal.firstName}</span>
            <span className={styles.nameLast}>{personal.lastName}</span>
          </span>
          <span className={styles.title}>{personal.title}</span>
        </motion.div>

        {/* Social icon links */}
        <nav className={styles.socialRow} aria-label="Footer social links">
          {social.map((link, i) => (
            <motion.a
              key={link.label}
              href={link.url}
              className={styles.socialIcon}
              target={link.icon !== 'email' ? '_blank' : undefined}
              rel="noopener noreferrer"
              aria-label={link.label}
              initial={{ opacity: 0, y: 14 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.35 + i * 0.08, ease: ease.expo }}
              whileHover={{ y: -4, scale: 1.1 }}
              whileTap={{ scale: 0.93 }}
            >
              <SocialIcon icon={link.icon} />
            </motion.a>
          ))}
        </nav>

        {/* Right: copy + back to top */}
        <motion.div
          className={styles.right}
          initial={{ opacity: 0, x: 20 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4, ease: ease.expo }}
        >
          <span className={styles.copy}>© {year} {personal.name}</span>

          {/* Back to top with orbit ring */}
          <motion.button
            className={styles.topBtn}
            onClick={scrollTop}
            aria-label="Back to top"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.92 }}
          >
            <svg className={styles.orbitRing} viewBox="0 0 40 40" fill="none" aria-hidden="true">
              <motion.circle
                cx="20" cy="20" r="17"
                stroke="rgba(58,143,163,0.35)"
                strokeWidth="1"
                strokeDasharray="4 8"
                strokeLinecap="round"
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                style={{ transformOrigin: '20px 20px' }}
              />
            </svg>
            <span className={styles.topArrow}>↑</span>
          </motion.button>
        </motion.div>

      </div>

      {/* Bottom micro-line */}
      <motion.div
        className={styles.bottomLine}
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.6 }}
        aria-hidden="true"
      />
    </motion.footer>
  );
}
