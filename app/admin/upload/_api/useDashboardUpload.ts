import { getErrorMessage } from '@/lib/error';
import { showToastError, showToastSuccess } from '@/lib/toast';
import { ErrorCode } from '@/shared/constants';
import { ROUTES } from '@/shared/constants/urls';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { dashboardUpload } from '../actions';

const useDashboardUpload = () => {
  const router = useRouter();
  const [_, startTransition] = useTransition();

  return useMutation({
    mutationFn: (formData: FormData) => dashboardUpload(formData),
    onError: async (error) => {
      const description =
        (await getErrorMessage(error)) || ErrorCode.EXCEL_UPLOAD_FAILED;
      showToastError({ description, title: '업로드 실패' });
    },
    onSuccess: () => {
      showToastSuccess({
        description: '업로드에 성공하였습니다.',
        title: '업로드 성공',
      });
      setTimeout(() => {
        startTransition(() => router.push(ROUTES.DASHBOARD));
      }, 500);
    },
  });
};

export default useDashboardUpload;
