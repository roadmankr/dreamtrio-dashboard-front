'use server';

import { getErrorMessage } from '@/lib/error';
import { apis } from '@/shared/api/endpoints';
import { serverKy } from '@/shared/api/ky/ky.server';
import {
  TSalesBreakDownQuery,
  TSalesBreakDownResponse,
} from '@/shared/types/sales';

export const getSalesBreakDownInServer = async ({
  saleDate,
  storeName,
  dimension,
}: TSalesBreakDownQuery) => {
  try {
    const result = await serverKy(
      ...apis.sales.getSalesBreakDown({ saleDate, storeName, dimension }),
    ).json<TSalesBreakDownResponse[]>();

    return result;
  } catch (err: unknown) {
    throw new Error(await getErrorMessage(err));
  }
};

// const ApiPathKey = {
//   server: {},
//   client:{},
// };

// export const fetchers = {
//   async universal<T>(key: keyof typeof ApiPathKey): Promise< KyResponse<T>> {
//     if (typeof window === 'undefined') {
//       const data = await serverKy.get<T>(API_PATH[key].server); // 외부로 직행
//       return data;
//     }
//     const res = await ky<T>(`/api${API_PATH[key].client}`, {
//       credentials: 'include',
//     }); // 내부 프록시
//     if (!res.ok) throw new Error(`${key} ${res.status}`);
//     return res;
//   },
// };
