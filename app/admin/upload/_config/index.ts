import { FormDataType } from "@/shared/types/form";
import { TDashboardUpload } from "../_schema";



export const dashboardUploadFileField: FormDataType<TDashboardUpload> = {
  name: 'file',
  type: 'file',
  required: true,
  label: '업로드 파일'
} as const;

export const dashboardUploadPasswordField: FormDataType<TDashboardUpload> = {
  name: 'password',
  type: 'password',
  label: '비밀번호 입력'
} as const;