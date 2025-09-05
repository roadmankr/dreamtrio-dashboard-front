import { getStoreListInServer } from '@/actions/store.server';
import { queries } from '@/shared/queries';
import StoreDateFilter from '@/widgets/store-date-filter/ui/store-date-filter';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import AgeDashboardChart from './_components/AgeDashboardChart.client';
import AnimationDashboardChart from './_components/AnimationDashboardChart.client';
import BrandDashboardChart from './_components/BrandDashboardChart.client';
import GenderDashboardChart from './_components/GenderDashboardChart.client';
import ProductDashboardChart from './_components/ProductDashboardChart.client';

const DashboardPage = async () => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: queries.store.getStoreList.queryKey,
    queryFn: getStoreListInServer,
  });

  return (
    <div className='flex min-w-full flex-col'>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <div className='flex w-full flex-col gap-3 p-3'>
          {/* 매장/일자 검색 */}
          <StoreDateFilter />

          <div className='grid gap-3 lg:grid-cols-2'>
            <GenderDashboardChart />
            <AgeDashboardChart />
          </div>

          <ProductDashboardChart />
          <BrandDashboardChart />
          <AnimationDashboardChart />
        </div>
      </HydrationBoundary>
    </div>
  );
};

export default DashboardPage;
