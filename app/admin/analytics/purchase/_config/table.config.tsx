import { TAnalyzeTableRanking, TSlip } from '@/shared/types/analyze';
import { ColumnDef } from '@/shared/types/table';

export const summaryPanelColumns: ColumnDef<TSlip>[] = [
  { renderType: 'checkbox', header: '' },
  { renderType: 'text', accessor: 'slipNo', header: '전표별' },
  { renderType: 'text', accessor: 'count', header: '수량', format: 'currency' },
  {
    renderType: 'text',
    accessor: 'supplierSum',
    header: '공급가액',
    format: 'currency',
  },
  {
    renderType: 'text',
    header: '부가세',
    accessor: 'vatSum',
    format: 'currency',
  },
  {
    renderType: 'text',
    header: '합계',
    accessor: 'totalSum',
    format: 'currency',
  },
];

export const analyticsColumns: ColumnDef<TAnalyzeTableRanking>[] = [
  { renderType: 'text', accessor: 'rank', header: '순위' },
  { renderType: 'text', accessor: 'inbound', header: '구매' },
  { renderType: 'text', accessor: 'outbound', header: '판매' },
];
