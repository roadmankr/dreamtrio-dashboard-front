import { performanceAnalyticsStore } from '@/app/admin/analytics/purchase/_store/performance.store';
import { useEffect } from 'react';
import { useStore } from 'zustand';
import { useShallow } from 'zustand/react/shallow'; // useShallow 임포트 추가

const usePerfomanceAnalytics = () => {
  const [reset, data, isPending] = useStore(
    performanceAnalyticsStore,
    useShallow((s) => [s.reset, s.performanceAnalytics, s.isPending]),
  );

  useEffect(() => {
    return () => reset();
  }, [reset]);

  return { data, isPending };
};

export default usePerfomanceAnalytics;
