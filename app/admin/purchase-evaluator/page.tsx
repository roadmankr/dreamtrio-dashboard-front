import UnderlineLable from '@/components/ui/label/underline-label';
import PageWrapper from '@/components/ui/page/page-wrapper';

import { getStoreListForPrefetch } from '@/entities/stores/api/store.server';
import { queries } from '@/shared/queries';
import { QueryClient } from '@tanstack/react-query';
import ProductCart from './_components/ProductCart';
import ProductInfoCard from './_components/ProductInfoCard';
import PurchaseSearchFilters from './_components/PurchaseSearchFilters';
import PurchaseSearchStepper from './_components/PurchaseSearchStepper';
import StoreInfoCard from './_components/StoreInfoCard';
import { getSearchSaleDate } from './_lib';

const PurchaseEvaluator = async () => {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: queries.store.getStoreList.queryKey,
    queryFn: getStoreListForPrefetch,
  });

  return (
    <PageWrapper>
      <div className='flex flex-wrap items-center gap-2 text-sm'>
        <PurchaseSearchStepper />
      </div>

      <div className='flex flex-col gap-3'>
        <PurchaseSearchFilters />
      </div>

      <div className='flex w-full flex-1 flex-col'>
        <div
          aria-label='검색일자 기준'
          className='w-full px-2 text-right font-semibold'
        >
          <UnderlineLable
            text={`${getSearchSaleDate()} 기준`}
            className='text-sm text-slate-700'
          />
        </div>

        <div className='flex flex-1 flex-col space-y-5'>
          <section className='mt-1 grid gap-5 lg:grid-cols-2'>
            <StoreInfoCard />
            <ProductInfoCard />
          </section>

          <section className='flex flex-1'>
            <ProductCart />
          </section>
        </div>
      </div>
    </PageWrapper>
  );
};

export default PurchaseEvaluator;
