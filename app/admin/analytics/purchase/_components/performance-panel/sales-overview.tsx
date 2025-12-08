import Skeleton from '@/app/admin/analytics/purchase/_components/skeleton';
import { salesOverviewFieldConfig } from '@/app/admin/analytics/purchase/_config/performance-field.config';
import {
  PanelCard,
  PanelCardBody,
  PanelCardHeader,
  PanelCardItem,
} from '@/components/ui/card/panel-card';
import { defaultParse } from '@/lib/form';
import { TAnalyzeGradeSales } from '@/shared/types/analyze';
import React from 'react';

const SalesOverview = ({
  data,
  isPending,
}: {
  data?: TAnalyzeGradeSales;
  isPending?: boolean;
}) => {
  return (
    <div className='flex flex-col gap-3'>
      <PanelCard>
        <PanelCardHeader title='매출정보' />
        <PanelCardBody>
          <div className='grid grid-cols-1 gap-4 sm:grid-cols-3 lg:grid-cols-6 xl:grid-cols-3'>
            {salesOverviewFieldConfig.map((kpi) => (
              <PanelCardItem key={kpi.label}>
                <p className='text-xs text-zinc-500'>{kpi.label}</p>
                {isPending ? (
                  <Skeleton />
                ) : (
                  <p className='mt-1 flex h-10 items-center overflow-x-auto text-lg font-semibold tracking-tight text-zinc-900'>
                    {defaultParse(`${data?.[kpi.key]}`, kpi.format) || '-'}
                  </p>
                )}
              </PanelCardItem>
            ))}
          </div>
        </PanelCardBody>
      </PanelCard>
    </div>
  );
};

export default React.memo(SalesOverview);
