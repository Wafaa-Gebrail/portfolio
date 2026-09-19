import { useRef, useEffect, useState, useCallback, useMemo } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
} from 'framer-motion';
import { personal } from '../../data/personal';
import { social } from '../../data/social';
import { ease } from '../../styles/animations';
import { useIsMobile, useReducedMotion } from '../../hooks/useMediaQuery';
import styles from './HeroSection.module.css';

const cutout = new URL('../../assets/profile without background.png', import.meta.url).href;
const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

const ROLES = ['Software Engineer', 'Frontend Developer', 'Mobile Developer', 'UI/UX Enthusiast'];

const T = {
  particles: 0.2,
  circuit:   0.3,
  role:      0.4,
  name:      0.55,
  tagline:   0.9,
  chips:     1.05,
  stats:     1.1,
  ctas:      1.2,
  social:    1.35,
  portrait:  0.25,
  scroll:    1.6,
};

// ─── Particles ────────────────────────────────────────────────────────────────
const PARTICLE_COUNT = 22;

function Particles({ show, reduced }: { show: boolean; reduced: boolean }) {
  const particles = useMemo(() => Array.from({ length: PARTICLE_COUNT }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 1.6 + 0.5,
    dur: Math.random() * 18 + 14,
    delay: Math.random() * 8,
    dx: (Math.random() - 0.5) * 22,
    dy: (Math.random() - 0.5) * 22,
    opacity: Math.random() * 0.22 + 0.05,
  })), []);

  if (reduced) return null;

  return (
    <div className={styles.particles} aria-hidden="true">
      {particles.map(p => (
        <motion.span
          key={p.id}
          className={styles.particle}
          style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size }}
          initial={{ opacity: 0 }}
          animate={show ? {
            opacity: [0, p.opacity, p.opacity * 0.4, p.opacity],
            x: [0, p.dx * 0.5, p.dx, p.dx * 0.3, 0],
            y: [0, p.dy * 0.3, p.dy, p.dy * 0.6, 0],
          } : {}}
          transition={{
            duration: p.dur,
            delay: T.particles + p.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}

// ─── Circuit lines ────────────────────────────────────────────────────────────
function CircuitLines({ show, reduced }: { show: boolean; reduced: boolean }) {
  if (reduced) return null;
  return (
    <svg className={styles.circuit} viewBox="0 0 320 400" fill="none" aria-hidden="true">
      {/* vertical stem */}
      <motion.line x1="40" y1="400" x2="40" y2="200"
        stroke="#3A8FA3" strokeWidth="0.8"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={show ? { pathLength: 1, opacity: 0.35 } : {}}
        transition={{ duration: 1.4, delay: T.circuit, ease: ease.expo }}
      />
      {/* horizontal branch 1 */}
      <motion.line x1="40" y1="200" x2="160" y2="200"
        stroke="#3A8FA3" strokeWidth="0.8"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={show ? { pathLength: 1, opacity: 0.35 } : {}}
        transition={{ duration: 0.9, delay: T.circuit + 0.5, ease: ease.expo }}
      />
      {/* node dot */}
      <motion.circle cx="160" cy="200" r="3"
        fill="#3A8FA3"
        initial={{ scale: 0, opacity: 0 }}
        animate={show ? { scale: 1, opacity: 0.6 } : {}}
        transition={{ duration: 0.4, delay: T.circuit + 1.0, ease: ease.expo }}
      />
      {/* branch up */}
      <motion.line x1="160" y1="200" x2="160" y2="120"
        stroke="#3A8FA3" strokeWidth="0.8"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={show ? { pathLength: 1, opacity: 0.25 } : {}}
        transition={{ duration: 0.7, delay: T.circuit + 1.1, ease: ease.expo }}
      />
      {/* branch right */}
      <motion.line x1="160" y1="200" x2="260" y2="200"
        stroke="#AAD2DC" strokeWidth="0.5"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={show ? { pathLength: 1, opacity: 0.2 } : {}}
        transition={{ duration: 0.8, delay: T.circuit + 1.2, ease: ease.expo }}
      />
      {/* small node */}
      <motion.circle cx="40" cy="200" r="2"
        fill="#3A8FA3"
        initial={{ scale: 0, opacity: 0 }}
        animate={show ? { scale: 1, opacity: 0.5 } : {}}
        transition={{ duration: 0.3, delay: T.circuit + 0.45, ease: ease.expo }}
      />
      {/* bottom horizontal */}
      <motion.line x1="40" y1="320" x2="110" y2="320"
        stroke="#3A8FA3" strokeWidth="0.6"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={show ? { pathLength: 1, opacity: 0.2 } : {}}
        transition={{ duration: 0.6, delay: T.circuit + 0.3, ease: ease.expo }}
      />
      <motion.circle cx="110" cy="320" r="2"
        fill="#AAD2DC"
        initial={{ scale: 0, opacity: 0 }}
        animate={show ? { scale: 1, opacity: 0.4 } : {}}
        transition={{ duration: 0.3, delay: T.circuit + 0.7, ease: ease.expo }}
      />
    </svg>
  );
}

// ─── Portrait platform (replaces old backdrop) ───────────────────────────────
const HEX = 'M200,20 L370,110 L370,290 L200,380 L30,290 L30,110 Z';

function PortraitPlatform({ show, reduced }: { show: boolean; reduced: boolean }) {
  // floating data-node positions around the hex
  const nodes = useMemo(() => [
    { x: 14,  y: 38,  delay: 0.0 },
    { x: 82,  y: 8,   delay: 0.15 },
    { x: 4,   y: 62,  delay: 0.3 },
    { x: 88,  y: 72,  delay: 0.1 },
    { x: 50,  y: 96,  delay: 0.25 },
  ], []);

  return (
    <div className={styles.platformWrap} aria-hidden="true">

      {/* ── Hex SVG frame ── */}
      <svg className={styles.hexSvg} viewBox="0 0 400 400" fill="none">
        {/* outer hex — animated draw */}
        <motion.path d={HEX}
          stroke="url(#hexGrad)"
          strokeWidth="1.2"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={show ? { pathLength: 1, opacity: 1 } : {}}
          transition={{ duration: 1.8, delay: T.portrait + 0.3, ease: ease.expo }}
        />
        {/* inner hex fill */}
        <motion.path d={HEX}
          fill="url(#hexFill)"
          initial={{ opacity: 0 }}
          animate={show ? { opacity: 1 } : {}}
          transition={{ duration: 1.2, delay: T.portrait + 0.5 }}
        />
        {/* rotating energy ring 1 */}
        <motion.circle cx="200" cy="200" r="155"
          stroke="#3A8FA3" strokeWidth="0.5" strokeDasharray="6 26" strokeLinecap="round"
          initial={{ opacity: 0 }}
          animate={show ? { opacity: 0.2, rotate: 360 } : {}}
          transition={{
            opacity: { duration: 0.8, delay: T.portrait + 0.8 },
            rotate:  { duration: 40, repeat: Infinity, ease: 'linear', delay: T.portrait + 0.8 },
          }}
          style={{ transformOrigin: '200px 200px' }}
        />
        {/* rotating energy ring 2 — counter */}
        <motion.circle cx="200" cy="200" r="175"
          stroke="#AAD2DC" strokeWidth="0.4" strokeDasharray="2 34" strokeLinecap="round"
          initial={{ opacity: 0 }}
          animate={show ? { opacity: 0.12, rotate: -360 } : {}}
          transition={{
            opacity: { duration: 0.8, delay: T.portrait + 1.0 },
            rotate:  { duration: 28, repeat: Infinity, ease: 'linear', delay: T.portrait + 1.0 },
          }}
          style={{ transformOrigin: '200px 200px' }}
        />
        {/* hex vertex dots */}
        {[
          [200,20],[370,110],[370,290],[200,380],[30,290],[30,110]
        ].map(([vx,vy], i) => (
          <motion.circle key={i} cx={vx} cy={vy} r="3"
            fill="#3A8FA3"
            initial={{ scale: 0, opacity: 0 }}
            animate={show ? { scale: 1, opacity: 0.5 } : {}}
            transition={{ duration: 0.35, delay: T.portrait + 0.4 + i * 0.1, ease: ease.expo }}
          />
        ))}
        {/* scan line */}
        {!reduced && (
          <motion.line x1="30" y1="0" x2="370" y2="0"
            stroke="url(#scanGrad)" strokeWidth="1"
            initial={{ y: 20, opacity: 0 }}
            animate={show ? { y: [20, 380, 20], opacity: [0, 0.7, 0.7, 0] } : {}}
            transition={{ duration: 3.5, delay: T.portrait + 1.6, repeat: Infinity, repeatDelay: 4, ease: 'linear' }}
          />
        )}
        <defs>
          <linearGradient id="hexGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%"   stopColor="#3A8FA3" stopOpacity="0.9" />
            <stop offset="50%"  stopColor="#AAD2DC" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#3A8FA3" stopOpacity="0.8" />
          </linearGradient>
          <linearGradient id="hexFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="#0a1a26" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#080d12" stopOpacity="0.95" />
          </linearGradient>
          <linearGradient id="scanGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%"   stopColor="transparent" />
            <stop offset="40%"  stopColor="#3A8FA3" stopOpacity="0.6" />
            <stop offset="60%"  stopColor="#AAD2DC" stopOpacity="1" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
        </defs>
      </svg>

      {/* ── Floating data nodes ── */}
      {!reduced && nodes.map((n, i) => (
        <motion.div
          key={i}
          className={styles.dataNode}
          style={{ left: `${n.x}%`, top: `${n.y}%` }}
          initial={{ opacity: 0, scale: 0 }}
          animate={show ? {
            opacity: [0, 0.5, 0.28, 0.5],
            scale:   [0, 1, 1, 1],
            y:       [0, -6, 0, -6, 0],
          } : {}}
          transition={{
            opacity:  { duration: 5, delay: T.portrait + 1.2 + n.delay, repeat: Infinity, ease: 'easeInOut' },
            scale:    { duration: 0.4, delay: T.portrait + 1.0 + n.delay, ease: ease.expo },
            y:        { duration: 5, delay: T.portrait + 1.2 + n.delay, repeat: Infinity, ease: 'easeInOut' },
          }}
        />
      ))}

      {/* ── Ground energy pool ── */}
      <motion.div
        className={styles.energyPool}
        animate={show ? { opacity: [0.25, 0.5, 0.25], scaleX: [1, 1.05, 1] } : { opacity: 0 }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: T.portrait + 0.6 }}
      />
    </div>
  );
}

// ─── Rotating portrait ring ───────────────────────────────────────────────────
function PortraitRing({ show, reduced }: { show: boolean; reduced: boolean }) {
  return (
    <svg className={styles.portraitRingSvg} viewBox="0 0 400 400" fill="none" aria-hidden="true">
      {/* outer dashed ring */}
      <motion.circle
        cx="200" cy="200" r="188"
        stroke="#3A8FA3"
        strokeWidth="0.6"
        strokeDasharray="5 22"
        strokeLinecap="round"
        initial={{ opacity: 0, rotate: 0 }}
        animate={show ? { opacity: 0.18, rotate: 360 } : {}}
        transition={{
          opacity: { duration: 0.8, delay: T.portrait + 0.6 },
          rotate: { duration: 50, repeat: Infinity, ease: 'linear', delay: T.portrait + 0.6 },
        }}
        style={{ transformOrigin: '200px 200px' }}
      />
      {/* inner solid arc */}
      <motion.circle
        cx="200" cy="200" r="172"
        stroke="#AAD2DC"
        strokeWidth="0.4"
        strokeDasharray="35 310"
        strokeLinecap="round"
        initial={{ opacity: 0, rotate: 0 }}
        animate={show ? { opacity: 0.12, rotate: -360 } : {}}
        transition={{
          opacity: { duration: 0.8, delay: T.portrait + 0.8 },
          rotate: { duration: 30, repeat: Infinity, ease: 'linear', delay: T.portrait + 0.8 },
        }}
        style={{ transformOrigin: '200px 200px' }}
      />
      {/* corner accent dots */}
      {!reduced && [0, 90, 180, 270].map((deg, i) => {
        const rad = (deg * Math.PI) / 180;
        const x = 200 + 188 * Math.cos(rad);
        const y = 200 + 188 * Math.sin(rad);
        return (
          <motion.circle key={deg} cx={x} cy={y} r="2.5"
            fill="#3A8FA3"
            initial={{ scale: 0, opacity: 0 }}
            animate={show ? { scale: 1, opacity: 0.4 } : {}}
            transition={{ duration: 0.4, delay: T.portrait + 1.0 + i * 0.08, ease: ease.expo }}
          />
        );
      })}
    </svg>
  );
}

// ─── Typewriter ───────────────────────────────────────────────────────────────
function Typewriter({ show }: { show: boolean }) {
  const [idx, setIdx]           = useState(0);
  const [text, setText]         = useState('');
  const [deleting, setDeleting] = useState(false);
  const [started, setStarted]   = useState(false);

  useEffect(() => {
    if (!show) return;
    const t = setTimeout(() => setStarted(true), T.role * 1000);
    return () => clearTimeout(t);
  }, [show]);

  useEffect(() => {
    if (!started) return;
    const full = ROLES[idx];
    if (!deleting && text === full) {
      const t = setTimeout(() => setDeleting(true), 2200);
      return () => clearTimeout(t);
    }
    if (deleting && text === '') {
      setDeleting(false);
      setIdx(i => (i + 1) % ROLES.length);
      return;
    }
    const speed = deleting ? 38 : 68;
    const t = setTimeout(() => {
      setText(deleting ? full.slice(0, text.length - 1) : full.slice(0, text.length + 1));
    }, speed);
    return () => clearTimeout(t);
  }, [started, text, deleting, idx]);

  return (
    <span className={styles.roleText}>
      {text}
      <span className={styles.cursor} />
    </span>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────
export function HeroSection() {
  const sectionRef  = useRef<HTMLElement>(null);
  const isMobile    = useIsMobile();
  const reduced     = useReducedMotion();
  const [go, setGo] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setGo(true), 80);
    return () => clearTimeout(t);
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });
  const heroOpacity     = useTransform(scrollYProgress, [0, 0.65], [1, 0]);
  const portraitScrollY = useTransform(scrollYProgress, [0, 1], ['0%', '-12%']);
  const contentScrollY  = useTransform(scrollYProgress, [0, 1], ['0%', '-5%']);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const mx = useSpring(rawX, { stiffness: 38, damping: 18 });
  const my = useSpring(rawY, { stiffness: 38, damping: 18 });

  const cursorX = useMotionValue(-400);
  const cursorY = useMotionValue(-400);
  const spotX   = useSpring(cursorX, { stiffness: 110, damping: 26 });
  const spotY   = useSpring(cursorY, { stiffness: 110, damping: 26 });

  useEffect(() => {
    if (reduced) return;
    const onMove = (e: MouseEvent) => {
      rawX.set((e.clientX / window.innerWidth  - 0.5) * 2);
      rawY.set((e.clientY / window.innerHeight - 0.5) * 2);
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, [reduced, rawX, rawY, cursorX, cursorY]);

  const px = useTransform(mx, [-1, 1], isMobile ? [0, 0] : [-8, 8]);
  const py = useTransform(my, [-1, 1], isMobile ? [0, 0] : [-5, 5]);
  const cx = useTransform(mx, [-1, 1], isMobile ? [0, 0] : [4, -4]);
  const cy = useTransform(my, [-1, 1], isMobile ? [0, 0] : [2, -2]);

  const show = go && !reduced;

  // Split name into letters for stagger
  const firstLetters = personal.firstName.split('');
  const lastLetters  = personal.lastName.split('');

  return (
    <motion.section
      id="hero"
      ref={sectionRef}
      className={styles.hero}
      style={{ opacity: heroOpacity }}
    >
      {/* Cursor spotlight */}
      {!isMobile && (
        <motion.div
          className={styles.spotlight}
          style={{ left: spotX, top: spotY }}
          aria-hidden="true"
        />
      )}

      {/* Ambient orbs */}
      <div className={styles.ambientOrbs} aria-hidden="true">
        <div className={styles.orb1} />
        <div className={styles.orb2} />
        <div className={styles.orb3} />
      </div>

      {/* Noise + grid */}
      <div className={styles.noise} aria-hidden="true" />
      <div className={styles.grid}  aria-hidden="true" />

      {/* Floating particles */}
      <Particles show={show} reduced={!!reduced} />

      {/* Circuit lines — bottom left */}
      <CircuitLines show={show} reduced={!!reduced} />

      {/* ── Main layout ─────────────────────────────────────────────── */}
      <div className={styles.layout}>

        {/* ── Left: content ─────────────────────────────────────────── */}
        <motion.div
          className={styles.content}
          style={{ x: cx, y: cy, translateY: contentScrollY }}
        >
          {/* Role typewriter */}
          <motion.div
            className={styles.roleRow}
            initial={{ opacity: 0, x: -20 }}
            animate={show ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: T.role - 0.1, ease: ease.expo }}
          >
            <span className={styles.roleLine} />
            <Typewriter show={show} />
          </motion.div>

          {/* Name — letter by letter */}
          <div className={styles.nameBlock} aria-label={personal.name}>
            <span className={styles.wordMask}>
              {firstLetters.map((ch, i) => (
                <motion.span
                  key={i}
                  className={styles.nameFirst}
                  initial={{ y: '110%', opacity: 0 }}
                  animate={show ? { y: '0%', opacity: 1 } : {}}
                  transition={{ duration: 0.7, delay: T.name + i * 0.045, ease: ease.expo }}
                >
                  {ch}
                </motion.span>
              ))}
            </span>
            <span className={styles.wordMask}>
              {lastLetters.map((ch, i) => (
                <motion.span
                  key={i}
                  className={styles.nameLast}
                  initial={{ y: '110%', opacity: 0 }}
                  animate={show ? { y: '0%', opacity: 1 } : {}}
                  transition={{ duration: 0.7, delay: T.name + 0.12 + i * 0.045, ease: ease.expo }}
                >
                  {ch}
                </motion.span>
              ))}
            </span>
          </div>

          {/* Animated divider */}
          <motion.div
            className={styles.divider}
            initial={{ scaleX: 0 }}
            animate={show ? { scaleX: 1 } : {}}
            transition={{ duration: 0.9, delay: T.tagline - 0.1, ease: ease.expo }}
            style={{ transformOrigin: 'left' }}
          />

          {/* Tagline */}
          <motion.p
            className={styles.tagline}
            initial={{ opacity: 0, y: 14 }}
            animate={show ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: T.tagline, ease: ease.expo }}
          >
            Building scalable web, mobile, and intelligent products
            <br />
            with modern technologies.
          </motion.p>


          {/* CTAs */}
          <motion.div
            className={styles.ctas}
            initial={{ opacity: 0, y: 18 }}
            animate={show ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: T.ctas, ease: ease.expo }}
          >
            <MagneticButton onClick={() => scrollTo('projects')} primary>
              View My Work
              <span className={styles.btnArrow}><ArrowIcon /></span>
            </MagneticButton>
            <MagneticButton onClick={() => scrollTo('contact')}>
              Let's Connect
              <span className={styles.btnArrowOutline}><ArrowIcon /></span>
            </MagneticButton>
          </motion.div>

          {/* Social */}
          <motion.div
            className={styles.social}
            initial={{ opacity: 0, y: 8 }}
            animate={show ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: T.social }}
          >
            {social.filter(l => l.icon !== 'email').map(link => (
              <a
                key={link.label}
                href={link.url}
                className={styles.socialLink}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.label}
              >
                <SocialIcon icon={link.icon} />
              </a>
            ))}
          </motion.div>
        </motion.div>

        {/* ── Right: portrait ───────────────────────────────────────── */}
        {!isMobile && (
          <motion.div
            className={styles.portraitCol}
            style={{ x: px, y: py, translateY: portraitScrollY }}
          >
            {/* Portrait platform */}
            <PortraitPlatform show={show} reduced={!!reduced} />

            {/* Portrait reveal */}
            <motion.div
              className={styles.portraitMask}
              initial={{ clipPath: 'inset(100% 0 0 0)', opacity: 0 }}
              animate={show ? { clipPath: 'inset(0% 0 0 0)', opacity: 1 } : {}}
              transition={{ duration: 1.2, delay: T.portrait, ease: ease.expo }}
            >
              <motion.img
                src={cutout}
                alt={`${personal.name} — ${personal.title}`}
                className={styles.portraitImg}
                animate={show && !reduced ? { y: [0, -8, 0] } : {}}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: T.portrait + 1.5 }}
              />
            </motion.div>

            {/* Rotating ring */}
            <PortraitRing show={show} reduced={!!reduced} />

            {/* Light sweep */}
            <motion.div
              className={styles.lightSweep}
              initial={{ x: '-115%' }}
              animate={show ? { x: '215%' } : {}}
              transition={{ duration: 1.0, delay: T.portrait + 1.0, ease: ease.smooth }}
              aria-hidden="true"
            />
          </motion.div>
        )}
      </div>

      {/* Scroll indicator */}
      <motion.div
        className={styles.scrollHint}
        initial={{ opacity: 0 }}
        animate={show ? { opacity: 1 } : {}}
        transition={{ delay: T.scroll, duration: 0.8 }}
        aria-hidden="true"
      >
        <span className={styles.scrollLabel}>scroll</span>
        <div className={styles.scrollTrack}>
          <motion.div
            className={styles.scrollBar}
            animate={{ y: ['0%', '100%', '0%'], opacity: [0, 1, 0] }}
            transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut', repeatDelay: 0.4 }}
          />
        </div>
      </motion.div>
    </motion.section>
  );
}

// ─── Magnetic button ──────────────────────────────────────────────────────────
interface BtnProps { children: React.ReactNode; onClick?: () => void; primary?: boolean; }

function MagneticButton({ children, onClick, primary }: BtnProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const bx  = useMotionValue(0);
  const by  = useMotionValue(0);
  const sx  = useSpring(bx, { stiffness: 200, damping: 18 });
  const sy  = useSpring(by, { stiffness: 200, damping: 18 });

  const onEnter = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    const r = ref.current!.getBoundingClientRect();
    bx.set((e.clientX - r.left - r.width  / 2) * 0.35);
    by.set((e.clientY - r.top  - r.height / 2) * 0.35);
  }, [bx, by]);

  const onLeave = useCallback(() => { bx.set(0); by.set(0); }, [bx, by]);

  return (
    <motion.button
      ref={ref}
      className={primary ? styles.btnPrimary : styles.btnOutline}
      style={{ x: sx, y: sy }}
      onClick={onClick}
      onMouseMove={onEnter}
      onMouseLeave={onLeave}
      whileTap={{ scale: 0.96 }}
    >
      {children}
    </motion.button>
  );
}

// ─── Icons ────────────────────────────────────────────────────────────────────
function ArrowIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 15 15" fill="none" aria-hidden="true">
      <path d="M2 7.5h11M9 3l4.5 4.5L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function SocialIcon({ icon }: { icon: string }) {
  if (icon === 'github') return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}
