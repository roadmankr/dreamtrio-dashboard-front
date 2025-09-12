import { getStoreDetailInServer } from '@/actions/store.server';
import { getErrorMessage } from '@/lib/error';
import { jsonNoStore } from '@/lib/http.server';
import { NextRequest } from 'next/server';

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ storeId: string }> },
) {
  try {
    const { storeId } = await params;

    const id = Number(storeId);
    if (!Number.isFinite(id)) {
      return jsonNoStore(
        { message: '매장아이디가 존재하지 않습니다' },
        { status: 400 },
      );
    }

    const data = await getStoreDetailInServer({ storeId: id });
    return jsonNoStore({ data }, { status: 200 });
  } catch (err: unknown) {
    return jsonNoStore(
      { message: await getErrorMessage(err) },
      { status: 500 },
    );
  }
}
