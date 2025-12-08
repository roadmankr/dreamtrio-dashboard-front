import ProductPerformanceSection from '@/app/admin/dashboard/_components/product/product-performance-section';
import ProductDashboardChart from '@/app/admin/dashboard/_components/ProductDashboardChart.client';
import StorePerformanceSection from '@/app/admin/dashboard/_components/store/store-performance-section';
import PageWrapper from '@/components/ui/page/page-wrapper';
import { getStoreListForPrefetch } from '@/entities/stores/api/store.server';
import { queries } from '@/shared/queries';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { Suspense } from 'react';
import DashboardFilter from './_components/DashboardFilter';

const DashboardPage = async () => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: queries.store.getStoreList.queryKey,
    queryFn: getStoreListForPrefetch,
  });

  return (
    <PageWrapper>
      <HydrationBoundary state={dehydrate(queryClient)}>
        {/* useSearchParams를 사용하기 위해 Suspense wrapper */}
        <Suspense>
          <div className='flex w-full flex-col gap-3 p-3'>
            {/* 매장/일자 검색 */}
            <DashboardFilter />
            {/* <StoreDateFilter /> */}
            <div className='grid grid-cols-1 gap-4 xl:grid-cols-2 xl:gap-4'>
              <StorePerformanceSection />
              <ProductPerformanceSection />
            </div>
            {/* <SellerTables /> */}
            <ProductDashboardChart />
            {/* <div className='grid gap-3 lg:grid-cols-2'>
              <GenderDashboardChart />
              <AgeDashboardChart />
            </div>

            <ProductDashboardChart />
            <BrandDashboardChart />
            <AnimationDashboardChart /> */}
          </div>
        </Suspense>
      </HydrationBoundary>
    </PageWrapper>
  );
};

export default DashboardPage;
