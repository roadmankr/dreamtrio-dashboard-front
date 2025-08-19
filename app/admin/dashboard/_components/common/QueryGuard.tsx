// app/admin/dashboard/_components/common/QueryGuard.tsx
'use client';

import { CardSkeleton } from './CardSkeleton';
import { EmptyState } from './EmptyState';

type Props = {
  enabled: boolean;
  isPending: boolean;
  isError: boolean;
  hasData: boolean;
  emptyMessage?: string;
  children: React.ReactNode;
};

export default function QueryGuard({
  enabled,
  isPending,
  isError,
  hasData,
  emptyMessage = '데이터가 없습니다.',
  children,
}: Props) {
  if (!enabled) {
    return <EmptyState title='필터를 선택하고 검색을 눌러주세요' />;
  }
  if (isPending) return <CardSkeleton />;
  if (isError)
    return (
      <EmptyState
        title='불러오기에 실패했어요.'
        desc='잠시 후 다시 시도해주세요.'
      />
    );
  if (!hasData) return <EmptyState title={emptyMessage} />;
  return <>{children}</>;
}
