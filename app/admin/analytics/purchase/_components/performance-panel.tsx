'use client';

import ExcelDownload from '@/app/admin/analytics/purchase/_components/performance-panel/excel-download';
import ProfitAnalysisCard from '@/app/admin/analytics/purchase/_components/performance-panel/profit-analysis';
import PurchaseGradeCard from '@/app/admin/analytics/purchase/_components/performance-panel/purchase-grade';
import SalesOverview from '@/app/admin/analytics/purchase/_components/performance-panel/sales-overview';
import usePerfomanceAnalytics from '@/app/admin/analytics/purchase/_hooks/usePerfomanceAnalytics';
import CardWrapper from '@/components/ui/card/card-wrapper';
import React from 'react';

const PerformancePanel = () => {
  const { data, isPending } = usePerfomanceAnalytics();

  return (
    <CardWrapper>
      {/* 매출정보 */}
      <SalesOverview data={data?.salesOverview} isPending={isPending} />

      {/* 매입대비 수입분서 */}
      <ProfitAnalysisCard data={data?.profitAnalysis} isPending={isPending} />

      {/* 등급 및 한줄평 */}
      <PurchaseGradeCard data={data?.gradeResult} isPending={isPending} />

      {/* 엑셀다운로드 */}
      <ExcelDownload />
    </CardWrapper>
  );
};

export default React.memo(PerformancePanel);
