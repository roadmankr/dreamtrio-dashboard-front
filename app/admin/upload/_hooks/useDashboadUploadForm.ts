import useZodParsErrorHandler from '@/shared/hooks/useZodParsErrorHandler';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCallback, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import useDashboardUpload from '../_api/useDashboardUpload';
import { dashboardUploadSchema, TDashboardUpload } from '../_schema';
import { validateDashboardUpload } from '../_server/service';

const useDashboadUploadForm = () => {
  const form = useForm<TDashboardUpload>({
    resolver: zodResolver(dashboardUploadSchema),
    defaultValues: {
      file: null,
      password: '',
    },
  });
  const { mutateAsync } = useDashboardUpload();
  const { handlerSafeParse } = useZodParsErrorHandler<TDashboardUpload>();

  const onSubmit = useCallback(
    async (data: TDashboardUpload) => {
      form.clearErrors();
      const result = await validateDashboardUpload(data.password);

      if (!result.ok) return handlerSafeParse({ form, result });

      const formData = new FormData();
      formData.append('file', data.file);
      // await mutateAsync(formData);
    },
    [handlerSafeParse],
  );

  const rootError = useMemo(
    () => form.formState.errors.root?.message,
    [form.formState.errors.root?.message],
  );

  return { form, onSubmit, rootError };
};

export default useDashboadUploadForm;
