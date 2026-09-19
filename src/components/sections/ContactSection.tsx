import { useState, useRef, useMemo } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { social } from '../../data/social';
import { ease } from '../../styles/animations';
import styles from './ContactSection.module.css';
import emailjs from '@emailjs/browser';

interface FormState  { name: string; email: string; message: string; }
interface FormErrors { name?: string; email?: string; message?: string; }

// ─── Floating particles (same language as Hero) ───────────────────────────────
function ContactParticles() {
  const particles = useMemo(() => Array.from({ length: 18 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 1.8 + 0.6,
    dur: Math.random() * 20 + 14,
    delay: Math.random() * 10,
    dx: (Math.random() - 0.5) * 28,
    dy: (Math.random() - 0.5) * 28,
    opacity: Math.random() * 0.18 + 0.04,
  })), []);

  return (
    <div className={styles.particles} aria-hidden="true">
      {particles.map(p => (
        <motion.span
          key={p.id}
          className={styles.particle}
          style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size }}
          animate={{
            opacity: [0, p.opacity, p.opacity * 0.4, p.opacity],
            x: [0, p.dx * 0.5, p.dx, p.dx * 0.3, 0],
            y: [0, p.dy * 0.3, p.dy, p.dy * 0.6, 0],
          }}
          transition={{
            duration: p.dur,
            delay: p.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}

// ─── Animated grid lines ──────────────────────────────────────────────────────
function GridLines({ inView }: { inView: boolean }) {
  return (
    <svg className={styles.gridSvg} aria-hidden="true" preserveAspectRatio="none">
      {/* horizontal lines */}
      {[20, 40, 60, 80].map((y, i) => (
        <motion.line
          key={`h${i}`}
          x1="0%" y1={`${y}%`} x2="100%" y2={`${y}%`}
          stroke="rgba(58,143,163,0.06)" strokeWidth="1"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={inView ? { pathLength: 1, opacity: 1 } : {}}
          transition={{ duration: 1.8, delay: 0.2 + i * 0.15, ease: ease.expo }}
        />
      ))}
      {/* vertical lines */}
      {[20, 40, 60, 80].map((x, i) => (
        <motion.line
          key={`v${i}`}
          x1={`${x}%`} y1="0%" x2={`${x}%`} y2="100%"
          stroke="rgba(58,143,163,0.04)" strokeWidth="1"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={inView ? { pathLength: 1, opacity: 1 } : {}}
          transition={{ duration: 2.0, delay: 0.4 + i * 0.12, ease: ease.expo }}
        />
      ))}
    </svg>
  );
}

// ─── Social icon map ──────────────────────────────────────────────────────────
function SocialIcon({ icon }: { icon: string }) {
  if (icon === 'github') return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
  if (icon === 'linkedin') return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────
export function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const inView     = useInView(sectionRef, { once: true, margin: '-60px' });

  const [form, setForm]           = useState<FormState>({ name: '', email: '', message: '' });
  const [errors, setErrors]       = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [focused, setFocused]     = useState<string | null>(null);
  

  const validate = (): boolean => {
    const e: FormErrors = {};
    if (!form.name.trim())    e.name    = 'Name is required.';
    if (!form.email.trim())   e.email   = 'Email is required.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Enter a valid email.';
    if (!form.message.trim()) e.message = 'Message is required.';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  console.log('SUBMIT CLICKED');
  console.log('FORM DATA:', form);

  if (!validate()) {
    console.log('VALIDATION FAILED');
    return;
  }

  if (!formRef.current) {
    console.log('FORM REF IS NULL');
    return;
  }

  console.log('EMAILJS ENV:', {
    serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID,
    templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
    publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
  });

  try {
    console.log({
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID,
  templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
});
    const response = await emailjs.sendForm(
      import.meta.env.VITE_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
      formRef.current,
      import.meta.env.VITE_EMAILJS_PUBLIC_KEY
    );

    console.log('EMAIL SENT SUCCESSFULLY:', response);

    setSubmitted(true);

  } catch (error) {
    console.error('EMAILJS ERROR:', error);
  }
};

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(p => ({ ...p, [name]: value }));
    if (errors[name as keyof FormErrors]) setErrors(p => ({ ...p, [name]: undefined }));
  };

  const staggerContainer = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
  };
  const item = {
    hidden: { opacity: 0, y: 28 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: ease.expo } },
  };
  const itemLeft = {
    hidden: { opacity: 0, x: -28 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.65, ease: ease.expo } },
  };

  return (
    <motion.section
      id="contact"
      ref={sectionRef}
      className={`${styles.contact} section`}
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      transition={{ duration: 0.5 }}
    >
      {/* Animated background grid */}
      <GridLines inView={inView} />

      {/* Floating particles */}
      <ContactParticles />

      {/* Animated corner accent — top right */}
      <svg className={styles.cornerAccent} viewBox="0 0 200 200" fill="none" aria-hidden="true">
        <motion.path
          d="M200 0 L200 200 L0 200"
          stroke="rgba(58,143,163,0.08)" strokeWidth="1"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={inView ? { pathLength: 1, opacity: 1 } : {}}
          transition={{ duration: 2, delay: 0.5, ease: ease.expo }}
        />
        <motion.circle cx="200" cy="200" r="80"
          stroke="rgba(58,143,163,0.05)" strokeWidth="1" fill="none"
          initial={{ scale: 0, opacity: 0 }}
          animate={inView ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 1.2, delay: 0.8, ease: ease.expo }}
          style={{ transformOrigin: '200px 200px' }}
        />
      </svg>

      <div className="container">
        <div className={styles.inner}>

          {/* ── Left column ── */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
          >
            {/* Label */}
            <motion.div className={styles.sectionLabel} variants={itemLeft}>
              <motion.span
                className={styles.labelLine}
                initial={{ scaleX: 0 }}
                animate={inView ? { scaleX: 1 } : {}}
                transition={{ duration: 0.7, delay: 0.3, ease: ease.expo }}
                style={{ transformOrigin: 'left' }}
              />
              <span className={styles.labelText}>Contact</span>
            </motion.div>

            {/* Heading */}
            <motion.h2 className={styles.heading} variants={item}>
              Let's build something<br />
              <em className={styles.headingEm}>meaningful.</em>
            </motion.h2>

            {/* Sub */}
            <motion.p className={styles.sub} variants={item}>
              Whether you have a project in mind, a role to discuss, or just want to connect —
              I'd love to hear from you.
            </motion.p>

            {/* Social links */}
            <motion.div className={styles.contactLinks} variants={staggerContainer}>
              {social.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.url}
                  className={styles.contactLink}
                  target={link.icon !== 'email' ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  variants={item}
                  whileHover={{ x: 6 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                  custom={i}
                >
                  <span className={styles.linkLeft}>
                    <span className={styles.linkIcon}>
                      <SocialIcon icon={link.icon} />
                    </span>
                    <span>{link.label}</span>
                  </span>
                  <motion.span
                    className={styles.linkArrow}
                    initial={{ x: 0, opacity: 0.4 }}
                    whileHover={{ x: 4, opacity: 1 }}
                    transition={{ duration: 0.2 }}
                  >→</motion.span>
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* ── Right: form ── */}
          <motion.div
            className={styles.formWrap}
            initial={{ opacity: 0, y: 40, scale: 0.97 }}
            animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ duration: 0.75, delay: 0.35, ease: ease.expo }}
          >
            {/* Animated top border sweep */}
            <motion.div
              className={styles.formTopLine}
              initial={{ scaleX: 0 }}
              animate={inView ? { scaleX: 1 } : {}}
              transition={{ duration: 1.0, delay: 0.5, ease: ease.expo }}
              style={{ transformOrigin: 'left' }}
            />

            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  className={styles.success}
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.92 }}
                  transition={{ duration: 0.45, ease: ease.expo }}
                >
                  <motion.div
                    className={styles.successIcon}
                    initial={{ scale: 0, rotate: -20 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ duration: 0.5, delay: 0.1, ease: ease.expo }}
                  >✓</motion.div>
                  <motion.h3
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.2 }}
                  >Message sent!</motion.h3>
                  <motion.p
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.3 }}
                  >Thanks for reaching out. Your message has been delivered successfully. I'll get back to you soon.</motion.p>
                  <motion.button
                    className={styles.resetBtn}
                    onClick={() => setSubmitted(false)}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.45 }}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >Send another</motion.button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  ref={formRef}
                  className={styles.form}
                  onSubmit={handleSubmit}
                  noValidate
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {(['name', 'email', 'message'] as const).map((fieldName, i) => (
                    <motion.div
                      key={fieldName}
                      className={styles.field}
                      initial={{ opacity: 0, y: 18 }}
                      animate={inView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.55, delay: 0.5 + i * 0.1, ease: ease.expo }}
                    >
                      <label htmlFor={fieldName} className={styles.fieldLabel}>
                        {fieldName.charAt(0).toUpperCase() + fieldName.slice(1)}
                      </label>
                      <div className={styles.inputWrap}>
                        {fieldName === 'message' ? (
                          <textarea
                            id={fieldName} name={fieldName}
                            value={form[fieldName]} onChange={handleChange}
                            onFocus={() => setFocused(fieldName)}
                            onBlur={() => setFocused(null)}
                            className={`${styles.textarea} ${errors[fieldName] ? styles.inputError : ''}`}
                            placeholder="Tell me about your project or opportunity..."
                            rows={5}
                          />
                        ) : (
                          <input
                            id={fieldName} name={fieldName}
                            type={fieldName === 'email' ? 'email' : 'text'}
                            value={form[fieldName]} onChange={handleChange}
                            onFocus={() => setFocused(fieldName)}
                            onBlur={() => setFocused(null)}
                            className={`${styles.input} ${errors[fieldName] ? styles.inputError : ''}`}
                            placeholder={fieldName === 'email' ? 'your@email.com' : 'Your name'}
                            autoComplete={fieldName}
                          />
                        )}
                        {/* Focus glow line */}
                        <motion.span
                          className={styles.focusLine}
                          initial={{ scaleX: 0 }}
                          animate={{ scaleX: focused === fieldName ? 1 : 0 }}
                          transition={{ duration: 0.3, ease: ease.smooth }}
                          style={{ transformOrigin: 'left' }}
                        />
                      </div>
                      <AnimatePresence>
                        {errors[fieldName] && (
                          <motion.span
                            className={styles.error}
                            role="alert"
                            initial={{ opacity: 0, y: -6 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -6 }}
                            transition={{ duration: 0.22 }}
                          >{errors[fieldName]}</motion.span>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  ))}

                  <motion.div
                    initial={{ opacity: 0, y: 14 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.55, delay: 0.85, ease: ease.expo }}
                  >
                    <motion.button
                      type="submit"
                      className={styles.submitBtn}
                      whileHover={{ scale: 1.02, boxShadow: '0 10px 36px rgba(58,143,163,0.4)' }}
                      whileTap={{ scale: 0.97 }}
                    >
                      <span className={styles.submitLabel}>Send Message</span>
                      <motion.span
                        className={styles.submitArrow}
                        animate={{ x: [0, 4, 0] }}
                        transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut', repeatDelay: 1 }}
                      >→</motion.span>
                    </motion.button>
                  </motion.div>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>

        </div>
      </div>
    </motion.section>
  );
}
