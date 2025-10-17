'use client';

import ProfitAnalysisCard from '@/app/admin/analytics/purchase/_components/performance-panel/profit-analysis';
import PurchaseGradeCard from '@/app/admin/analytics/purchase/_components/performance-panel/purchase-grade';
import SalesOverview from '@/app/admin/analytics/purchase/_components/performance-panel/sales-overview';
import CardWrapper from '@/components/ui/card/card-wrapper';

const PerformancePanel = () => {
  return (
    <CardWrapper>
      <SalesOverview />
      <ProfitAnalysisCard />
      <PurchaseGradeCard />
    </CardWrapper>
  );
};

export default PerformancePanel;
