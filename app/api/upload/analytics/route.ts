import { uploadOrderEvaluatorFileInServer } from '@/actions/upload.server';
import dayjs from '@/lib/dayjs';
import { getErrorMessage } from '@/lib/error';
import { validateFile } from '@/lib/file.server';
import { jsonNoStore } from '@/lib/http.server';
import { NextRequest } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  const form = await req.formData();
  const file = form.get('file');
  const storeId = form.get('storeId');
  const saleDate = String(form.get('saleDate'));
  // const storeId = req.nextUrl.searchParams.get('storeId');
  // const saleDate = req.nextUrl.searchParams.get('saleDate');

  try {
    const validate = validateFile(file);
    if (!validate.result) {
      console.log(validate);
      return jsonNoStore({ message: validate.message }, { status: 415 });
    }

    if (!storeId || isNaN(+storeId))
      return jsonNoStore({ message: '매장정보가 없습니다' }, { status: 400 });

    if (!saleDate || !dayjs(saleDate).isValid())
      return jsonNoStore({ message: '기간이 없습니다' }, { status: 400 });

    const params = {
      saleDate,
      storeId: +storeId,
      formData: form,
    };
    const data = await uploadOrderEvaluatorFileInServer(params);
    return jsonNoStore({ data }, { status: 200 });
  } catch (err: unknown) {
    return jsonNoStore(
      { message: await getErrorMessage(err) },
      { status: 500 },
    );
  }
}

// export async function POST(req: Request) {
//   const form = await req.formData(); // 1~2MB 등 소용량 OK
//   const { fileId, filename } = await uploadExcelToBackend(form);

//   // 업로드 후 즉시 결과 파일 받기
//   const dl = await downloadResultFromBackend(fileId);
//   const name = filename ?? 'result.xlsx';
//   const ct = dl.headers.get('content-type') ?? 'application/octet-stream';
//   const dispo = `attachment; filename="${encodeURIComponent(name)}"; filename*=UTF-8''${encodeURIComponent(name)}`;

//   return new Response(dl.body, {
//     headers: {
//       'Content-Type': ct,
//       'Content-Disposition': dispo,
//       'Cache-Control': 'no-store, max-age=0',
//     },
//   });
// }
