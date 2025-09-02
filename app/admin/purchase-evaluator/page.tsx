import { getStoreListInServer } from '@/actions/store.server';
import { queries } from '@/shared/queries';
import { QueryClient } from '@tanstack/react-query';
import ProductCart from './_components/ProductCart';
import ProductInfoCard from './_components/ProductInfoCard';
import PurchaseSearchFilters from './_components/PurchaseSearchFilters';
import PurchaseSearchStepper from './_components/PurchaseSearchStepper';
import StoreInfoCard from './_components/StoreInfoCard';

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

      <div className='flex flex-col gap-3 md:flex-row md:items-start md:justify-between'>
        <PurchaseSearchFilters />
      </div>

      <section className='grid gap-6 lg:grid-cols-2'>
        <StoreInfoCard />
        <ProductInfoCard />
      </section>

      <section className='grid flex-1'>
        {/* <ProductSearchResult /> */}
        <ProductCart />
      </section>
      {/* <div className='flex flex-col gap-3 md:flex-row md:items-center md:justify-between'>
        <h1 className='text-2xl font-bold tracking-tight'>구매 평가</h1>
        <div className='flex flex-col gap-2 md:flex-row md:items-center'>
          <div className='flex items-center gap-2'>
            <label className='text-sm text-slate-600'>매장</label>
          </div>
          <div className='flex items-center gap-2'></div>
        </div>
      </div> */}

      {/* <section className='grid gap-6 xl:grid-cols-2'></section> */}
    </div>
  );
};

export default PurchaseEvaluator;
