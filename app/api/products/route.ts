import { getProductByBarcodeInServer } from '@/actions/product.server';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (request: NextRequest) => {
  const searchParams = request.nextUrl.searchParams;
  const barcode = searchParams.get('barcode') ?? '';
  const storeId = searchParams.get('storeId') ?? '';
  const productId = searchParams.get('productId') ?? '';

  try {
    if (!storeId)
      return new Response(
        JSON.stringify({
          message: '매장정보가 존재하지 않습니다.',
        }),
        { status: 400 },
      );

    if (!barcode && !productId)
      return new Response(
        JSON.stringify({
          message: '바코드 혹은 상품아이디가 존재하지 않습니다.',
        }),
        { status: 400 },
      );

    const data = await getProductByBarcodeInServer({
      barcode,
      storeId: +storeId,
    });
    return NextResponse.json({ data });
  } catch (err: any) {
    return new Response(JSON.stringify({ message: err.message }), {
      status: 500,
    });
  }
};
