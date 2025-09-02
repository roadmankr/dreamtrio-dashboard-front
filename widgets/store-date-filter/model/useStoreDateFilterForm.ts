'use client';

import { getMonthOptions } from '@/features/sales-date-options/model/lib';
import useStoreOptions from '@/features/store-options/model/useStoreOptions';
import { buildQuery } from '@/lib/http';
import { FormDataType } from '@/shared/types/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { usePathname, useRouter } from 'next/navigation';
import { useCallback, useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { storeDateFormFields } from './config';
import { storeDateFilterSchema, TStoreDateFilter } from './schema';
import useStoreDateSearchParams from './useStoreDateSearchParams';

const useStoreDateFilterForm = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { storeOptions } = useStoreOptions({ isNeedTotalOption: true });
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
      router.push(`${pathname}${query}`);
    },
    [pathname, router],
  );

  const storeField = useMemo(
    () => ({ ...storeDateFormFields.storeId, options: storeOptions }),
    [storeOptions],
  );

  const formFields: FormDataType<TStoreDateFilter>[] = useMemo(
    () => [storeField, storeDateFormFields.saleDate],
    [storeField],
  );

  const disabled = useMemo(
    () => !form.formState.isValid || form.formState.isSubmitting,
    [form.formState.isValid, form.formState.isSubmitting],
  );

  return { form, onSubmit, formFields, disabled, resetParams };
};

export default useStoreDateFilterForm;
