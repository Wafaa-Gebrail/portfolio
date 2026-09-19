import { useState, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { IntroExperience } from './components/sections/IntroExperience';
import { Navbar } from './components/navigation/Navbar';
import { Footer } from './components/layout/Footer';
import { CustomCursor } from './components/common/CustomCursor';
import { Home } from './pages/Home';
import './styles/globals.css';

export default function App() {
  const [introComplete, setIntroComplete] = useState(false);
  const onIntroComplete = useCallback(() => setIntroComplete(true), []);

  return (
    <>
      <CustomCursor />

      <AnimatePresence mode="wait">
        {!introComplete && (
          <IntroExperience key="intro" onComplete={onIntroComplete} />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {introComplete && (
          <motion.div
            key="site"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <Navbar />
            <Home />
            <Footer />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
