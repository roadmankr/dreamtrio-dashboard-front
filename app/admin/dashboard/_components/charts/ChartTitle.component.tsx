// ChartTitle.tsx
import { ReactNode } from 'react';

type Props = {
  title: string;
  subtitle?: string;
  color?: string; // hex or tailwind color value
  icon?: ReactNode; // ex) <PieChart />
  rightSlot?: ReactNode; // ex) 단위 뱃지, 필터 등
};

export default function ChartTitle({
  title,
  subtitle,
  color = '#3B82F6', // tailwind 'blue-500'
  icon,
  rightSlot,
}: Props) {
  return (
    <div className='mb-3'>
      {/* 상단 컬러바 */}
      <div
        className='h-1.5 w-full rounded-t-xl'
        style={{ backgroundColor: color }}
      />
      <div className='flex items-start justify-between gap-3 rounded-b-xl border border-gray-100 bg-white p-3 shadow-sm'>
        <div className='flex items-center gap-2'>
          {icon ? (
            <div
              className='flex h-7 w-7 items-center justify-center rounded-md'
              style={{ backgroundColor: `${color}22`, color }}
            >
              {icon}
            </div>
          ) : (
            <div
              className='h-3 w-3 rounded-sm'
              style={{ backgroundColor: color }}
            />
          )}
          <div className='leading-tight'>
            <div className='text-sm font-semibold text-gray-900'>{title}</div>
            {subtitle && (
              <div className='text-xs text-gray-500'>{subtitle}</div>
            )}
          </div>
        </div>
        {rightSlot}
      </div>
    </div>
  );
}
