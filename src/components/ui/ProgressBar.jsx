import React, { useEffect, useState } from 'react';
import { cn } from '../../utils/cn';

export function ProgressBar({ progress, max = 100, colorClass = "bg-primary" }) {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    // Small timeout for the animation to trigger after mount
    const timer = setTimeout(() => {
      setWidth(Math.min((progress / max) * 100, 100));
    }, 100);
    return () => clearTimeout(timer);
  }, [progress, max]);

  return (
    <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
      <div 
        className={cn("h-2.5 rounded-full transition-all duration-1000 ease-out", colorClass)} 
        style={{ width: `${width}%` }}
      ></div>
    </div>
  );
}
