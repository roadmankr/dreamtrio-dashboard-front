/**
 * 구매분석 페이지
 * @returns
 */

import AnalyticsLayout from '@/app/admin/analytics/purchase/_components/analytics-layout';
import PurchaseAnalyticsFilterForm from '@/app/admin/analytics/purchase/_components/purchase-analytics-filter-form';
import PurchaseAnalyticsFilterSkeleton from '@/app/admin/analytics/purchase/_components/purchase-analytics-filter-skeleton'; // 스켈레톤 컴포넌트 임포트
import PageWrapper from '@/components/ui/page/page-wrapper';
import { Suspense } from 'react';

const PurchaseAnalyticsPage = async () => {
  return (
    <PageWrapper>
      <Suspense fallback={<PurchaseAnalyticsFilterSkeleton />}>
        <PurchaseAnalyticsFilterForm />
      </Suspense>

      <AnalyticsLayout />
    </PageWrapper>
  );
};

export default PurchaseAnalyticsPage;
