'use client';

import SubmitButton from '@/components/ui/button/submit-button';
import CardWrapper from '@/components/ui/card/card-wrapper';
import ErrorAlert from '@/components/ui/error/error-alert';
import { Form } from '@/components/ui/form';
import LabelFormField from '@/components/ui/form/label-form-field';
import { UploadIcon } from 'lucide-react';
import {
  dashboardUploadFileField,
  dashboardUploadFileTypeField,
  dashboardUploadPasswordField,
} from '../_config';
import useDashboadUploadForm from '../_hooks/useDashboadUploadForm';

const DashboardUploadForm = () => {
  const { form, onSubmit, rootError, isPending } = useDashboadUploadForm();

  return (
    <div className='flex w-full max-w-2xl'>
      <CardWrapper>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='flex w-full flex-col gap-3'
          >
            <LabelFormField form={form} {...dashboardUploadFileTypeField} />
            <LabelFormField form={form} {...dashboardUploadFileField} />
            <LabelFormField form={form} {...dashboardUploadPasswordField} />
            <SubmitButton
              isPending={isPending}
              submitIcon={<UploadIcon />}
              submitText='파일 업로드'
            />
            {rootError && <ErrorAlert error={rootError} />}
          </form>
        </Form>
      </CardWrapper>
    </div>
  );
};

export default DashboardUploadForm;
