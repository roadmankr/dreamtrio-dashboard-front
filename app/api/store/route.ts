import { getStoreListInServer } from '@/actions/store.server';
import { jsonNoStore } from '@/lib/http.server';

export const dynamic = 'force-dynamic';

export const GET = async () => {
  try {
    const data = await getStoreListInServer();
    return jsonNoStore({ data }, { status: 200 });
  } catch (err: any) {
    return jsonNoStore(
      { message: err.message },
      {
        status: 500,
      },
    );
  }
};
