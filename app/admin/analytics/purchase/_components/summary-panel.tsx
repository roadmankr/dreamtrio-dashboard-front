'use client';

import AgeAnalysis from '@/app/admin/analytics/purchase/_components/summary-panel/age-analysis';
import BrandAnalysis from '@/app/admin/analytics/purchase/_components/summary-panel/brand-analysis';
import GenderAnalysis from '@/app/admin/analytics/purchase/_components/summary-panel/gender-analysis';
import HeaderSummary from '@/app/admin/analytics/purchase/_components/summary-panel/header-summary';
import ReceiptTable from '@/app/admin/analytics/purchase/_components/summary-panel/receipt-table';
import useSummaryState from '@/app/admin/analytics/purchase/_hooks/useSummaryState';
import CardWrapper from '@/components/ui/card/card-wrapper';

const SummaryPanel = () => {
  const { data, isPending } = useSummaryState();

  return (
    <CardWrapper>
      {/* 매장요약 */}
      <HeaderSummary
        summary={data?.summary}
        errMsg={data?.errMsg}
        isPending={isPending}
      />

      <div className='grid grid-cols-1 gap-4'>
        <div className='grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid xl:grid-rows-1 2xl:grid-cols-2'>
          {/* 연령 */}
          <AgeAnalysis rows={data?.ageRanking ?? []} isPending={isPending} />

          {/* 성별 */}
          <GenderAnalysis
            rows={data?.genderRanking ?? []}
            isPending={isPending}
          />
        </div>

        {/* 브랜드 TOP10 */}
        <BrandAnalysis rows={data?.brandRanking ?? []} isPending={isPending} />
      </div>

      {/* 전표분석 */}
      <ReceiptTable
        rows={data?.slipList ?? []}
        isPending={isPending}
        storeName={data?.storeName ?? ''}
      />
    </CardWrapper>
  );
};

export default SummaryPanel;
