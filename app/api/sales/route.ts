import { getSalesBreakDownInServer } from '@/actions/sales.server';
import { DIMENSION } from '@/shared/types/sales';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (request: NextRequest) => {
  const searchParams = request.nextUrl.searchParams;
  const saleDate = searchParams.get('saleDate') ?? '';
  const storeName = searchParams.get('storeName') ?? '';
  const dimension = (searchParams.get('dimension') as DIMENSION) ?? '';

  try {
    if (!dimension) throw new Error('타입이 존재하지 않습니다.');
    if (!saleDate) throw new Error('일자가 존재하지 않습니다.');

    const data = await getSalesBreakDownInServer({
      saleDate,
      storeName,
      dimension,
    });
    return NextResponse.json({ data });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
    });
  }
};
