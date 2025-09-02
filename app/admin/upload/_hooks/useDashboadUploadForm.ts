import useZodParsErrorHandler from '@/shared/hooks/useZodParsErrorHandler';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCallback, useMemo, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import useDashboardUpload from '../_api/useDashboardUpload';
import { UploadFileMap } from '../_config';
import { dashboardUploadSchema, TDashboardUpload } from '../_schema';
import { validateDashboardUpload } from '../_server/service';

const useDashboadUploadForm = () => {
  const form = useForm<TDashboardUpload>({
    resolver: zodResolver(dashboardUploadSchema),
    defaultValues: {
      uploadType: UploadFileMap.STOCK,
      file: null,
      password: '',
    },
  });
  const [isPending, startTransition] = useTransition();
  const { mutateAsync } = useDashboardUpload();
  const { handlerSafeParse } = useZodParsErrorHandler<TDashboardUpload>();

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

  const disabled = !form.formState.isValid || isPending;

  return { form, onSubmit, rootError, isPending, disabled };
};

export default useDashboadUploadForm;
