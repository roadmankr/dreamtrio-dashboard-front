import { getProductByBarcodeInServer } from '@/actions/product.server';
import { getErrorMessage } from '@/lib/error';
import { jsonNoStore } from '@/lib/http.server';
import { NextRequest } from 'next/server';

export const dynamic = 'force-dynamic';

export const GET = async (request: NextRequest) => {
  const searchParams = request.nextUrl.searchParams;
  const barcode = searchParams.get('barcode') ?? '';
  const storeId = searchParams.get('storeId') ?? '';
  const productId = searchParams.get('productId') ?? '';

  try {
    if (!storeId)
      return jsonNoStore(
        { message: '매장정보가 존재하지 않습니다' },
        { status: 400 },
      );

    if (!barcode && !productId)
      return jsonNoStore(
        { message: '바코드 혹은 상품아이디가 존재하지 않습니다' },
        { status: 400 },
      );

    const data = await getProductByBarcodeInServer({
      barcode,
      storeId: +storeId,
    });
    return jsonNoStore({ data }, { status: 200 });
  } catch (err: unknown) {
    const message = await getErrorMessage(err);
    return jsonNoStore({ message }, { status: 500 });
  }
};
