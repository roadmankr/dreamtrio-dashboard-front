import { FormDataType } from '@/shared/types/form';
import { TOrderUpload } from '../_schema';

export const uploadOrderEvaluatorFileField = {
  name: 'file',
  type: 'file',
  label: '업로드 파일',
} as const satisfies FormDataType<TOrderUpload>;
