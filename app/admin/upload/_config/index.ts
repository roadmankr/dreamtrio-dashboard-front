import { FormDataType } from '@/shared/types/form';
import { TDashboardUpload } from '../_schema';

export const uploadFileValues = ['stock', 'sales'] as const;
export type UploadFile = (typeof uploadFileValues)[number];
export const UploadFileMap = {
  STOCK: 'stock',
  SALES: 'sales',
} as const satisfies Record<string, UploadFile>;

export const dashboardUploadFileTypeField: FormDataType<TDashboardUpload> = {
  name: 'uploadType',
  type: 'select',
  options: [
    { label: '재고', value: UploadFileMap.STOCK },
    { label: '매출', value: UploadFileMap.SALES },
  ],
  required: true,
  label: '업로드 타입',
  defaultValue: UploadFileMap.STOCK,
};

export const dashboardUploadFileField: FormDataType<TDashboardUpload> = {
  name: 'file',
  type: 'file',
  required: true,
  label: '업로드 파일',
} as const;

export const dashboardUploadPasswordField: FormDataType<TDashboardUpload> = {
  name: 'password',
  type: 'password',
  label: '비밀번호 입력',
} as const;
