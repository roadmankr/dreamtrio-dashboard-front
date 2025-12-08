import { analyticsColumns } from '@/app/admin/analytics/purchase/_config/table.config';
import {
  PanelCard,
  PanelCardBody,
  PanelCardHeader,
} from '@/components/ui/card/panel-card';
import { CommonDataTable } from '@/components/ui/table/common-data-table';
import { TAnalyzeTableRanking } from '@/shared/types/analyze';

export default function BrandAnalysis({
  rows,
  isPending,
}: {
  rows: TAnalyzeTableRanking[];
  isPending?: boolean;
}) {
  return (
    <PanelCard>
      <PanelCardHeader title='브랜드 분석 TOP 10' />
      <PanelCardBody>
        <div className='max-h-64 min-h-0 overflow-y-auto rounded-xl border border-zinc-100'>
          <CommonDataTable
            rows={rows}
            columns={analyticsColumns}
            getRowId={(row) => row.rank}
            isPending={isPending}
          />
        </div>
      </PanelCardBody>
    </PanelCard>
  );
}
