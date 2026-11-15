import React from 'react';
import { useReadingProgress } from '../../hooks/useReadingProgress';

export const ReadingProgressBar: React.FC = () => {
  const progress = useReadingProgress();

  return (
    <div
      className="fixed top-0 left-0 right-0 h-[2.5px] z-50 bg-transparent pointer-events-none"
      aria-hidden="true"
    >
      <div
        className="h-full bg-editorial-terracotta dark:bg-editorial-terracotta-dark transition-all duration-150 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};
