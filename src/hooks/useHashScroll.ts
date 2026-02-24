import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export function useHashScroll() {
  const location = useLocation();

  useEffect(() => {
    if (!location.hash) {
      return;
    }

    const targetId = decodeURIComponent(location.hash.replace('#', ''));
    if (!targetId) {
      return;
    }

    const scrollToTarget = () => {
      const target = document.getElementById(targetId);
      if (!target) {
        return false;
      }

      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      target.scrollIntoView({
        behavior: prefersReducedMotion ? 'auto' : 'smooth',
        block: 'start',
      });
      return true;
    };

    if (scrollToTarget()) {
      return;
    }

    const frame = window.requestAnimationFrame(scrollToTarget);
    return () => window.cancelAnimationFrame(frame);
  }, [location.hash, location.pathname]);
}
