import type { ReactNode } from 'react';

interface MetricCardProps {
  label: string;
  icon: ReactNode;
  value: number | string;
  sub?: string;
}

/** Dashboard metric tile. */
export function MetricCard({ label, icon, value, sub }: MetricCardProps) {
  return (
    <div className="bg-white border border-[#E9E9E9] rounded-2xl flex items-center gap-3 px-3 py-3">
      <div className="w-10 h-10 rounded-xl border border-[#E9E9E9] bg-slate-50 flex items-center justify-center shrink-0">
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[10px] font-semibold text-slate-500 leading-tight truncate">{label}</p>
        <div className="flex items-baseline gap-2 mt-0.5">
          <h4 className="text-lg md:text-xl font-bold text-[#171717] leading-none">{value}</h4>
          {sub && <span className="text-[10px] text-slate-400 truncate">{sub}</span>}
        </div>
      </div>
    </div>
  );
}
