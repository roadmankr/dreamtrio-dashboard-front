import { cn } from '@/lib/utils';
import { Info } from 'lucide-react';
import Link from 'next/link';
import Light from './Light';

export type ActionType = { type: 'link'; url: string };

type Base = {
  title: string;
  textDirection?: 'row' | 'col';
  colorInfo?: { border: string; bg: string; text: string };
  className?: string;
  scrollable?: boolean;
  actionType?: ActionType;
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
        'flex min-w-0 flex-col justify-center gap-3 rounded-xl border p-4',
        className,
      )}
    >
      <div className={cn('relative flex flex-col gap-1')}>
        <div className='flex w-full items-center justify-end text-xs text-slate-500'>
          <span className='flex-1'>{title}</span>

          {props.actionType?.type === 'link' && (
            <Link
              href={props.actionType.url}
              target='_blank'
              rel='noopener noreferrer'
              aria-label='dashboard 바로가기'
            >
              <Info className='h-4 w-4 cursor-pointer' aria-hidden />
            </Link>
          )}
        </div>

        <div
          className={cn(
            'w-full min-w-0',
            scrollable && 'overflow-x-auto whitespace-nowrap',
          )}
        >
          <span className='inline-block align-middle text-sm font-semibold'>
            {value}
          </span>
        </div>
      </div>

      {colorInfo && (
        <div className='mt-3 flex flex-1 items-end justify-center gap-3'>
          <Light {...colorInfo} />
        </div>
      )}
    </div>
  );
};

export default DataSection;
