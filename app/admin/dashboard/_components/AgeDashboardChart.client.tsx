'use client';
import { DIMENSION } from '@/shared/types/sales';
import useGetSalesBreakDown from '../_api/useGetSalesBreakDown';
import DashboardPieChart from './charts/DashboardPieChart';
import QueryGuard from './common/QueryGuard';

const AgeDashboardChart = () => {
  const { data, isEnabled, isPending, isError } = useGetSalesBreakDown({
    dimension: DIMENSION.AGE,
  });

  return (
    <QueryGuard
      enabled={isEnabled}
      isPending={isPending}
      isError={isError}
      sectionType='aspect-square'
      hasData={!!data && data.length > 0}
      chartTitle='나이별 매출 통계'
      dimension={DIMENSION.AGE}
      emptyMessage='해당 조건의 나이 차트 데이터가 없습니다.'
    >
      <div className='aspect-square'>
        <DashboardPieChart data={data} />
      </div>
    </QueryGuard>
  );
};

export default AgeDashboardChart;
