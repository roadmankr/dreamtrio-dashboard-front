import { getStoreListInServer } from '@/entities/stores/api/store.server';
import { getErrorMessage } from '@/lib/error';
import { jsonNoStore } from '@/lib/http.server';

export const dynamic = 'force-dynamic';

export const GET = async () => {
  try {
    const result = await getStoreListInServer();

    return jsonNoStore(result.ok ? result : { message: result.err.message }, {
      status: result.ok ? 200 : (result.err.status ?? 400),
    });
  } catch (err: unknown) {
    const message = await getErrorMessage(err);
    return jsonNoStore(
      { message },
      {
        status: 500,
      },
    );
  }
};
