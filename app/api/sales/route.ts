import {
  getSalesBreakDownInServer,
  uploadSalesFile,
} from '@/actions/sales.server';
import {
  DashboardUploadFileMime,
  UploadFile,
} from '@/app/admin/upload/_config';
import { getErrorMessage } from '@/lib/error';
import { validateFile } from '@/lib/file.server';
import { jsonNoStore } from '@/lib/http.server';
import type { Dimension } from '@/shared/model/dimension';
import { NextRequest } from 'next/server';

export const dynamic = 'force-dynamic';

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

    return jsonNoStore({ data }, { status: 200 });
  } catch (err: unknown) {
    return jsonNoStore(
      { message: await getErrorMessage(err) },
      { status: 500 },
    );
  }
};

export async function POST(req: NextRequest) {
  const form = await req.formData();
  const file = form.get('file');
  const uploadType = form.get('uploadType') as UploadFile;

  const fileType = DashboardUploadFileMime[uploadType];
  const validate = validateFile(file, fileType);
  if (!validate.result)
    return jsonNoStore({ message: validate.message }, { status: 415 });

  const params = {
    uploadType,
    formData: form,
  };

  try {
    const data = await uploadSalesFile(params);
    return jsonNoStore({ data }, { status: 200 });
  } catch (err: unknown) {
    return jsonNoStore(
      { message: await getErrorMessage(err) },
      { status: 500 },
    );
  }
}

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
