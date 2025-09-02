// app/admin/dashboard/_components/common/QueryGuard.tsx
'use client';

import CardWrapper from '@/components/ui/card/card-wrapper';
import { cn } from '@/lib/utils';
import { DIMENSION } from '@/shared/types/sales';
import useScroll from '../../_model/useScroll';
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
  dimension?: DIMENSION;
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
  emptyMessage = '데이터가 없습니다.',
  children,
}: Props) {
  const success = enabled && !isPending && !isError && hasData;
  useScroll({ success });
  return (
    <CardWrapper
      containerClassName={cn('p-4 w-full aspect-square ', sectionType)}
      className={cn('relative flex w-full items-center justify-center px-2')}
    >
      <div data-section={`${dimension}`} className='flex w-full flex-1'>
        {!enabled && <EmptyState title='필터를 선택하고 검색을 눌러주세요' />}

        {enabled && isPending && <CardSkeleton />}

        {enabled && isError && (
          <EmptyState
            title='불러오기에 실패했어요.'
            desc='잠시 후 다시 시도해주세요.'
          />
        )}

        {enabled && !isPending && !isError && !hasData && (
          <EmptyState title={emptyMessage} />
        )}

        {success && (
          <div className='flex w-full flex-1 flex-col gap-2'>
            <ChartTitle title={chartTitle} />
            <div className='flex w-full flex-1'>{children}</div>
          </div>
        )}
      </div>
    </CardWrapper>
  );
}
