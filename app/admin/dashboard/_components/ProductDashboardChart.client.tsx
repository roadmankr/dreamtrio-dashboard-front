'use client';
import { DIMENSION } from '@/shared/types/sales';
import { useMemo } from 'react';
import useGetSalesBreakDown from '../_api/useGetSalesBreakDown';
import { dashboadProductTitleConfig } from '../_constants';
import DashboardBarChart from './charts/DashboardBarChart';
import DashboardTable from './common/DashboardTable';
import QueryGuard from './common/QueryGuard';

const ProductDashboardChart = () => {
  const { data, isPending, isEnabled, isError } = useGetSalesBreakDown({
    dimension: DIMENSION.PRODUCT,
  });

  const list = useMemo(() => data?.slice(0, 10) ?? [], [data]);

  return (
    <QueryGuard
      enabled={isEnabled}
      isPending={isPending}
      isError={isError}
      dimension={DIMENSION.PRODUCT}
      sectionType='aspect-video'
      chartTitle={`${dashboadProductTitleConfig[DIMENSION.PRODUCT]}별 매출 TOP10`}
      hasData={!!data && data.length > 0}
      emptyMessage='해당 조건의 상품 차트 데이터가 없습니다.'
    >
      <div className='gap2 flex w-full flex-col'>
        <div className='flex aspect-video w-full items-center justify-center'>
          <DashboardBarChart data={list} dimension={DIMENSION.PRODUCT} />
        </div>

        <DashboardTable
          data={data ?? []}
          columnTitle={dashboadProductTitleConfig[DIMENSION.PRODUCT]}
        />
      </div>
    </QueryGuard>
  );
};

export default ProductDashboardChart;
