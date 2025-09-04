import { nf } from '@/lib/form';
import { formatCurrency } from '@/lib/format';
import { TSalesBreakDownResponse } from '@/shared/types/sales';
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';
import { pichartCololrsConfig } from '../../_config';
import usePieChartState from '../../_model/usePieChartState';
import PieChartLegend from './PieChartLegend.component';

const RAD = Math.PI / 180;

const renderLeaderLabel = (props: any) => {
  const { cx, cy, midAngle, outerRadius, value, index, name } = props;
  const color = pichartCololrsConfig[index % pichartCololrsConfig.length];

  const sin = Math.sin(-RAD * midAngle);
  const cos = Math.cos(-RAD * midAngle);

  const r1 = outerRadius + 6;
  const r2 = outerRadius + 22; // 중간 지점 더 멀리
  const sx = cx + r1 * cos;
  const sy = cy + r1 * sin;

  // 원래 mx,my
  const mx = cx + r2 * cos;
  let my = cy + r2 * sin;

  // y 보정: sin 방향(위/아래)으로 추가 오프셋
  // 값 키워줄수록 위아래로 꺾임
  my = my - 12 * Math.sign(sin);

  const ex = mx + (cos >= 0 ? 12 : -12);
  const ey = my;

  const anchor = cos >= 0 ? 'start' : 'end';

  return (
    <g>
      <path
        d={`M${sx},${sy} L${mx},${my} L${ex},${ey}`}
        stroke={color}
        fill='none'
      />
      <circle cx={ex} cy={ey} r={2} fill={color} />
      <text
        x={ex + (cos >= 0 ? 4 : -4)}
        y={ey}
        textAnchor={anchor}
        dominantBaseline='central'
        fill={color}
        fontSize={13}
        fontWeight={600}
      >
        {`${name} : ${formatCurrency(value ?? 0)}`}
      </text>
    </g>
  );
};

export default function DashboardPieChart({
  data,
}: {
  data?: TSalesBreakDownResponse[];
}) {
  const { sideMargin, colorsByKey } = usePieChartState({ data });

  return (
    <div className='relative grid h-full w-full'>
      <div className='[grid-area:1/1] sm:h-auto' aria-hidden />

      <div className='w-full max-w-2xl p-2 [grid-area:1/1] sm:p-3'>
        <ResponsiveContainer width='100%' className={'aspect-square'}>
          <PieChart margin={{ left: sideMargin, right: sideMargin }}>
            {/* <PieChart> */}
            <Pie
              data={data}
              cx='50%'
              cy='50%'
              dataKey='totalPrice'
              outerRadius='60%'
              paddingAngle={1.5}
              minAngle={2}
              label={renderLeaderLabel}
              labelLine={false}
            >
              {data?.map((_, i) => (
                <Cell
                  key={i}
                  fill={pichartCololrsConfig[i % pichartCololrsConfig.length]}
                />
              ))}
            </Pie>

            <Tooltip
              formatter={(value, ...props) => {
                const key = props?.[0];
                const color = colorsByKey?.find(
                  (color) => color.key === key,
                )?.color;

                return [
                  <span
                    key={key}
                    className='text-sm font-semibold'
                    style={{ color }}
                  >
                    {key}
                    <strong className='ml-2 text-sm text-neutral-700'>
                      {nf.format(Number(value ?? 0))}
                    </strong>
                  </span>,
                ];
              }}
              // separator=': '
              contentStyle={{ borderRadius: 8 }}
            />

            <Legend
              verticalAlign='bottom'
              align='center'
              iconType='circle'
              iconSize={10}
              content={() => <PieChartLegend data={data} />}
            />
          </PieChart>
        </ResponsiveContainer>
        {/* </div> */}
      </div>
    </div>
  );
}
