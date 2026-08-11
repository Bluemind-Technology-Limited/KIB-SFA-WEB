import { User as UserIcon } from 'lucide-react';
import { initials } from '../../utils/format';

interface AvatarProps {
  name?: string;
  size?: 'sm' | 'md';
}

/** Circular initials avatar. */
export function Avatar({ name, size = 'md' }: AvatarProps) {
  const sizeClass = size === 'sm' ? 'w-7 h-7 text-[10px]' : 'w-9 h-9 text-xs';
  return (
    <div
      className={`${sizeClass} rounded-full bg-[#EA4335]/10 border border-[#EA4335]/20 flex items-center justify-center font-bold text-[#EA4335] uppercase shrink-0`}
    >
      {name ? initials(name) : <UserIcon className="w-3.5 h-3.5" />}
    </div>
  );
}
