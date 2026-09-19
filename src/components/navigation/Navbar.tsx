import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { navItems } from '../../data/navigation';
import { personal } from '../../data/personal';
import { useActiveSection } from '../../hooks/useActiveSection';
import styles from './Navbar.module.css';

const sectionIds = navItems.map((item) => item.href.replace('#', ''));

export function Navbar() {
  const [scrolled, setScrolled]   = useState(false);
  const [heroMode, setHeroMode]   = useState(true);
  const [menuOpen, setMenuOpen]   = useState(false);
  const activeSection             = useActiveSection(sectionIds);

  useEffect(() => {
    const handler = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
      // hero section is roughly 100vh tall
      setHeroMode(y < window.innerHeight * 0.85);
    };
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const go = (href: string) => {
    setMenuOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.header
      className={`${styles.navbar} ${scrolled ? styles.scrolled : ''} ${heroMode && !scrolled ? styles.heroMode : ''}`}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
    >
      <div className={styles.inner}>
        {/* Logo */}
        <a href="#hero" className={styles.logo} onClick={(e) => { e.preventDefault(); go('#hero'); }}>
          <span className={styles.logoFirst}>{personal.firstName}</span>
          <span className={styles.logoLast}>{personal.lastName}</span>
        </a>

        {/* Desktop nav */}
        <nav className={styles.desktopNav} aria-label="Main navigation">
          {navItems.map((item) => {
            const isActive = activeSection === item.href.replace('#', '');
            return (
              <a
                key={item.href}
                href={item.href}
                className={`${styles.navLink} ${isActive ? styles.active : ''}`}
                onClick={(e) => { e.preventDefault(); go(item.href); }}
              >
                {item.label}
                {isActive && (
                  <motion.span
                    className={styles.activeUnderline}
                    layoutId="nav-underline"
                    transition={{ type: 'spring', stiffness: 380, damping: 36 }}
                  />
                )}
              </a>
            );
          })}
        </nav>

        <div className={styles.actions}>
          <a href={personal.cvUrl} className={styles.resumeBtn} target="_blank" rel="noopener noreferrer">
            Resume ↗
          </a>
          <button
            className={styles.menuToggle}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            <span className={`${styles.bar} ${menuOpen ? styles.barOpen1 : ''}`} />
            <span className={`${styles.bar} ${menuOpen ? styles.barOpen2 : ''}`} />
            <span className={`${styles.bar} ${menuOpen ? styles.barOpen3 : ''}`} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className={styles.mobileMenu}
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          >
            <nav aria-label="Mobile navigation">
              {navItems.map((item, i) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  className={`${styles.mobileNavLink} ${activeSection === item.href.replace('#', '') ? styles.active : ''}`}
                  onClick={(e) => { e.preventDefault(); go(item.href); }}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  {item.label}
                </motion.a>
              ))}
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: navItems.length * 0.05 }}>
                <a href={personal.cvUrl} className={styles.mobileCta} target="_blank" rel="noopener noreferrer">
                  Download Resume ↗
                </a>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
