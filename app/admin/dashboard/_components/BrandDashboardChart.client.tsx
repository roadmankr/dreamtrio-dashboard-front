'use client';
import { DIMENSION } from '@/shared/types/sales';
import useGetSalesBreakDown from '../_api/useGetSalesBreakDown';
import DashboardBarChart from './charts/DashboardBarChart';
import QueryGuard from './common/QueryGuard';

const BrandDashboardChart = () => {
  const { data, isPending, isEnabled, isError } = useGetSalesBreakDown({
    dimension: DIMENSION.BRAND,
  });

  return (
    <QueryGuard
      enabled={isEnabled}
      isPending={isPending}
      isError={isError}
      sectionType='aspect-video'
      chartTitle='브랜드 매출 TOP10'
      hasData={!!data && data.length > 0}
      emptyMessage='해당 조건의 브랜드 차트 데이터가 없습니다.'
    >
      <div className='flex aspect-video w-full items-center justify-center'>
        <DashboardBarChart data={data?.slice(0, 10) ?? []} />
      </div>
    </QueryGuard>
  );
};

export default BrandDashboardChart;
