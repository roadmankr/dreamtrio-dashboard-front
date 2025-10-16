import { getStoreDetailInServer } from '@/entities/stores/api/store.server';
import { storeIdRequiredSchema } from '@/entities/stores/model/id.schema';
import { getErrorMessage } from '@/lib/error';
import { jsonNoStore } from '@/lib/http.server';
import { NextRequest } from 'next/server';

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ storeId: string }> },
) {
  try {
    const { storeId } = await params;
    const result = storeIdRequiredSchema.safeParse(storeId);

    if (!result.success)
      return jsonNoStore(
        { message: result.error.issues[0].message },
        { status: 415 },
      );

    const data = await getStoreDetailInServer({ storeId: result.data });

    return jsonNoStore({ data }, { status: 200 });
  } catch (err: unknown) {
    return jsonNoStore(
      { message: await getErrorMessage(err) },
      { status: 500 },
    );
  }
}
