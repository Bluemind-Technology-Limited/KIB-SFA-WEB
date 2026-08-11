import type { ReactNode } from 'react';

interface TooltipProps {
  content: string;
  side?: 'top' | 'right' | 'bottom' | 'left';
  children: ReactNode;
}

/**
 * Pure-CSS hover tooltip. Wrap any element (button, icon) in a `<Tooltip>` to
 * show a label on hover. Positioning is controlled via the `side` prop.
 */
export function Tooltip({ content, side = 'top', children }: TooltipProps) {
  const pos =
    side === 'right'
      ? 'left-full top-1/2 -translate-y-1/2 ml-2'
      : side === 'bottom'
        ? 'top-full left-1/2 -translate-x-1/2 mt-2'
        : side === 'left'
          ? 'right-full top-1/2 -translate-y-1/2 mr-2'
          : 'bottom-full left-1/2 -translate-x-1/2 mb-2';

  return (
    <span className="relative inline-flex group/tip">
      {children}
      <span
        role="tooltip"
        className={`pointer-events-none absolute ${pos} z-[100] whitespace-nowrap rounded-md bg-[#171717] text-white text-[11px] font-medium px-2 py-1 opacity-0 translate-y-1 group-hover/tip:opacity-100 group-hover/tip:translate-y-0 transition-all duration-150`}
      >
        {content}
      </span>
    </span>
  );
}
