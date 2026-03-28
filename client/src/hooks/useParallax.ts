import { useEffect, useState } from 'react';

export function useParallax() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    // Skip parallax on mobile — causes forced reflow and hurts performance
    if (window.innerWidth < 768) return;

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return scrollY;
}
