import { getSalesBreakDownInServer } from '@/actions/sales.server';
import { getErrorMessage } from '@/lib/error';
import type { Dimension } from '@/shared/model/dimension';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (request: NextRequest) => {
  const searchParams = request.nextUrl.searchParams;
  const saleDate = searchParams.get('saleDate') ?? '';
  const storeId = searchParams.get('storeId') ?? '';
  const dimension = (searchParams.get('dimension') as Dimension) ?? '';

  try {
    if (!dimension) throw new Error('타입이 존재하지 않습니다.');
    if (!saleDate) throw new Error('일자가 존재하지 않습니다.');

    const data = await getSalesBreakDownInServer({
      saleDate,
      storeId:
        Number(storeId) && !isNaN(Number(storeId)) ? Number(storeId) : null,
      dimension,
    });
    return NextResponse.json({ data });
  } catch (err: unknown) {
    return new Response(
      JSON.stringify({ message: await getErrorMessage(err) }),
      {
        status: 500,
      },
    );
  }
};

// export const POST = async (request: NextRequest) => {
//   try {
//     const formData = await request.formData();
//     const file = formData.get('file');

//     if (!file) throw new Error('파일 없음');

//     const data = await uploadSalesFile(formData);

//     return NextResponse.json({ data });
//   } catch (error: unknown) {
//     return NextResponse.json(
//       { message: await getErrorMessage(error) },
//       { status: 500 },
//     );
//   }
// };
