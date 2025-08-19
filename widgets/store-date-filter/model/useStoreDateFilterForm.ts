'use client';

import { getMonthOptions } from '@/features/sales-date-options/model/lib';
import useStoreOptions from '@/features/store-options/model/useStoreOptions';
import { FormDataType } from '@/shared/types/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { usePathname, useRouter } from 'next/navigation';
import { useCallback, useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { saleDateFormFields, storeFormFields } from './config';
import { storeDateFilterSchema, TStoreDateFilter } from './schema';
import useStoreDateSearchParams from './useStoreDateSearchParams';

const useStoreDateFilterForm = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { data } = useStoreOptions();
  const { storeName, saleDate } = useStoreDateSearchParams();
  const form = useForm<TStoreDateFilter>({
    resolver: zodResolver(storeDateFilterSchema),
    defaultValues: {
      storeName,
      saleDate: saleDate || getMonthOptions()?.[0].value,
    },
  });

  useEffect(() => {
    form.reset({
      storeName,
      saleDate: saleDate || getMonthOptions()?.[0].value || '',
    });
  }, [storeName, saleDate, form]);

  const onSubmit = useCallback(
    (data: TStoreDateFilter) => {
      const sp = new URLSearchParams();

      data.storeName
        ? sp.set('storeName', data.storeName)
        : sp.delete('storeName');
      data.saleDate ? sp.set('saleDate', data.saleDate) : sp.delete('saleDate');

      router.push(`${pathname}?${sp.toString()}`);
    },
    [pathname, router],
  );

  const storeField = useMemo(
    () => ({ ...storeFormFields, options: data }),
    [data],
  );

  const formFields: FormDataType<TStoreDateFilter>[] = useMemo(
    () => [storeField, saleDateFormFields],
    [storeField],
  );

  const disabled = useMemo(
    () => !form.formState.isValid || form.formState.isSubmitting,
    [form.formState.isValid, form.formState.isSubmitting],
  );

  return { form, onSubmit, formFields, disabled };
};

export default useStoreDateFilterForm;
