'use client';
import { DIMENSION } from '@/shared/types/sales';
import useGetSalesBreakDown from '../_api/useGetSalesBreakDown';
import DashboardBarChart from './charts/DashboardBarChart';
import QueryGuard from './common/QueryGuard';

const AnimationDashboardChart = () => {
  const { data, isPending, isEnabled, isError } = useGetSalesBreakDown({
    dimension: DIMENSION.ANIMATION,
  });

  return (
    <QueryGuard
      enabled={isEnabled}
      isPending={isPending}
      isError={isError}
      sectionType='aspect-video'
      chartTitle='애니메이션 매출 TOP10'
      hasData={!!data && data.length > 0}
      emptyMessage='해당 조건의 애니메이션 차트 데이터가 없습니다.'
    >
      <div className='flex aspect-video w-full items-center justify-center'>
        <DashboardBarChart data={data?.slice(1, 11) ?? []} />
      </div>
    </QueryGuard>
  );
};

export default AnimationDashboardChart;
