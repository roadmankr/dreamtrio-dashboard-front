import { getStoreListInServer } from '@/actions/store.server';
import UnderlineLable from '@/components/ui/label/underline-label';
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
    queryFn: getStoreListInServer,
  });

  return (
    <div className='mx-auto flex min-h-full w-full flex-col space-y-6 p-6'>
      <div className='flex flex-wrap items-center gap-2 text-sm'>
        <PurchaseSearchStepper />
      </div>

      <div className='flex flex-col gap-3'>
        <PurchaseSearchFilters />
      </div>

      <div className='w-full'>
        <div
          aria-label='검색일자 기준'
          className='w-full px-2 text-right font-semibold'
        >
          <UnderlineLable
            text={`${getSearchSaleDate()} 기준`}
            className='text-sm text-slate-700'
          />
        </div>

        <div className='space-y-5'>
          <section className='mt-1 grid gap-5 lg:grid-cols-2'>
            <StoreInfoCard />
            <ProductInfoCard />
          </section>

          <section className='grid flex-1'>
            <ProductCart />
          </section>
        </div>
      </div>
    </div>
  );
};

export default PurchaseEvaluator;
