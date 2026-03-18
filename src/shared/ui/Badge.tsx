import { ReactNode } from 'react';

interface BadgeProps {
  children: ReactNode;
  className?: string;
}

export default function Badge({ children, className = '' }: BadgeProps) {
  return (
    <span className={`inline-flex items-center rounded-xl px-4 py-1.5 text-xs font-bold ${className}`}>
      {children}
    </span>
  );
}
