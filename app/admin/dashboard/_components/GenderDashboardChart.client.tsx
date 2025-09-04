'use client';

import { DIMENSION } from '@/shared/model/dimension';
import useGetSalesBreakDown from '../_api/useGetSalesBreakDown';
import DashboardPieChart from './charts/DashboardPieChart';
import QueryGuard from './common/QueryGuard';

const GenderDashboardChart = () => {
  const { data, isPending, isError, isEnabled, isFetched } =
    useGetSalesBreakDown({
      dimension: DIMENSION.GENDER,
    });

  return (
    <QueryGuard
      isFetched={isFetched}
      enabled={isEnabled}
      isPending={isPending}
      isError={isError}
      sectionType='aspect-square'
      chartTitle='성별 매출 통계'
      hasData={!!data && data.length > 0}
      dimension={DIMENSION.GENDER}
      emptyMessage='해당 조건의 성별 차트 데이터가 없습니다.'
    >
      <DashboardPieChart data={data} />
    </QueryGuard>
  );
};

export default GenderDashboardChart;
