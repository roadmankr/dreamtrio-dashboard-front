/**
 * 발주평가
 * @returns
 */

import ProductCart from '@/app/admin/evaluation/purchase-order/_components/ProductCart';
import ProductInfoCard from '@/app/admin/evaluation/purchase-order/_components/ProductInfoCard';
import PurchaseMonthlyOverview from '@/app/admin/evaluation/purchase-order/_components/PurchaseMonthlyOverview';
import PurchaseSearchFilters from '@/app/admin/evaluation/purchase-order/_components/PurchaseSearchFilters';
import PurchaseSearchStepper from '@/app/admin/evaluation/purchase-order/_components/PurchaseSearchStepper';
import StoreInfoCard from '@/app/admin/evaluation/purchase-order/_components/StoreInfoCard';
import PageWrapper from '@/components/ui/page/page-wrapper';

const PurchaseOrderEvaluationPage = () => {
  return (
    <PageWrapper>
      <PurchaseSearchStepper />

      <div className='flex flex-col gap-3'>
        <PurchaseSearchFilters />
      </div>

      <div className='flex flex-1 flex-col space-y-5'>
        <section className='mt-1 grid gap-5 lg:grid-cols-2'>
          <StoreInfoCard />
          <ProductInfoCard />
        </section>
      </div>

      <PurchaseMonthlyOverview />

      <section className='flex flex-1'>
        <ProductCart />
      </section>
      {/* <div className='flex flex-wrap items-center gap-2 text-sm'>
        <PurchaseSearchStepper />
      </div>

      <div className='flex flex-col gap-3'>
        <PurchaseSearchFilters />
      </div> */}
    </PageWrapper>
  );
};

export default PurchaseOrderEvaluationPage;
