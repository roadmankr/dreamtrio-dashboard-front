'use client';

import CardWrapper from '@/components/ui/card/card-wrapper';
import { cn } from '@/lib/utils';
import { type Dimension } from '@/shared/model/dimension';
import { ViewState } from '@/shared/model/status';
import useChartViewState from '../../_model/useChartViewState';
import ChartTitle from '../charts/ChartTitle.component';
import { CardSkeleton } from './CardSkeleton';
import { EmptyState } from './EmptyState';

type Props = {
  enabled: boolean;
  isPending: boolean;
  isError: boolean;
  hasData: boolean;
  chartTitle: string;
  sectionType: 'aspect-square' | 'aspect-video';
  dimension: Dimension;
  isFetched?: boolean;
  emptyMessage?: string;
  children: React.ReactNode;
};

export default function QueryGuard({
  enabled,
  chartTitle,
  isPending,
  isError,
  hasData,
  sectionType,
  dimension,
  isFetched,
  emptyMessage = '데이터가 없습니다.',
  children,
}: Props) {
  const { status } = useChartViewState({
    enabled,
    isPending,
    isError,
    hasData,
    dimension,
    isFetched,
  });

  return (
    <CardWrapper
      containerClassName={cn(
        'p-4 w-full aspect-square',
        sectionType,
        hasData && isFetched && 'aspect-auto',
      )}
      className={cn('relative flex w-full items-center justify-center px-2')}
    >
      <div
        data-section={`${dimension}`}
        className='flex w-full flex-1 flex-col'
      >
        <ChartTitle title={chartTitle} />

        <div className='flex w-full flex-1 flex-col gap-2 rounded-xl border border-dashed p-4 text-center text-sm text-slate-500'>
          {status === ViewState.IDLE && (
            <EmptyState title='필터를 선택하고 검색을 눌러주세요' />
          )}

          {status === ViewState.PENDING && <CardSkeleton />}

          {status === ViewState.ERROR && (
            <EmptyState
              title='불러오기에 실패했어요.'
              desc='잠시 후 다시 시도해주세요.'
            />
          )}

          {status === ViewState.EMPTY && <EmptyState title={emptyMessage} />}

          {status === ViewState.SUCCESS && (
            <div
              className='flex w-full flex-1 overflow-x-auto'
              style={{ contain: 'layout' }}
            >
              {children}
            </div>
          )}
        </div>
      </div>
    </CardWrapper>
  );
}
