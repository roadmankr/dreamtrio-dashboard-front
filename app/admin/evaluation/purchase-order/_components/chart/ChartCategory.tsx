import { PurchaseByCategory } from '@/app/admin/evaluation/purchase-order/_components/PurchaseMonthlyOverview';
import {
  PanelCard,
  PanelCardBody,
  PanelCardHeader,
} from '@/components/ui/card/panel-card';
import BarChart from '@/components/ui/charts/bar-chart/bar-chart';

interface Props {
  data: PurchaseByCategory[];
  title: string;
}

const ChartCategory = ({ title, data }: Props) => {
  return (
    <PanelCard>
      <PanelCardHeader title={title} />
      <PanelCardBody>
        {/* <PanelCardItem> */}
        <BarChart<PurchaseByCategory>
          xKey={'category'}
          data={data}
          tooltipFormatter={(value, name) => {
            return [`${value.toLocaleString()}`, name];
          }}
          series={[
            {
              labelPosition: 'top',
              key: 'amount',
              name: '구매량',
              stackId: 's',
              fill: '#64748B',
              // fill: [
              //   '#3B82F6',
              //   '#14B8A6',
              //   '#8B5CF6',
              //   '#F59E0B',
              //   '#EF4444',
              //   '#10B981',
              //   '#64748B',
              // ],
              radius: [8, 8, 0, 0],
            },
          ]}
        />
        {/* </PanelCardItem> */}
      </PanelCardBody>
    </PanelCard>
  );
};

export default ChartCategory;
