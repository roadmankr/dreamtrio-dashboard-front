import {
  EXCEL_VALID_EXTENSIONS,
  ZIP_VALID_EXTENSIONS,
} from '@/shared/constants';
import { FileTypeMap, TFileValue } from '@/shared/model/file';
import { FormDataType } from '@/shared/types/form';
import { TDashboardUpload } from '../_schema';

export const uploadFileValues = ['stock', 'sales', 'stock/zip'] as const;
export type UploadFile = (typeof uploadFileValues)[number];

export const UploadFileMap = {
  STOCK: 'stock',
  STOCK_ZIP: 'stock/zip',
  SALES: 'sales',
} as const satisfies Record<string, UploadFile>;

export const DashboardUploadFileMime = {
  [UploadFileMap.SALES]: FileTypeMap.EXCEL,
  [UploadFileMap.STOCK]: FileTypeMap.EXCEL,
  [UploadFileMap.STOCK_ZIP]: FileTypeMap.ZIP,
} as const satisfies Record<UploadFile, TFileValue>;

export const dashboardUploadFileTypeField: FormDataType<TDashboardUpload> = {
  name: 'uploadType',
  type: 'select',
  options: [
    { label: '재고 (엑셀형식)', value: UploadFileMap.STOCK },
    { label: '재고 (Zip형식)', value: UploadFileMap.STOCK_ZIP },
    { label: '매출', value: UploadFileMap.SALES },
  ],
  required: true,
  label: '업로드 타입',
  defaultValue: UploadFileMap.STOCK,
};

export const dashboardUploadFileTypeConfig = {
  [UploadFileMap.STOCK]: EXCEL_VALID_EXTENSIONS,
  [UploadFileMap.STOCK_ZIP]: ZIP_VALID_EXTENSIONS,
  [UploadFileMap.SALES]: EXCEL_VALID_EXTENSIONS,
} as const satisfies Record<
  (typeof UploadFileMap)[keyof typeof UploadFileMap],
  string[]
>;

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

export const defaultUploadField = {
  uploadType: UploadFileMap.STOCK,
  file: null,
  password: '',
} as const;
