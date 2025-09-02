import { cn } from '@/lib/utils';
import Light from './Light';

type Base = {
  title: string;
  textDirection?: 'row' | 'col';
  colorInfo?: { border: string; bg: string; text: string };
  className?: string;
  scrollable?: boolean; // ← 추가: 스크롤 여부(기본 false)
};

type Props = Base &
  (
    | { data?: number | string | null | undefined; text?: never }
    | { text?: string | undefined; data?: never }
  );

const DataSection = ({
  title,
  textDirection = 'col',
  colorInfo,
  className,
  scrollable = false,
  ...props
}: Props) => {
  // 값 한 번만 결정 (둘 다 출력되는 문제 방지)
  const value =
    'text' in props
      ? (props.text ?? '-')
      : 'data' in props
        ? (props.data ?? '-')
        : '-';

  return (
    <div
      className={cn(
        'flex min-w-0 flex-col justify-center gap-3 rounded-xl border p-4', // ← min-w-0
        className,
      )}
    >
      <div className={cn('flex flex-col gap-1')}>
        <div className='flex items-center text-xs text-slate-500'>{title}</div>

        <div
          className={cn(
            'w-full min-w-0',
            scrollable && 'overflow-x-auto whitespace-nowrap',
          )}
        >
          <span className='inline-block align-middle font-semibold'>
            {value}
          </span>
        </div>
      </div>

      {colorInfo && (
        <div className='mt-3 flex flex-1 items-end justify-center gap-3 text-sm'>
          <Light {...colorInfo} />
        </div>
      )}
    </div>
  );
};

export default DataSection;
