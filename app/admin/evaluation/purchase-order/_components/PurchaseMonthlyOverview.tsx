'use client';

import ChartCategory from '@/app/admin/evaluation/purchase-order/_components/chart/ChartCategory';
import InfoSectionWrapper from '@/app/admin/evaluation/purchase-order/_components/common/InfoSectionWrapper';

export interface PurchaseByCategory {
  category: string;
  amount: number; // KRW
}

const PurchaseMonthlyOverview = () => {
  const thisStoreMonthlyPurchases: PurchaseByCategory[] = [
    { category: '상의', amount: 5_200_000 },
    { category: '하의', amount: 3_800_000 },
    { category: '아우터', amount: 4_600_000 },
    { category: '원피스', amount: 2_700_000 },
    { category: '신발', amount: 3_300_000 },
    { category: '가방', amount: 2_200_000 },
    { category: '액세서리', amount: 1_600_000 },
  ];
  const peerMonthlyPurchases: PurchaseByCategory[] = [
    { category: '상의', amount: 4_900_000 },
    { category: '하의', amount: 4_100_000 },
    { category: '아우터', amount: 4_200_000 },
    { category: '원피스', amount: 2_900_000 },
    { category: '신발', amount: 3_700_000 },
    { category: '가방', amount: 2_600_000 },
    { category: '액세서리', amount: 1_900_000 },
  ];

  return (
    <InfoSectionWrapper
      title=' 상품 · 구매 현황'
      // className={cn(
      //   'rounded-2xl border border-zinc-200 bg-zinc-50/60 p-4 md:p-6',
      // )}
    >
      {/* <header className='mb-4 flex items-center justify-between gap-3'>
        <h2 className='text-base font-semibold text-zinc-900'>
          상품 · 구매 현황
        </h2>
        <span className='text-xs text-zinc-500'>=today() 기준</span>
      </header> */}

      <div className='grid h-full grid-cols-1 gap-4 xl:grid-cols-2'>
        <ChartCategory
          title='최근 한달 구매 현황 (해당매장)'
          data={thisStoreMonthlyPurchases}
        />

        <ChartCategory
          title='최근 한달 구매 현황 (타매장 평균)'
          data={peerMonthlyPurchases}
        />
      </div>
    </InfoSectionWrapper>
  );
};

export default PurchaseMonthlyOverview;
