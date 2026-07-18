import { useEffect, useRef, useState } from 'react';

interface ReadingProgressBarProps {
  targetId: string;
}

export default function ReadingProgressBar({ targetId }: ReadingProgressBarProps) {
  const [progress, setProgress] = useState(0);
  const rafRef = useRef<number>(0);
  const lastPercentRef = useRef(0);

  useEffect(() => {
    const el = document.getElementById(targetId);
    if (!el) return;

    let ticking = false;

    const update = () => {
      const rect = el.getBoundingClientRect();
      const total = el.offsetHeight - window.innerHeight;
      if (total <= 0) {
        setProgress(0);
        ticking = false;
        return;
      }
      const scrolled = -rect.top;
      const pct = Math.min(100, Math.max(0, (scrolled / total) * 100));

      if (Math.abs(pct - lastPercentRef.current) > 0.1) {
        lastPercentRef.current = pct;
        rafRef.current = requestAnimationFrame(() => {
          setProgress(pct);
          ticking = false;
        });
      } else {
        ticking = false;
      }
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    update();

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(rafRef.current);
    };
  }, [targetId]);

  const indicatorLeft = `calc(${progress}% - 5px)`;

  return (
    <div
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(progress)}
      aria-label="Reading progress"
      className="fixed top-0 left-0 right-0 z-[100] h-[4px] pointer-events-none"
    >
      {/* Track */}
      <div className="absolute inset-0 bg-gray-200/50" />

      {/* Fill */}
      <div
        className="absolute top-0 left-0 h-full rounded-r-full"
        style={{
          width: `${progress}%`,
          background: 'linear-gradient(90deg, #1E40AF, #3B82F6)',
          transition: 'width 80ms linear',
          willChange: 'width',
        }}
      />

      {/* Circular indicator */}
      {progress > 0 && (
        <div
          className="absolute top-1/2 -translate-y-1/2 w-[10px] h-[10px] rounded-full bg-royal-blue shadow-[0_0_6px_rgba(30,64,175,0.5)] border-2 border-white"
          style={{
            left: indicatorLeft,
            transition: 'left 80ms linear',
            willChange: 'left',
          }}
        />
      )}
    </div>
  );
}
