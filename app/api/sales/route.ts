import { uploadSalesFile } from '@/app/admin/upload/_actions';
import {
  DashboardUploadFileMime,
  UploadFile,
} from '@/app/admin/upload/_config';
import { getSalesBreakDownInServer } from '@/entities/sales/api/sales.server';
import { salesListFilterSchema } from '@/entities/sales/model/list-filter.schema';
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
    const params = { saleDate, storeId, dimension };
    const result = salesListFilterSchema.safeParse(params);

    if (!result.success)
      return jsonNoStore(
        { message: result.error.issues[0].message },
        { status: 415 },
      );

    const data = await getSalesBreakDownInServer(result.data);

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
