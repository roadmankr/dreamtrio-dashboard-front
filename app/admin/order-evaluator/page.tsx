'use client';

import PageWrapper from '@/components/ui/page/page-wrapper';

import OrderAnalyticsTable from './_components/OrderAnalyticsTable';
import OrderEvaluatorFileUpload from './_components/OrderEvaluatorFileUpload';

const OrderEvaluatorPage = () => {
  return (
    <PageWrapper>
      <OrderEvaluatorFileUpload />
      <OrderAnalyticsTable />
    </PageWrapper>
  );
};

export default OrderEvaluatorPage;
