export function DeltaPill({ value }: { value: string }) {
  const isUp = value.trim().startsWith('+');

  return (
    <span
      className={[
        'inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium',
        isUp
          ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300'
          : 'bg-rose-50 text-rose-700 dark:bg-rose-900/30 dark:text-rose-300',
      ].join(' ')}
    >
      <svg
        width='14'
        height='14'
        viewBox='0 0 20 20'
        className={isUp ? 'rotate-0' : 'rotate-180'}
        fill='currentColor'
      >
        <path d='M10 4l6 8H4l6-8z' />
      </svg>
      {value}
    </span>
  );
}
