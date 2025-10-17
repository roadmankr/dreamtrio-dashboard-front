'use client';

import AgeAnalysis from '@/app/admin/analytics/purchase/_components/summary-panel/age-analysis';
import BrandAnalysis from '@/app/admin/analytics/purchase/_components/summary-panel/brand-analysis';
import GenderAnalysis from '@/app/admin/analytics/purchase/_components/summary-panel/gender-analysis';
import HeaderSummary from '@/app/admin/analytics/purchase/_components/summary-panel/header-summary';
import ReceiptTable from '@/app/admin/analytics/purchase/_components/summary-panel/receipt-table';
import CardWrapper from '@/components/ui/card/card-wrapper';

const SummaryPanel = () => {
  return (
    <CardWrapper>
      <HeaderSummary />
      <div className='grid grid-cols-1 gap-6'>
        <div className='grid grid-cols-1 gap-6 lg:grid-cols-2'>
          <AgeAnalysis />
          <GenderAnalysis />
        </div>
        <BrandAnalysis />
      </div>
      <ReceiptTable />
    </CardWrapper>
  );
};

export default SummaryPanel;
