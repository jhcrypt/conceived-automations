import { useEffect, useState, RefObject } from 'react';

export function useSectionCollapse(ref: RefObject<HTMLElement | null>) {
  const [scale, setScale] = useState(1);
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;

      const rect = ref.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Calculate how far the section has scrolled past the viewport top
      const scrollProgress = Math.max(0, -rect.top / windowHeight);
      
      // Scale down from 1 to 0.85 as section scrolls up
      const newScale = Math.max(0.85, 1 - scrollProgress * 0.15);
      
      // Fade slightly as it collapses
      const newOpacity = Math.max(0.7, 1 - scrollProgress * 0.3);
      
      setScale(newScale);
      setOpacity(newOpacity);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial calculation
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [ref]);

  return { scale, opacity };
}
