import React from 'react';
import { cn } from '../../utils/cn';

export function Badge({ children, variant = 'default', className }) {
  const variants = {
    default: 'bg-gray-100 text-gray-800 dark:bg-slate-700/80 dark:text-slate-200',
    primary: 'bg-emerald-100 text-emerald-800 dark:bg-lime-500/15 dark:text-lime-300',
    red: 'bg-red-100 text-red-600 dark:bg-red-950/50 dark:text-red-300',
    blue: 'bg-cyan-100 text-cyan-800 dark:bg-emerald-950/60 dark:text-lime-300',
    yellow: 'bg-yellow-100 text-yellow-600 dark:bg-amber-950/40 dark:text-amber-200',
    green: 'bg-green-100 text-green-600 dark:bg-emerald-950/45 dark:text-emerald-300',
  };

  return (
    <span className={cn("px-2.5 py-1 text-xs font-semibold rounded-full", variants[variant], className)}>
      {children}
    </span>
  );
}
