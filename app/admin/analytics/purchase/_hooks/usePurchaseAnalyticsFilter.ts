import { analyzeDetailQuery } from '@/app/admin/analytics/purchase/_api/queries';
import { analyzeDetailFilterStore } from '@/app/admin/analytics/purchase/_store/analyze-detail.store';
import { performanceAnalyticsStore } from '@/app/admin/analytics/purchase/_store/performance.store';
import dayjs from '@/lib/dayjs';
import { zodResolver } from '@hookform/resolvers/zod';
import { useIsFetching } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useStore } from 'zustand';
import { useShallow } from 'zustand/react/shallow';
import {
  purchaseAnalyticsFilterSchema,
  TPurchaseAnalyticsInputFilter,
  TPurchaseAnalyticsOutputFilter,
} from './../_schema/filter.schema';

const usePurchaseAnalyticsFilter = () => {
  const [reset, setFilters, filters] = useStore(
    analyzeDetailFilterStore,
    useShallow((s) => [s.reset, s.setFilters, s.filters]),
  );
  const [setPerformance] = useStore(
    performanceAnalyticsStore,
    useShallow((s) => [s.setPerformance]),
  );

  useEffect(() => {
    return () => reset();
  }, [reset]);

  const form = useForm<
    TPurchaseAnalyticsInputFilter,
    unknown,
    TPurchaseAnalyticsOutputFilter
  >({
    mode: 'onChange',
    reValidateMode: 'onChange',
    resolver: zodResolver(purchaseAnalyticsFilterSchema),
    defaultValues: {
      storeId: null,
      range: {
        to: dayjs().toDate(),
        from: dayjs().startOf('month').toDate(),
      },
    },
  });

  const onSubmit = async (data: TPurchaseAnalyticsOutputFilter) => {
    try {
      setPerformance(null);
      setFilters(data);
    } catch {
      reset();
    }
  };

  const q = analyzeDetailQuery(filters);
  const isPending = useIsFetching(q) > 0;

  return { form, onSubmit, setPerformance, isPending };
};

export default usePurchaseAnalyticsFilter;
