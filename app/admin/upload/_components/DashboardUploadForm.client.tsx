"use client";

import { Form } from '@/components/ui/form';
import LabelFormField from '@/components/ui/form/label-form-field';
import { dashboardUploadFileField, dashboardUploadPasswordField } from '../_config';
import useDashboadUploadForm from '../_hooks/useDashboadUploadForm';

const DashboardUploadForm = () => {
  const { form, onSubmit} = useDashboadUploadForm();
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <LabelFormField form={form} {...dashboardUploadFileField} />
        <LabelFormField form={form} {...dashboardUploadPasswordField} />
      </form>
    </Form>
  )
}

export default DashboardUploadForm