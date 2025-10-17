'use client';

import { purchaseAnalyticsDateField } from '@/app/admin/analytics/purchase/_config/filter.config';
import usePurchaseAnalyticsFilter from '@/app/admin/analytics/purchase/_hooks/usePurchaseAnalyticsFilter';
import { TPurchaseAnalyticsInputFilter } from '@/app/admin/analytics/purchase/_schema/filter.schema';
import SubmitButton from '@/components/ui/button/submit-button';
import CardWrapper from '@/components/ui/card/card-wrapper';
import LabelFormField from '@/components/ui/form/label-form-field';
import StoreField from '@/features/store-options/ui/StoreField';
import { SearchIcon } from 'lucide-react';
import { FormProvider } from 'react-hook-form';

const PurchaseAnalyticsFilter = () => {
  const { form, onSubmit } = usePurchaseAnalyticsFilter();

  return (
    <CardWrapper containerClassName='h-auto'>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className='flex w-full max-w-xl flex-col gap-3 md:flex-row'>
            <StoreField<TPurchaseAnalyticsInputFilter>
              name='storeId'
              toastOnError={true}
            />
            <LabelFormField
              form={form}
              {...purchaseAnalyticsDateField}
              toastOnError={true}
            />

            <div className='flex items-end'>
              <SubmitButton
                disabled={!form.formState.isValid}
                submitText='검색'
                submitIcon={<SearchIcon />}
              />
            </div>
          </div>
        </form>
      </FormProvider>
    </CardWrapper>
  );
};

export default PurchaseAnalyticsFilter;
