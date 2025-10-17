import PerformancePanel from '@/app/admin/analytics/purchase/_components/performance-panel';
import SummaryPanel from '@/app/admin/analytics/purchase/_components/summary-panel';

const AnalyticsLayout = () => {
  return (
    <div className='grid h-full grid-rows-2 gap-6 xl:grid-cols-2 xl:grid-rows-1'>
      <SummaryPanel />
      <PerformancePanel />
    </div>
  );
};

export default AnalyticsLayout;
