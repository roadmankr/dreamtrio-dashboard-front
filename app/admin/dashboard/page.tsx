import PageWrapper from '@/components/ui/page/page-wrapper';
import { getStoreListForPrefetch } from '@/entities/stores/api/store.server';
import { queries } from '@/shared/queries';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { Suspense } from 'react';
import AgeDashboardChart from './_components/AgeDashboardChart.client';
import AnimationDashboardChart from './_components/AnimationDashboardChart.client';
import BrandDashboardChart from './_components/BrandDashboardChart.client';
import DashboardFilter from './_components/DashboardFilter';
import GenderDashboardChart from './_components/GenderDashboardChart.client';
import ProductDashboardChart from './_components/ProductDashboardChart.client';

const DashboardPage = async () => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: queries.store.getStoreList.queryKey,
    queryFn: getStoreListForPrefetch,
  });

  return (
    <PageWrapper>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense>
          <div className='flex w-full flex-col gap-3 p-3'>
            {/* 매장/일자 검색 */}
            <DashboardFilter />
            {/* <StoreDateFilter /> */}

            <div className='grid gap-3 lg:grid-cols-2'>
              <GenderDashboardChart />
              <AgeDashboardChart />
            </div>

            <ProductDashboardChart />
            <BrandDashboardChart />
            <AnimationDashboardChart />
          </div>
        </Suspense>
      </HydrationBoundary>
    </PageWrapper>
  );
};

export default DashboardPage;
