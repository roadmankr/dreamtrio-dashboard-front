import { showToastError } from '@/lib/toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import useUploadOrderEvaluatorFile from '../_api/useUploadOrderEvaluatorFile';
import { orderEvaluatorFileUploadSchema, TOrderUpload } from '../_schema';
import { orderAnalyticsStore } from '../_store';

const useOrderEvaluatorFileUpload = () => {
  const setUploading = orderAnalyticsStore((state) => state.setUploading);
  const { mutateAsync, isPending } = useUploadOrderEvaluatorFile();
  const form = useForm<TOrderUpload>({
    mode: 'onChange',
    resolver: zodResolver(orderEvaluatorFileUploadSchema),
    defaultValues: {
      storeId: null,
      saleDate: '',
      file: null,
    },
  });

  const onSubmit = async (data: TOrderUpload) => {
    if (!data.storeId) {
      showToastError({ description: '매장이 존재하지 않습니다' });
      return;
    }

    const params = {
      storeId: data.storeId,
      saleDate: data.saleDate,
    };
    const formData = new FormData();
    formData.append('file', data.file);

    await mutateAsync({ ...params, formData });
  };

  useEffect(() => {
    setUploading(isPending);
  }, [setUploading, isPending]);

  const disabled = isPending || !form.formState.isValid;

  return { form, onSubmit, disabled, isPending };
};

export default useOrderEvaluatorFileUpload;
