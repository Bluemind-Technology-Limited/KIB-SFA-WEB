import type { ReactNode } from 'react';
import { Plus } from 'lucide-react';

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit';
  disabled?: boolean;
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'sm' | 'md';
  fullWidth?: boolean;
  withPlusIcon?: boolean;
  className?: string;
}

/** Reusable button. primary = KIB 3D red, secondary = bordered, danger = destructive. */
export function Button({
  children,
  onClick,
  type = 'button',
  disabled,
  variant = 'primary',
  size = 'md',
  fullWidth,
  withPlusIcon,
  className = '',
}: ButtonProps) {
  const sizeClass = size === 'sm' ? 'h-8 px-3 text-xs' : 'h-9 px-4 text-xs';
  const widthClass = fullWidth ? 'w-full' : '';

  if (variant === 'secondary') {
    return (
      <button
        type={type}
        onClick={onClick}
        disabled={disabled}
        className={`${sizeClass} ${widthClass} border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg text-xs font-semibold text-slate-700 inline-flex items-center justify-center gap-1.5 cursor-pointer transition-colors ${className}`}
      >
        {children}
      </button>
    );
  }

  if (variant === 'danger') {
    return (
      <button
        type={type}
        onClick={onClick}
        disabled={disabled}
        className={`${sizeClass} ${widthClass} border border-rose-200 bg-rose-50 hover:bg-rose-100 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg text-xs font-semibold text-rose-700 inline-flex items-center justify-center gap-1.5 cursor-pointer transition-colors ${className}`}
      >
        {children}
      </button>
    );
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={`btn-3d ${sizeClass} ${widthClass} ${className}`}>
      <span className="flex items-center gap-1.5 text-white text-xs font-semibold">
        {withPlusIcon && <Plus className="w-3.5 h-3.5" />}
        {children}
      </span>
    </button>
  );
}
