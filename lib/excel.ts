export type ExcelRow = Record<string, any>;
export type ExcelExportOptions = {
  filename?: string; // 기본: export_YYYY-MM-DD.xlsx
  sheetName?: string; // 기본: "Sheet1"
  columns?: string[]; // 헤더/열 순서 고정
  numberFormats?: Record<string, string>; // { "단가": "#,##0", "합계": "#,##0" }
  autoWidth?: boolean; // 자동 열 너비
};

export async function exportToXlsx(
  rows: ExcelRow[],
  opts: ExcelExportOptions = {},
) {
  if (!rows?.length) throw new Error('EMPTY_ROWS');

  // ✔ 필요할 때만 로드 → 번들 최소화
  const XLSX = await import('xlsx');

  const header = opts.columns ?? Object.keys(rows[0]);
  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.json_to_sheet(rows, { header: header as string[] });

  // 숫자 서식 적용
  if (ws['!ref'] && opts.numberFormats) {
    const range = XLSX.utils.decode_range(ws['!ref']);
    for (let r = 1; r <= range.e.r; r++) {
      for (const [colName, fmt] of Object.entries(opts.numberFormats)) {
        const c = header.indexOf(colName);
        if (c < 0) continue;
        const addr = XLSX.utils.encode_cell({ r, c });
        const cell = ws[addr];
        if (cell && typeof cell.v === 'number') {
          cell.t = 'n';
          cell.z = fmt;
        }
      }
    }
  }

  // 자동 열 너비
  if (opts.autoWidth) {
    ws['!cols'] = header.map((key) => {
      const maxLen = Math.max(
        String(key).length,
        ...rows.map((r) => String((r as any)[key] ?? '').length),
      );
      return { wch: Math.min(Math.max(maxLen + 2, 8), 40) };
    });
  }

  XLSX.utils.book_append_sheet(wb, ws, opts.sheetName ?? 'Sheet1');
  const filename =
    opts.filename ?? `export_${new Date().toISOString().slice(0, 10)}.xlsx`;

  XLSX.writeFile(wb, filename);
}
