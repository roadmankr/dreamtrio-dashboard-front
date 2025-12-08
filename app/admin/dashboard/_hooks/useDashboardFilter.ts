import useTransitionRouter from '@/features/navigation/model/useTransitionRouter';
import { getMonthOptions } from '@/features/period-options/model/lib';
import { buildQuery } from '@/lib/http';
import { zodResolver } from '@hookform/resolvers/zod';
import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import {
  storeDateFilterSchema,
  TStoreDateFilterInput,
  TStoreDateFilterOutput,
} from '../_schema/dashboard.schema';
import useStoreDateSearchParams from './useStoreDateSearchParams';

const useDashboardFilter = () => {
  const pathname = usePathname();
  const { push } = useTransitionRouter();
  const { storeId, saleDate, resetParams } = useStoreDateSearchParams();

  const form = useForm<TStoreDateFilterInput, unknown, TStoreDateFilterOutput>({
    resolver: zodResolver(storeDateFilterSchema),
    defaultValues: {
      storeId: storeId ?? null,
      saleDate: saleDate || getMonthOptions()?.[0].value,
    },
  });

  useEffect(() => {
    form.reset({
      storeId: storeId ?? null,
      saleDate: saleDate || getMonthOptions()?.[0].value || '',
    });
  }, [storeId, saleDate, form]);

  const onSubmit = useCallback(
    (data: TStoreDateFilterOutput) => {
      const parsed = storeDateFilterSchema.safeParse(data);
      if (!parsed.success) return;

      const query = buildQuery(parsed.data);
      push(`${pathname}${query}`);
    },
    [pathname, push],
  );

  const isPending = form.formState.isSubmitting;

  const disabled = useMemo(
    () => !form.formState.isValid || isPending,
    [form.formState.isValid, isPending],
  );

  return { form, onSubmit, resetParams, disabled, isPending };
};

export default useDashboardFilter;
