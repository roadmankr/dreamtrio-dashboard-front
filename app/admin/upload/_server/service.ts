'use server';

import { ServerValidationResult } from '@/shared/hooks/useZodParsErrorHandler';
import 'server-only';
import { TDashboardUpload } from '../_schema';

export const validateDashboardUpload = async (
  password: string,
): Promise<ServerValidationResult<TDashboardUpload>> => {
  const SECRET = process.env.DASHBOARD_UPLOAD_PASSWORD ?? '';

  if (!SECRET || SECRET !== password) {
    return {
      ok: false,
      fieldErrors: { password: '비밀번호가 일치하지 않습니다.' },
    };
  }

  return { ok: true };
};
