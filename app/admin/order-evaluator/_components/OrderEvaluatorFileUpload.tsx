'use client';

import SubmitButton from '@/components/ui/button/submit-button';
import CardWrapper from '@/components/ui/card/card-wrapper';
import LabelFormField from '@/components/ui/form/label-form-field';
import PeriodField from '@/features/period-options/ui/PeriodField';
import StoreField from '@/features/store-options/ui/StoreField';
import { UploadIcon } from 'lucide-react';
import { FormProvider } from 'react-hook-form';
import { uploadOrderEvaluatorFileField } from '../_config';
import useOrderEvaluatorFileUpload from '../_hooks/useOrderEvaluatorFileUpload';
import { TOrderUpload } from '../_schema';

const OrderEvaluatorFileUpload = () => {
  const { form, onSubmit, disabled, isPending } = useOrderEvaluatorFileUpload();

  return (
    <CardWrapper containerClassName='h-auto min-h-auto'>
      <FormProvider {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='flex w-full flex-col items-end gap-3 lg:flex-row'
        >
          <div className='flex w-full flex-col gap-3 lg:flex-row'>
            <StoreField<TOrderUpload> name='storeId' />
            <PeriodField<TOrderUpload> name='saleDate' />
          </div>

          <div className='line-clamp-1 w-full truncate whitespace-nowrap'>
            <LabelFormField form={form} {...uploadOrderEvaluatorFileField} />
          </div>

          <SubmitButton
            submitText='발주 평가하기'
            submitIcon={<UploadIcon />}
            disabled={disabled}
            isPending={isPending}
          />
        </form>
      </FormProvider>
    </CardWrapper>
  );
};

export default OrderEvaluatorFileUpload;
