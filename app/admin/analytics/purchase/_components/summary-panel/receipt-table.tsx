import useVoucherAnalyze from '@/app/admin/analytics/purchase/_api/useVoucherAnalyze';
import { summaryPanelColumns } from '@/app/admin/analytics/purchase/_config/table.config';
import useReceiptTableState from '@/app/admin/analytics/purchase/_hooks/useReceiptTableState';
import { performanceAnalyticsStore } from '@/app/admin/analytics/purchase/_store/performance.store';
import { Button } from '@/components/ui/button';
import {
  PanelCard,
  PanelCardBody,
  PanelCardHeader,
} from '@/components/ui/card/panel-card';
import { CommonDataTable } from '@/components/ui/table/common-data-table';
import { TSlip } from '@/shared/types/analyze';
import { ReloadIcon } from '@radix-ui/react-icons';
import { ChartAreaIcon } from 'lucide-react';
import { useEffect } from 'react';
import { useStore } from 'zustand';

export default function ReceiptTable({
  rows,
  storeName,
  isPending,
}: {
  rows: TSlip[];
  storeName: string;
  isPending?: boolean;
}) {
  const setPending = useStore(
    performanceAnalyticsStore,
    (state) => state.setPending,
  );
  const { selection } = useReceiptTableState({ rows });
  const { mutateAsync, isPending: isUpdatePending } = useVoucherAnalyze({
    storeName,
  });

  useEffect(() => {
    setPending?.(isUpdatePending);
  }, [isUpdatePending, setPending]);

  return (
    <PanelCard>
      <div className='flex items-center justify-between py-2 pr-5'>
        <PanelCardHeader title='전표 선택' />
        <Button
          type='button'
          disabled={selection.selected.size === 0 || isUpdatePending}
          aria-disabled={selection.selected.size === 0 || isUpdatePending}
          aria-label='선택된 전표 분석'
          className='cursor-pointer'
          onClick={() => mutateAsync([...selection.selected])}
        >
          {isUpdatePending ? (
            <ReloadIcon className='animate-spin' />
          ) : (
            <ChartAreaIcon />
          )}
          전표 분석
        </Button>
      </div>

      <PanelCardBody className='w-full'>
        <div className='max-h-60 min-h-0 max-w-full overflow-x-auto overflow-y-auto rounded-xl border border-zinc-100'>
          <CommonDataTable
            rows={rows}
            columns={summaryPanelColumns}
            selection={selection}
            getRowId={(row) => row.slipNo}
            isPending={isPending}
            stickyHeader={true}
          />
        </div>
      </PanelCardBody>
    </PanelCard>
  );
}
