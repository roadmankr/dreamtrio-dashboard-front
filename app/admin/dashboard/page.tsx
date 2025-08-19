import { getStoreList } from '@/features/store-options/service';
import { queries } from '@/shared/queries';
import StoreDateFilter from '@/widgets/store-date-filter/ui/store-date-filter';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { Suspense } from 'react';
import AgeDashboardChart from './_components/AgeDashboardChart.client';
import GenderDashboardChart from './_components/GenderDashboardChart.client';
import ProductDashboardChart from './_components/ProductDashboardChart.client';

const DashboardPage = async () => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: queries.store.getStoreList.queryKey,
    queryFn: getStoreList,
  });

  return (
    <div className='flex min-w-full flex-col'>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <div className='flex w-full flex-col gap-3 p-3'>
          <Suspense>
            <StoreDateFilter />
          </Suspense>

          <div className='flex gap-3'>
            <Suspense>
              <GenderDashboardChart />
            </Suspense>

            <Suspense>
              <AgeDashboardChart />
            </Suspense>
          </div>

          <Suspense>
            <ProductDashboardChart />
          </Suspense>
        </div>
      </HydrationBoundary>
    </div>
  );
};

export default DashboardPage;
