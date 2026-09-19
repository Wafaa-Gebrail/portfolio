import { motion } from 'framer-motion';
import profileImg from '../../assets/profile.jpg';
import styles from './ProfileImage.module.css';

export function ProfileImage() {
  return (
    <motion.div
      className={styles.wrapper}
      initial={{ opacity: 0, scale: 0.92, x: 40 }}
      animate={{ opacity: 1, scale: 1, x: 0 }}
      transition={{ duration: 0.9, delay: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {/* Decorative background shape */}
      <div className={styles.bgShape} />

      {/* Floating accent ring */}
      <motion.div
        className={styles.accentRing}
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
      />

      {/* Image frame */}
      <div className={styles.imageFrame}>
        <img
          src={profileImg}
          alt="Wafaa Gebrail — Software Engineer"
          className={styles.image}
          loading="eager"
        />
        <div className={styles.imageOverlay} />
      </div>

      {/* Floating badge */}
      <motion.div
        className={styles.badge}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        style={{ y: 0 }}
      >
        <span className={styles.badgeDot} />
        <span>Available for opportunities</span>
      </motion.div>

      {/* Decorative dots */}
      <div className={styles.dots} aria-hidden="true">
        {Array.from({ length: 16 }).map((_, i) => (
          <div key={i} className={styles.dot} />
        ))}
      </div>
    </motion.div>
  );
}
