import { analyticsColumns } from '@/app/admin/analytics/purchase/_config/table.config';
import {
  PanelCard,
  PanelCardBody,
  PanelCardHeader,
} from '@/components/ui/card/panel-card';
import { CommonDataTable } from '@/components/ui/table/common-data-table';
import { TAnalyzeTableRanking } from '@/shared/types/analyze';

export default function GenderAnalysis({
  rows,
  isPending,
}: {
  rows: TAnalyzeTableRanking[];
  isPending?: boolean;
}) {
  return (
    <PanelCard>
      <PanelCardHeader title='성별 분석' />
      <PanelCardBody>
        <CommonDataTable
          rows={rows}
          columns={analyticsColumns}
          getRowId={(row) => row.rank}
          isPending={isPending}
        />
      </PanelCardBody>
    </PanelCard>
  );
}
