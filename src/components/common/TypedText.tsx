import { useReducedMotion } from 'framer-motion';
import { ElementType, useEffect, useRef, useState } from 'react';

interface TypedTextProps {
  text: string;
  as?: ElementType;
  className?: string;
  speed?: number;
  delay?: number;
  once?: boolean;
  cursor?: boolean;
}

export default function TypedText({
  text,
  as: Component = 'span',
  className,
  speed = 22,
  delay = 0,
  once = true,
  cursor = false,
}: TypedTextProps) {
  const reduceMotion = useReducedMotion();
  const hasAnimated = useRef(false);
  const [visibleLength, setVisibleLength] = useState(reduceMotion ? text.length : 0);

  useEffect(() => {
    if (reduceMotion || (once && hasAnimated.current)) {
      setVisibleLength(text.length);
      return;
    }

    setVisibleLength(0);
    let index = 0;
    let intervalId: number | undefined;

    const startId = window.setTimeout(() => {
      intervalId = window.setInterval(() => {
        index += 1;
        setVisibleLength(index);

        if (index >= text.length && intervalId) {
          window.clearInterval(intervalId);
          hasAnimated.current = true;
        }
      }, speed);
    }, delay);

    return () => {
      window.clearTimeout(startId);
      if (intervalId) {
        window.clearInterval(intervalId);
      }
    };
  }, [delay, once, reduceMotion, speed, text]);

  return (
    <Component className={className} aria-label={text}>
      {text.slice(0, visibleLength)}
      {cursor && visibleLength < text.length ? <span className="animate-pulseLine text-warm">_</span> : null}
    </Component>
  );
}
