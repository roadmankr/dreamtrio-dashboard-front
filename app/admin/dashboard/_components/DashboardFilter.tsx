'use client';

import ResetButton from '@/components/ui/button/reset-button';
import SubmitButton from '@/components/ui/button/submit-button';
import CardWrapper from '@/components/ui/card/card-wrapper';
import PeriodField from '@/features/period-options/ui/PeriodField';
import StoreField from '@/features/store-options/ui/StoreField';
import { SearchIcon } from 'lucide-react';
import { FormProvider } from 'react-hook-form';
import useDashboardFilter from '../_hooks/useDashboardFilter';
import { TStoreDateFilter } from '../_schema/dashboard.schema';

const DashboardFilter = () => {
  const { form, onSubmit, resetParams, disabled } = useDashboardFilter();

  return (
    <CardWrapper className='flex max-w-3xl'>
      <FormProvider {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='flex w-full flex-col items-end gap-3 md:flex-row'
        >
          <StoreField<TStoreDateFilter> name='storeId' />
          <PeriodField<TStoreDateFilter> name='saleDate' />

          <div className='flex flex-row gap-2'>
            <ResetButton onClick={resetParams} />
            <SubmitButton
              disabled={disabled}
              submitText='검색'
              submitIcon={<SearchIcon />}
            />
          </div>
        </form>
      </FormProvider>
    </CardWrapper>
  );
};

export default DashboardFilter;
