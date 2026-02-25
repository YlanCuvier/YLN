import { useEffect, useMemo, useRef, useState } from 'react';

const MARQUEE_SPEED_PX_PER_SECOND = 34;
const DEFAULT_MARQUEE_DURATION_SECONDS = 24;
const MIN_GROUP_COUNT = 3;

function Hero({ profile, metrics, keywords }) {
  const marqueeRef = useRef(null);
  const groupRef = useRef(null);
  const frameRef = useRef(null);
  const [marqueeSize, setMarqueeSize] = useState({ containerWidth: 0, groupWidth: 0 });

  useEffect(() => {
    const marqueeNode = marqueeRef.current;
    const groupNode = groupRef.current;

    if (!marqueeNode || !groupNode || keywords.length === 0) {
      return undefined;
    }

    const updateMeasurements = () => {
      const containerWidth = Math.ceil(marqueeNode.getBoundingClientRect().width);
      const groupWidth = Math.ceil(groupNode.getBoundingClientRect().width);

      setMarqueeSize((previous) => {
        if (
          previous.containerWidth === containerWidth &&
          previous.groupWidth === groupWidth
        ) {
          return previous;
        }

        return { containerWidth, groupWidth };
      });
    };

    const scheduleMeasurements = () => {
      if (frameRef.current !== null) {
        return;
      }

      frameRef.current = window.requestAnimationFrame(() => {
        frameRef.current = null;
        updateMeasurements();
      });
    };

    scheduleMeasurements();

    const resizeObserver =
      typeof window.ResizeObserver === 'function'
        ? new ResizeObserver(scheduleMeasurements)
        : null;

    resizeObserver?.observe(marqueeNode);
    resizeObserver?.observe(groupNode);
    window.addEventListener('resize', scheduleMeasurements);

    if (document.fonts?.ready) {
      document.fonts.ready.then(scheduleMeasurements).catch(() => {});
    }

    return () => {
      window.removeEventListener('resize', scheduleMeasurements);
      resizeObserver?.disconnect();

      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
        frameRef.current = null;
      }
    };
  }, [keywords]);

  const groupCount = useMemo(() => {
    if (keywords.length === 0) {
      return 0;
    }

    if (marqueeSize.containerWidth === 0 || marqueeSize.groupWidth === 0) {
      return MIN_GROUP_COUNT;
    }

    return Math.max(
      MIN_GROUP_COUNT,
      Math.ceil(marqueeSize.containerWidth / marqueeSize.groupWidth) + 2
    );
  }, [keywords.length, marqueeSize.containerWidth, marqueeSize.groupWidth]);

  const marqueeDuration = useMemo(() => {
    if (marqueeSize.groupWidth === 0) {
      return DEFAULT_MARQUEE_DURATION_SECONDS;
    }

    return Number((marqueeSize.groupWidth / MARQUEE_SPEED_PX_PER_SECOND).toFixed(2));
  }, [marqueeSize.groupWidth]);

  const keywordTrackStyle = {
    '--marquee-shift': `${Math.max(marqueeSize.groupWidth, 0)}px`,
    '--marquee-duration': `${marqueeDuration}s`
  };

  const renderKeywordGroup = (groupId) =>
    keywords.map((item, index) => (
      <span key={`${groupId}-${item}-${index}`} className="keyword-pill">
        {item}
      </span>
    ));

  return (
    <section id="home" className="hero section reveal">
      <div className="hero-top">
        <div className="hero-intro">
          <p className="eyebrow">Software Engineer</p>
          <h1>{profile.name}</h1>
          <p className="hero-role">{profile.title}</p>
          <p className="hero-summary">{profile.summary}</p>
          <div className="hero-contact-line">
            <span>{profile.location}</span>
            <a href={`mailto:${profile.email}`}>{profile.email}</a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer">
              LinkedIn
            </a>
          </div>
        </div>

        <aside className="hero-photo-card" aria-label={`${profile.name} portrait card`}>
          <div className="hero-photo-shell">
            <img className="hero-photo" src="/lowpolly.png" alt={`${profile.name} portrait`} />
            <p className="hero-photo-status">{profile.availability}</p>
          </div>
        </aside>
      </div>

      <div className="metrics-grid" aria-label="Career highlights">
        {metrics.map((metric) => (
          <article key={metric.label} className="metric-card">
            <p className="metric-value">{metric.value}</p>
            <p className="metric-label">{metric.label}</p>
          </article>
        ))}
      </div>

      <div className="keyword-marquee" aria-label="Primary skills">
        <div className="keyword-marquee-viewport" ref={marqueeRef}>
          <div className="keyword-track" style={keywordTrackStyle}>
            <div className="keyword-group" ref={groupRef}>
              {renderKeywordGroup('base')}
            </div>
            {Array.from({ length: Math.max(0, groupCount - 1) }, (_, index) => (
              <div key={`keyword-group-${index}`} className="keyword-group" aria-hidden="true">
                {renderKeywordGroup(`clone-${index}`)}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
