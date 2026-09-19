import { useState, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ScanSearch, Blocks, BookOpen, UsersRound, MapPin, Mail, ArrowDown, ArrowRight } from 'lucide-react';
import { personal } from '../../data/personal';
import { stagger, ease, durations } from '../../styles/animations';
import styles from './AboutSection.module.css';

// ─── Animation variants ────────────────────────────────────────────────────────

const sectionStagger = (delay = 0) => ({
  hidden: {},
  visible: { transition: { staggerChildren: 0.11, delayChildren: delay } },
});

const fadeSlideUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: durations.slow, ease: ease.expo } },
};

const fadeSlideRight = {
  hidden: { opacity: 0, x: 32 },
  visible: { opacity: 1, x: 0, transition: { duration: durations.slow, ease: ease.expo } },
};

const labelVariant = {
  hidden: { opacity: 0, x: -16 },
  visible: { opacity: 1, x: 0, transition: { duration: durations.base, ease: ease.expo } },
};

const lineVariant = {
  hidden: { scaleX: 0, originX: 0 },
  visible: { scaleX: 1, transition: { duration: durations.slow, ease: ease.expo, delay: 0.1 } },
};

const connectingLineVariant = {
  hidden: { scaleY: 0, originY: 0 },
  visible: { scaleY: 1, transition: { duration: durations.slower, ease: ease.expo, delay: 0.3 } },
};

// ─── Download Resume button ──────────────────────────────────────────────────

const PARTICLES = [0, 1, 2];

function DownloadResumeBtn({ href, reduced }: { href: string; reduced: boolean | null }) {
  const [hovered, setHovered] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  function handleEnter() {
    if (timerRef.current) clearTimeout(timerRef.current);
    setHovered(true);
  }
  function handleLeave() {
    timerRef.current = setTimeout(() => setHovered(false), 320);
  }

  return (
    <motion.a
      href={href}
      download="Wafaa-Gebrail-CV.pdf"
      className={`${styles.btnPrimary} ${hovered && !reduced ? styles.btnPrimaryHovered : ''}`}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      whileHover={reduced ? {} : { y: -3 }}
      whileTap={reduced ? {} : { scale: 0.96 }}
      aria-label="Download Resume PDF"
    >
      {/* Shimmer sweep */}
      {!reduced && <span className={`${styles.btnShimmer} ${hovered ? styles.btnShimmerActive : ''}`} />}

      <span className={styles.btnLabel}>Download Resume</span>

      {/* Arrow with bounce */}
      <span className={`${styles.btnArrowWrap} ${hovered && !reduced ? styles.btnArrowBounce : ''}`}>
        <ArrowDown size={14} strokeWidth={2.5} />
      </span>

      {/* Particle dots */}
      {!reduced && PARTICLES.map((i) => (
        <span
          key={i}
          className={`${styles.btnParticle} ${styles[`btnParticle${i}`]} ${hovered ? styles.btnParticleActive : ''}`}
        />
      ))}
    </motion.a>
  );
}

// ─── Pillar data ───────────────────────────────────────────────────────────────

const pillars = [
  {
    Icon: ScanSearch,
    label: 'Problem First',
    desc: 'Understand the problem before building the solution.',
    animClass: styles.iconScanSearch,
  },
  {
    Icon: Blocks,
    label: 'Simple Solutions',
    desc: 'Keep things clear, practical, and maintainable.',
    animClass: styles.iconBlocks,
  },
  {
    Icon: BookOpen,
    label: 'Keep Learning',
    desc: 'Explore new tools and technologies by building with them.',
    animClass: styles.iconBookOpen,
  },
  {
    Icon: UsersRound,
    label: 'Build for People',
    desc: 'Good software should work well and feel right to use.',
    animClass: styles.iconUsersRound,
  },
];

// ─── Pillar item ───────────────────────────────────────────────────────────────

function PillarItem({
  pillar,
  isHovered,
  onEnter,
  onLeave,
  anyHovered,
}: {
  pillar: typeof pillars[number];
  isHovered: boolean;
  onEnter: () => void;
  onLeave: () => void;
  anyHovered: boolean;
}) {
  const { Icon, label, desc, animClass } = pillar;
  const shouldDim = anyHovered && !isHovered;

  return (
    <motion.div
      className={`${styles.pillar} ${isHovered ? styles.pillarActive : ''} ${shouldDim ? styles.pillarDim : ''}`}
      variants={fadeSlideUp}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      animate={isHovered ? { y: -4 } : { y: 0 }}
      transition={{ duration: 0.25, ease: ease.smooth }}
    >
      {/* Teal accent line */}
      <span className={`${styles.pillarAccent} ${isHovered ? styles.pillarAccentVisible : ''}`} />

      {/* Icon wrapper */}
      <span className={`${styles.pillarIconWrap} ${isHovered ? animClass : ''}`}>
        <Icon size={18} strokeWidth={1.75} />
      </span>

      <div className={styles.pillarText}>
        <span className={styles.pillarLabel}>{label}</span>
        <p className={styles.pillarDesc}>{desc}</p>
      </div>
    </motion.div>
  );
}

// ─── Main component ────────────────────────────────────────────────────────────

export function AboutSection() {
  const [hoveredPillar, setHoveredPillar] = useState<string | null>(null);
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="about" className={`${styles.about} section`}>
      <div className="container">
        <div className={styles.grid}>

          {/* ── Left column ── */}
          <motion.div
            className={styles.textCol}
            variants={shouldReduceMotion ? {} : sectionStagger(0)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
          >
            {/* Section label */}
            <motion.div className={styles.sectionLabel} variants={shouldReduceMotion ? {} : labelVariant}>
              <motion.span
                className={styles.labelLine}
                variants={shouldReduceMotion ? {} : lineVariant}
              />
              <span className={styles.labelText}>About Me</span>
            </motion.div>

            {/* Heading */}
            <motion.h3
              className={styles.heading}
              variants={shouldReduceMotion ? {} : fadeSlideUp}
            >
              Software engineer who enjoys<br />
              <em className={styles.headingEm}>building things that actually work</em>
            </motion.h3>

            {/* Bio paragraphs */}
            <motion.p className={styles.bio} variants={shouldReduceMotion ? {} : fadeSlideUp}>
              {personal.summary}
            </motion.p>
            <motion.p className={styles.bio} variants={shouldReduceMotion ? {} : fadeSlideUp}>
              I enjoy taking an idea and turning it into something real — from understanding
              the requirements and planning the solution to writing the code and improving
              it along the way.
            </motion.p>

            {/* Actions */}
            <motion.div className={styles.actions} variants={shouldReduceMotion ? {} : fadeSlideUp}>
              <DownloadResumeBtn href={personal.cvUrl} reduced={shouldReduceMotion} />

              <motion.button
                className={styles.btnGhost}
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                whileHover={shouldReduceMotion ? {} : { y: -2 }}
                whileTap={shouldReduceMotion ? {} : { scale: 0.97 }}
              >
                <span>Let's Talk</span>
                <ArrowRight size={14} strokeWidth={2.5} className={styles.btnArrowRight} />
              </motion.button>
            </motion.div>
          </motion.div>

          {/* ── Right column ── */}
          <motion.div
            className={styles.rightCol}
            variants={shouldReduceMotion ? {} : sectionStagger(0.15)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
          >
            {/* Connecting line */}
            <motion.span
              className={styles.connectingLine}
              variants={shouldReduceMotion ? {} : connectingLineVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            />

            {/* Pillars */}
            <motion.div
              className={styles.pillars}
              variants={shouldReduceMotion ? {} : stagger(0.09, 0.05)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {pillars.map((p) => (
                <PillarItem
                  key={p.label}
                  pillar={p}
                  isHovered={hoveredPillar === p.label}
                  anyHovered={hoveredPillar !== null}
                  onEnter={() => setHoveredPillar(p.label)}
                  onLeave={() => setHoveredPillar(null)}
                />
              ))}
            </motion.div>

            {/* Info strip */}
            <motion.div
              className={styles.infoStrip}
              variants={shouldReduceMotion ? {} : fadeSlideRight}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {/* Location */}
              <div className={styles.infoItem}>
                <span className={styles.infoKey}>Location</span>
                <span className={`${styles.infoVal} ${styles.infoLocation}`}>
                  <span className={styles.locationIconWrap}>
                    <MapPin size={13} strokeWidth={2} className={styles.locationIcon} />
                    <span className={styles.locationPulse} />
                  </span>
                  {personal.location}
                </span>
              </div>

              {/* Email */}
              <div className={styles.infoItem}>
                <span className={styles.infoKey}>Email</span>
                <a
                  href={`mailto:${personal.email}`}
                  className={styles.infoLink}
                  aria-label={`Send email to ${personal.email}`}
                >
                  <Mail size={13} strokeWidth={2} className={styles.emailIcon} />
                  <span className={styles.emailText}>
                    {personal.email}
                    <span className={styles.emailUnderline} />
                  </span>
                </a>
              </div>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
