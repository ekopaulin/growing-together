import { useRef, useEffect, useState } from 'react';
import styles from './ScrollRevealText.module.css';

export default function ScrollRevealText({ children }) {
  const textRef = useRef(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!textRef.current) return;
      const rect = textRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      const startReveal = windowHeight * 0.9;
      const endReveal = windowHeight * 0.3;
      
      let p = (startReveal - rect.top) / (startReveal - endReveal);
      p = Math.max(0, Math.min(1, p));
      
      requestAnimationFrame(() => setProgress(p));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const content = typeof children === 'string' ? children : (Array.isArray(children) ? children.join('') : '');
  const words = content.split(/(\s+)/);

  return (
    <span className={styles.container} ref={textRef}>
      {words.map((word, i) => {
        // Only apply effect to actual words, spaces remain transparent/default
        if (word.trim() === '') {
          return <span key={i}>{word}</span>;
        }

        // Calculate opacity for this specific word
        const wordStart = i / words.length;
        const wordEnd = (i + 1) / words.length;
        
        // Base opacity is 0.15 (very light grey)
        let opacity = 0.15; 
        
        if (progress > wordStart) {
          // Smooth transition for the word from 0.15 to 1
          const wordProgress = Math.min(1, (progress - wordStart) / (wordEnd - wordStart));
          opacity = 0.15 + 0.85 * wordProgress;
        }

        return (
          <span key={i} style={{ opacity, transition: 'opacity 0.1s ease-out' }}>
            {word}
          </span>
        );
      })}
    </span>
  );
}
