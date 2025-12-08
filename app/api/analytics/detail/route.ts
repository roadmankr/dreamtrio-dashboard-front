import { makeAnalyzeDetailFilter } from '@/app/admin/analytics/purchase/_lib/filter.lib';
import { purchaseAnalyticsFilterSchema } from '@/app/admin/analytics/purchase/_schema/filter.schema';
import { getErrorMessage } from '@/lib/error';
import { jsonNoStore } from '@/lib/http.server';
import { requestApiJson } from '@/shared/api/request/request.server';
import { NextRequest } from 'next/server';

export const GET = async (req: NextRequest) => {
  try {
    const storeId = req.nextUrl.searchParams.get('storeId');
    const from = req.nextUrl.searchParams.get('startDate');
    const to = req.nextUrl.searchParams.get('endDate');

    const params = { storeId: Number(storeId), range: { from, to } };
    const result = purchaseAnalyticsFilterSchema.safeParse(params);

    if (!result.success)
      return jsonNoStore(
        { message: result.error.issues[0].message },
        { status: 415 },
      );

    const data = await requestApiJson(
      ...makeAnalyzeDetailFilter('server', result.data),
    );

    return jsonNoStore(data.ok ? data : { message: data.err.message }, {
      status: data.ok ? 200 : (data.err.status ?? 400),
    });
  } catch (err: unknown) {
    const message = await getErrorMessage(err);
    return jsonNoStore({ message }, { status: 500 });
  }
};
