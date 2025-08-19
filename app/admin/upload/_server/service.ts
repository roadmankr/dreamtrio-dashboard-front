'use server';

import { ServerValidationResult } from '@/shared/hooks/useZodParsErrorHandler';
import 'server-only';
import { TDashboardUpload } from '../_schema';

export const validateDashboardUpload = async (
  password: string,
): Promise<ServerValidationResult<TDashboardUpload>> => {
  // const parsed = dashboardUploadSchema.safeParse(data);

  // if (!parsed.success) {
  //   const { fieldErrors, formErrors } = z.flattenError(parsed.error);
  //   const toSingle = (arr?: string[]) => (arr?.length ? arr[0] : undefined);

  //   return {
  //     ok: false,
  //     fieldErrors: Object.fromEntries(
  //       Object.entries(fieldErrors).map(([k, v]) => [
  //         k,
  //         toSingle(v as string[]),
  //       ]),
  //     ) as Partial<Record<FieldPath<TDashboardUpload>, string>>,
  //     formError: toSingle(formErrors),
  //   };
  // }

  const SECRET = process.env.DASHBOARD_UPLOAD_PASSWORD ?? '';
  if (!SECRET || SECRET !== password) {
    return {
      ok: false,
      fieldErrors: { password: '비밀번호가 일치하지 않습니다.' },
    };
  }

  return { ok: true };
};
