import { getErrorMessage } from '@/lib/error';
import { showToastError, showToastSuccess } from '@/lib/toast';
import { ErrorCode } from '@/shared/constants';
import { useMutation } from '@tanstack/react-query';
import { UseFormReturn } from 'react-hook-form';
import { defaultUploadField } from '../_config';
import { TDashboardUpload } from '../_schema';
import { dashboardUpload } from '../actions';

interface Props {
  form: UseFormReturn<TDashboardUpload>;
}

const useDashboardUpload = ({ form }: Props) => {
  return useMutation({
    // mutationFn: ({
    //   uploadType,
    //   formData,
    // }: {
    //   uploadType: UploadFile;
    //   formData: FormData;
    // }) => uploadSalesFile({ uploadType, formData }),
    mutationFn: dashboardUpload,
    onError: async (error) => {
      const description =
        (await getErrorMessage(error)) || ErrorCode.EXCEL_UPLOAD_FAILED;
      showToastError({ description, title: '업로드 실패' });
    },
    onSuccess: () => {
      form.reset(defaultUploadField);
      showToastSuccess({
        description: '업로드에 성공하였습니다.',
        title: '업로드 성공',
      });
    },
  });
};

export default useDashboardUpload;
