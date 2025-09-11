import useTransitionRouter from '@/features/navigation/model/useTransitionRouter';
import { getMonthOptions } from '@/features/period-options/model/lib';
import { buildQuery } from '@/lib/http';
import { zodResolver } from '@hookform/resolvers/zod';
import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import {
  storeDateFilterSchema,
  TStoreDateFilter,
} from '../_schema/dashboard.schema';
import useStoreDateSearchParams from './useStoreDateSearchParams';

const useDashboardFilter = () => {
  const pathname = usePathname();
  const { push } = useTransitionRouter();
  const { storeId, saleDate, resetParams } = useStoreDateSearchParams();
  const form = useForm<TStoreDateFilter>({
    resolver: zodResolver(storeDateFilterSchema),
    defaultValues: {
      storeId: null,
      saleDate: saleDate || getMonthOptions()?.[0].value,
    },
  });

  useEffect(() => {
    form.reset({
      storeId,
      saleDate: saleDate || getMonthOptions()?.[0].value || '',
    });
  }, [storeId, saleDate, form]);

  const onSubmit = useCallback(
    (data: TStoreDateFilter) => {
      const query = buildQuery(data);
      push(`${pathname}${query}`);
    },
    [pathname, push],
  );

  const disabled = useMemo(
    () => !form.formState.isValid || form.formState.isSubmitting,
    [form.formState.isValid, form.formState.isSubmitting],
  );

  return { form, onSubmit, resetParams, disabled };
};

export default useDashboardFilter;
