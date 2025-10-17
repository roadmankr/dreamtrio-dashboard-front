/**
 * 구매분석 페이지
 * @returns
 */

import AnalyticsLayout from '@/app/admin/analytics/purchase/_components/analytics-layout';
import PurchaseAnalyticsFilter from '@/app/admin/analytics/purchase/_components/purchase-analytics-filter';
import PageWrapper from '@/components/ui/page/page-wrapper';

const PurchaseAnalyticsPage = () => {
  return (
    <PageWrapper>
      <PurchaseAnalyticsFilter />
      <AnalyticsLayout />
    </PageWrapper>
  );
};

export default PurchaseAnalyticsPage;
