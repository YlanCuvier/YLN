import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Route, Routes, useLocation } from 'react-router-dom';
import Footer from './components/layout/Footer';
import { useHashScroll } from './hooks/useHashScroll';
import Navbar from './components/layout/Navbar';
import AboutPage from './routes/About';
import ContactPage from './routes/Contact';
import HomePage from './routes/Home';
import ProjectsPage from './routes/Projects';

const pageVariants = {
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
};

export default function App() {
  const location = useLocation();
  const reduceMotion = useReducedMotion();
  const isHomeRoute = location.pathname === '/';

  useHashScroll();

  return (
    <div className="relative min-h-screen overflow-hidden bg-night text-ivory">
      {isHomeRoute ? null : (
        <div className="pointer-events-none fixed inset-0 -z-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(30,84,48,0.2),_transparent_58%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,_rgba(3,6,4,0.95),_rgba(2,5,3,1))]" />
          <div className="editor-grid absolute inset-0 opacity-30" />
          <div className="noise-overlay absolute inset-0 opacity-25" />
        </div>
      )}

      {isHomeRoute ? null : <Navbar />}
      <main
        className={[
          'relative z-10 mx-auto w-full px-4 sm:px-6 lg:px-8',
          isHomeRoute ? 'flex min-h-screen max-w-6xl items-center justify-center' : 'max-w-6xl pb-14 pt-28',
        ].join(' ')}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            variants={pageVariants}
            initial={reduceMotion ? false : 'initial'}
            animate="animate"
            exit={reduceMotion ? undefined : 'exit'}
            transition={reduceMotion ? { duration: 0 } : { duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
          >
            <Routes location={location}>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/projects" element={<ProjectsPage />} />
              <Route path="/contact" element={<ContactPage />} />
            </Routes>
          </motion.div>
        </AnimatePresence>
      </main>
      {isHomeRoute ? null : <Footer />}
    </div>
  );
}
