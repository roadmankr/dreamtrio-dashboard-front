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
          className='flex w-full flex-col items-start gap-3 lg:flex-row'
        >
          <div className='flex w-full flex-col gap-3 lg:flex-row'>
            <StoreField<TOrderUpload> name='storeId' toastOnError={true} />
            <PeriodField<TOrderUpload> name='saleDate' toastOnError={true} />
          </div>

          <div className='line-clamp-1 w-full truncate whitespace-nowrap'>
            <LabelFormField
              form={form}
              {...uploadOrderEvaluatorFileField}
              toastOnError={true}
            />
          </div>

          <div className='flex h-full items-end'>
            <SubmitButton
              submitText='발주 평가하기'
              submitIcon={<UploadIcon />}
              disabled={disabled}
              isPending={isPending}
            />
          </div>
        </form>
      </FormProvider>
    </CardWrapper>
  );
};

export default OrderEvaluatorFileUpload;
