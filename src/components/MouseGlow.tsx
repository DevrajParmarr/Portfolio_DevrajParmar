import { useEffect, useRef } from 'react';

const MouseGlow = () => {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (glowRef.current) {
        glowRef.current.style.left = `${e.clientX - 150}px`;
        glowRef.current.style.top = `${e.clientY - 150}px`;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div
      ref={glowRef}
      className="mouse-glow"
      style={{
        left: '-150px',
        top: '-150px',
      }}
    />
  );
};

export default MouseGlow;