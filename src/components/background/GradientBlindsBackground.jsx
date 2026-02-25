import { useEffect, useState } from 'react';
import GradientBlinds from './GradientBlinds';

const MOTION_QUERY = '(prefers-reduced-motion: reduce)';

function GradientBlindsBackground() {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(MOTION_QUERY);
    const handleChange = () => setReducedMotion(mediaQuery.matches);

    handleChange();
    mediaQuery.addEventListener('change', handleChange);

    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return (
    <div className="app-background" aria-hidden="true">
      {reducedMotion ? (
        <div className="app-background-fallback" />
      ) : (
        <GradientBlinds
          className="app-background-canvas"
          gradientColors={['#000000', '#222222', '#6B1200', '#8C1C00', '#E84515']}
          angle={22}
          noise={0.14}
          blindCount={14}
          blindMinWidth={70}
          mouseDampening={0.18}
          mirrorGradient
          spotlightRadius={0.58}
          spotlightSoftness={1.1}
          spotlightOpacity={0.9}
          distortAmount={0.65}
          shineDirection="left"
          mixBlendMode="normal"
        />
      )}
    </div>
  );
}

export default GradientBlindsBackground;
