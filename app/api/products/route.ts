import { getProductByBarcodeInServer } from '@/entities/product/api/product.server';
import { productListFilterSchema } from '@/entities/product/model/list.schema';
import { getErrorMessage } from '@/lib/error';
import { jsonNoStore } from '@/lib/http.server';
import { NextRequest } from 'next/server';

export const dynamic = 'force-dynamic';

export const GET = async (request: NextRequest) => {
  const searchParams = request.nextUrl.searchParams;
  const barcode = searchParams.get('barcode') ?? '';
  const storeId = searchParams.get('storeId') ?? '';

  try {
    const result = productListFilterSchema.safeParse({ barcode, storeId });

    if (!result.success)
      return jsonNoStore(
        { message: result.error.issues[0].message },
        { status: 415 },
      );

    const data = await getProductByBarcodeInServer(result.data);
    return jsonNoStore(data.ok ? data : { message: data.err.message }, {
      status: data.ok ? 200 : (data.err.status ?? 400),
    });
  } catch (err: unknown) {
    const message = await getErrorMessage(err);
    return jsonNoStore({ message }, { status: 500 });
  }
};
