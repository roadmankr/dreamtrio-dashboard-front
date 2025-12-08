import { ReactNode } from 'react';

export function Metric({
  label,
  value,
  helper,
}: {
  label: string;
  value: string;
  helper?: ReactNode;
}) {
  return (
    <div className='rounded-xl border border-zinc-200/60 p-3 dark:border-zinc-800'>
      <div className='text-[11px] text-zinc-500'>{label}</div>
      <div className='mt-1 text-lg font-semibold text-zinc-900 dark:text-zinc-100'>
        {value}
      </div>
      {helper && (
        <div className='flex h-6 items-center text-[11px] text-zinc-500'>
          {helper}
        </div>
      )}
    </div>
  );
}
