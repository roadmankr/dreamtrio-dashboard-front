import useZodParsErrorHandler from '@/shared/hooks/useZodParsErrorHandler';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCallback, useEffect, useMemo, useTransition } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import useDashboardUpload from '../_api/useDashboardUpload';
import {
  dashboardUploadFileField,
  dashboardUploadFileTypeConfig,
  defaultUploadField,
} from '../_config';
import { dashboardUploadSchema, TDashboardUpload } from '../_schema';
import { validateDashboardUpload } from '../_server/service';

const useDashboadUploadForm = () => {
  const form = useForm<TDashboardUpload>({
    resolver: zodResolver(dashboardUploadSchema),
    defaultValues: defaultUploadField,
  });
  const [isPending, startTransition] = useTransition();
  const { mutateAsync } = useDashboardUpload({ form });
  const { handlerSafeParse } = useZodParsErrorHandler<TDashboardUpload>();
  const [uploadType] = useWatch({
    control: form.control,
    name: ['uploadType'],
  });

  useEffect(() => {
    form.setValue('file', null);
  }, [uploadType]);

  const onSubmit = useCallback(
    async (data: TDashboardUpload) => {
      form.clearErrors();
      startTransition(async () => {
        try {
          const result = await validateDashboardUpload(data.password);

          if (!result.ok) return handlerSafeParse({ form, result });

          const formData = new FormData();
          formData.append('file', data.file);

          await mutateAsync({ uploadType: data.uploadType, formData });
        } catch (err: unknown) {
          console.error(err);
        }
      });
    },
    [handlerSafeParse],
  );

  const rootError = useMemo(
    () => form.formState.errors.root?.message,
    [form.formState.errors.root?.message],
  );
  const uploadFileField = useMemo(() => {
    return {
      ...dashboardUploadFileField,
      accept: dashboardUploadFileTypeConfig[uploadType].join(','),
    };
  }, [uploadType]);

  const disabled = !form.formState.isValid || isPending;

  return { form, onSubmit, rootError, isPending, disabled, uploadFileField };
};

export default useDashboadUploadForm;
