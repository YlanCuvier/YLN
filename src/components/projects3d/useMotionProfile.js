import { useEffect, useState } from 'react';

const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';
const COARSE_POINTER_QUERY = '(pointer: coarse)';
const MOBILE_VIEWPORT_QUERY = '(max-width: 900px)';

const readMotionProfile = () => {
  if (typeof window === 'undefined') {
    return {
      isReducedMotion: false,
      isMobile: false,
      animate: true,
      interactive: true
    };
  }

  const isReducedMotion = window.matchMedia(REDUCED_MOTION_QUERY).matches;
  const isMobile =
    window.matchMedia(COARSE_POINTER_QUERY).matches ||
    window.matchMedia(MOBILE_VIEWPORT_QUERY).matches;

  return {
    isReducedMotion,
    isMobile,
    animate: !(isReducedMotion || isMobile),
    interactive: !(isReducedMotion || isMobile)
  };
};

function useMotionProfile() {
  const [motionProfile, setMotionProfile] = useState(readMotionProfile);

  useEffect(() => {
    const reducedMotionQuery = window.matchMedia(REDUCED_MOTION_QUERY);
    const coarsePointerQuery = window.matchMedia(COARSE_POINTER_QUERY);
    const mobileViewportQuery = window.matchMedia(MOBILE_VIEWPORT_QUERY);

    const updateProfile = () => setMotionProfile(readMotionProfile());

    updateProfile();

    reducedMotionQuery.addEventListener('change', updateProfile);
    coarsePointerQuery.addEventListener('change', updateProfile);
    mobileViewportQuery.addEventListener('change', updateProfile);

    return () => {
      reducedMotionQuery.removeEventListener('change', updateProfile);
      coarsePointerQuery.removeEventListener('change', updateProfile);
      mobileViewportQuery.removeEventListener('change', updateProfile);
    };
  }, []);

  return motionProfile;
}

export default useMotionProfile;
