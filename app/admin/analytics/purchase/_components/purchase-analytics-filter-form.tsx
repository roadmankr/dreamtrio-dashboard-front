import PurchaseAnalyticsFilter from '@/app/admin/analytics/purchase/_components/purchase-analytics-filter';
import { getStoreListForPrefetch } from '@/entities/stores/api/store.server';
import { storeQueries } from '@/entities/stores/model/queries';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';

const PurchaseAnalyticsFilterForm = async () => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: storeQueries.list.queryKey,
    queryFn: getStoreListForPrefetch,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PurchaseAnalyticsFilter />
    </HydrationBoundary>
  );
};

export default PurchaseAnalyticsFilterForm;
