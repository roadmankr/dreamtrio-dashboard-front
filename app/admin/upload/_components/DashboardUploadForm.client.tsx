'use client';

import SubmitButton from '@/components/ui/button/submit-button';
import CardWrapper from '@/components/ui/card/card-wrapper';
import ErrorAlert from '@/components/ui/error/error-alert';
import LabelFormField from '@/components/ui/form/label-form-field';
import { UploadIcon } from 'lucide-react';
import { FormProvider } from 'react-hook-form';
import {
  dashboardUploadFileTypeField,
  dashboardUploadPasswordField,
} from '../_config';
import useDashboadUploadForm from '../_hooks/useDashboadUploadForm';

const DashboardUploadForm = () => {
  const { form, onSubmit, rootError, isPending, uploadFileField, disabled } =
    useDashboadUploadForm();

  return (
    <div className='flex w-full max-w-2xl'>
      <CardWrapper>
        <FormProvider {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='flex w-full flex-col gap-3'
          >
            <LabelFormField form={form} {...dashboardUploadFileTypeField} />
            <LabelFormField form={form} {...uploadFileField} />
            <LabelFormField form={form} {...dashboardUploadPasswordField} />
            <SubmitButton
              isPending={isPending}
              disabled={disabled}
              submitIcon={<UploadIcon />}
              submitText='파일 업로드'
            />
            {rootError && <ErrorAlert error={rootError} />}
          </form>
        </FormProvider>
      </CardWrapper>
    </div>
  );
};

export default DashboardUploadForm;
