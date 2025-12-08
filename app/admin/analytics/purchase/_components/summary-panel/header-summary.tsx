import Skeleton from '@/app/admin/analytics/purchase/_components/skeleton';
import { summaryFieldConfig } from '@/app/admin/analytics/purchase/_config/summary-field.config';
import {
  PanelCard,
  PanelCardBody,
  PanelCardHeader,
} from '@/components/ui/card/panel-card';
import { defaultParse } from '@/lib/form';
import { cn } from '@/lib/utils';
import { TAnalyzeDetailSummary } from '@/shared/types/analyze';

export default function HeaderSummary({
  summary,
  errMsg,
  isPending,
}: {
  errMsg?: Partial<Record<keyof TAnalyzeDetailSummary, string>>;
  summary?: TAnalyzeDetailSummary;
  isPending?: boolean;
}) {
  return (
    <PanelCard>
      <PanelCardHeader
        title='매장 요약'
        subtitle='이번 달 구매/매출/이익 요약'
      />
      <PanelCardBody>
        <div className='grid grid-cols-1 gap-4 sm:grid-cols-3 lg:grid-cols-6 xl:grid-cols-3'>
          {summaryFieldConfig.map((kpi) => {
            const key = kpi.key;
            const value = summary?.[key];
            const errorMessage = errMsg && key in errMsg ? errMsg[key] : '';
            const parseValue =
              (kpi.format && value
                ? defaultParse(String(value), kpi.format)
                : value) || '-';

            return (
              <div
                key={kpi.label}
                className='rounded-xl border border-zinc-200/60 bg-gradient-to-b from-white to-zinc-50/40 p-4'
              >
                <p className='text-xs text-zinc-500'>{kpi.label}</p>
                {isPending ? (
                  <Skeleton />
                ) : (
                  <p
                    className={cn(
                      `mt-1 flex h-10 items-center overflow-x-auto text-lg font-semibold tracking-tight text-zinc-900`,
                      errorMessage && 'text-destructive text-sm',
                    )}
                  >
                    {errorMessage || parseValue}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </PanelCardBody>
    </PanelCard>
  );
}
