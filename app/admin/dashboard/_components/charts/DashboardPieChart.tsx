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

const RAD = Math.PI / 180;

const renderLeaderLabel = (props: any) => {
  const { cx, cy, midAngle, outerRadius, value, index, name } = props;
  const color = pichartCololrsConfig[index % pichartCololrsConfig.length];

  // 각도 방향 벡터
  const sin = Math.sin(-RAD * midAngle);
  const cos = Math.cos(-RAD * midAngle);

  // 라인 시작/중간/끝 좌표 (필요시 수치 조절)
  const r1 = outerRadius + 6; // 파이 밖으로 1차 돌출
  const r2 = outerRadius + 16; // 2차 돌출
  const sx = cx + r1 * cos,
    sy = cy + r1 * sin;
  const mx = cx + r2 * cos,
    my = cy + r2 * sin;
  const ex = mx + (cos >= 0 ? 14 : -14),
    ey = my; // 수평 꼬리

  const anchor = cos >= 0 ? 'start' : 'end';

  return (
    <g>
      {/* 리더 라인 */}
      <path
        d={`M${sx},${sy} L${mx},${my} L${ex},${ey}`}
        stroke={color}
        fill='none'
      />
      {/* (선택) 끝점 점 */}
      <circle cx={ex} cy={ey} r={2} fill={color} />
      {/* 숫자 */}
      <text
        x={ex + (cos >= 0 ? 4 : -4)}
        y={ey}
        textAnchor={anchor}
        dominantBaseline='central'
        fill={color}
        fontSize={14}
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
  return (
    <ResponsiveContainer width='100%' height='100%'>
      <PieChart>
        <Pie
          data={data}
          cx='50%'
          cy='50%'
          dataKey='totalPrice'
          outerRadius='60%'
          paddingAngle={1.5}
          minAngle={2}
          // 리더 라인 + 숫자만 (이름 표시 원하면 텍스트에 name도 합치세요)
          label={renderLeaderLabel}
          labelLine={false} // 라인은 우리가 직접 그림
        >
          {data?.map((_, i) => (
            <Cell
              key={i}
              fill={pichartCololrsConfig[i % pichartCololrsConfig.length]}
            />
          ))}
        </Pie>

        <Tooltip
          formatter={(v: number) => formatCurrency(v ?? 0)}
          separator=': '
          contentStyle={{ borderRadius: 8 }}
        />

        <Legend /* ... */ />
      </PieChart>
    </ResponsiveContainer>
  );
}
