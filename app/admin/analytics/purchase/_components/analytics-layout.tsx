import PerformancePanel from '@/app/admin/analytics/purchase/_components/performance-panel';
import SummaryPanel from '@/app/admin/analytics/purchase/_components/summary-panel';

const AnalyticsLayout = () => {
  return (
    <div className='grid h-full grid-rows-2 gap-4 xl:grid-cols-2 xl:grid-rows-1'>
      {/* 왼쪽 매장요약 */}
      <SummaryPanel />

      {/* 오른쪽 매출요약 */}
      <PerformancePanel />
    </div>
  );
};

export default AnalyticsLayout;
