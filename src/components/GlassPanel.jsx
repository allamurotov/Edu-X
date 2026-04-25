import { cn } from '../utils/cn';

export function GlassPanel({ className, children, ...props }) {
  return (
    <div
      className={cn(
        'rounded-2xl border border-emerald-200/60 bg-white/60 shadow-[0_8px_32px_rgba(16,185,129,0.08)] backdrop-blur-xl',
        'dark:border-lime-500/20 dark:bg-emerald-950/35 dark:shadow-[0_0_40px_rgba(34,197,94,0.12)]',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
