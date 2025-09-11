import { TAnalytisSignal } from '@/entities/commerce-analytics/model/type';
import AnalyticsLight from '@/entities/commerce-analytics/ui/AnalyticsLight';
import { cn } from '@/lib/utils';
import { Info } from 'lucide-react';
import Link from 'next/link';
import { Action, ACTION_MAP } from '../../_constants';

export type ActionType = { type: 'link'; url: string };

type Props = {
  title: string;
  textDirection?: 'row' | 'col';
  data?: number | string | null;
  colorInfo?: Pick<TAnalytisSignal, 'colorInfo'>['colorInfo'];
  className?: string;
  scrollable?: boolean;
  actionType?: Action;
};

const DataSection = ({
  title,
  data,
  actionType,
  colorInfo,
  className,
  scrollable = false,
}: Props) => {
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

          {actionType?.type === ACTION_MAP.LINK && (
            <Link
              href={actionType.url}
              target='_blank'
              rel='noopener noreferrer'
              aria-label='dashboard 바로가기'
              title='대시보드로 이동'
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
          aria-describedby={scrollable ? `${title}-scroll-hint` : undefined}
        >
          <span
            className='inline-block align-middle text-sm font-semibold'
            aria-live='polite'
          >
            {data ?? '-'}
          </span>
        </div>
      </div>

      {colorInfo && (
        <div className='mt-3 flex flex-1 items-end justify-center gap-3'>
          <AnalyticsLight {...colorInfo} />
        </div>
      )}
    </div>
  );
};

export default DataSection;
