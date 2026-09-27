import React from 'react';
import { RiskLevel, AlertSeverity } from '@/types/weather';

interface BadgeProps {
  level?: RiskLevel | AlertSeverity | string;
  children?: React.ReactNode;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function RiskBadge({ level, children, className = '', size = 'md' }: BadgeProps) {
  const norm = (level || '').toString().toUpperCase();

  let colorClasses = 'bg-slate-800 text-slate-300 border-slate-700';

  if (norm === 'LOW' || norm === 'GREEN') {
    colorClasses = 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30';
  } else if (norm === 'ELEVATED' || norm === 'YELLOW' || norm === 'MODERATE') {
    colorClasses = 'bg-amber-500/15 text-amber-400 border-amber-500/30';
  } else if (norm === 'HIGH' || norm === 'ORANGE') {
    colorClasses = 'bg-orange-500/15 text-orange-400 border-orange-500/30';
  } else if (norm === 'SEVERE' || norm === 'RED' || norm === 'CRITICAL') {
    colorClasses = 'bg-rose-500/20 text-rose-400 border-rose-500/40 animate-pulse';
  }

  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-xs font-medium px-2.5 py-1',
    lg: 'text-sm font-semibold px-3 py-1.5',
  }[size];

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border tracking-wide uppercase font-mono ${sizeClasses} ${colorClasses} ${className}`}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current opacity-80" />
      {children || norm}
    </span>
  );
}
