import { fmtCompact } from '@/lib/format';
import { useEffect, useRef, useState } from 'react';
import {
  Bar,
  CartesianGrid,
  Cell,
  LabelList,
  Legend,
  BarChart as RBarChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { DataKey } from 'recharts/types/util/types';

interface Props<TData extends Record<string, any>> {
  xKey: DataKey<TData>;
  xTickFormatter?: (data: string | number) => string | number;
  series?: {
    key: DataKey<TData>;
    barCondition?: (row: TData) => string;
    fill?: string;
    labelFill?: string;
    name?: string;
    stackId?: string | number;
    radius?: [number, number, number, number];
    labelPosition?:
      | 'top'
      | 'insideTop'
      | 'insideRight'
      | 'insideLeft'
      | 'insideBottom';
  }[];
  data?: TData[];
  chargAvg?: number;
  tooltipFormatter?: (
    value: any,
    name: any,
    row: TData,
  ) => [React.ReactNode, React.ReactNode];
  labelFormatter?: (label: string) => string;
}

const BarChart = <TData extends Record<string, any>>({
  xKey,
  xTickFormatter,
  tooltipFormatter,
  series,
  data,
  chargAvg,
  labelFormatter,
}: Props<TData>) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);
  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new ResizeObserver((entries) => {
      const w = entries[0].contentRect.width;
      setContainerWidth(w);
    });

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  const barWidth = 60; // 각 막대 너비(px)
  const gap = 20; // 막대 간 간격(px)
  const totalWidth = (data?.length || 0) * (barWidth + gap) + 80; // 좌우 여백 포함
  const minCount = 6;
  const maxCount = 30;
  const minAspect = 16 / 11;
  const maxAspect = 16 / 5;

  // 0~1 사이로 정규화 후 선형보간
  const t = Math.min(
    1,
    Math.max(0, ((data?.length || 0) - minCount) / (maxCount - minCount)),
  );
  const aspect = minAspect + (maxAspect - minAspect) * t;

  // 2️⃣ 가로 크기에 따라 자동 높이 계산
  const displayWidth = Math.max(totalWidth, containerWidth || 0);
  const chartHeight = Math.round(containerWidth / aspect) * 0.7;

  return (
    <div className='relative grid'>
      <div className='[grid-area:1/1] sm:h-auto' aria-hidden />
      <div
        className='w-full overflow-x-auto overflow-y-hidden p-2 [grid-area:1/1]'
        ref={containerRef}
      >
        {/* <div className='aspect-video w-full min-w-4xl'> */}
        <div
          style={{
            height: chartHeight,
            minHeight: 400,
            width: displayWidth,
          }}
        >
          <ResponsiveContainer width='100%' height='100%'>
            <RBarChart
              data={data}
              margin={{ top: 16, right: 16, left: 8, bottom: 12 }}
              barGap={16}
            >
              {/* 부드러운 그리드 */}
              <CartesianGrid strokeDasharray='3 3' stroke='#ECEFF1' />
              <XAxis
                dataKey={xKey}
                tick={({ x, y, payload }) => {
                  return (
                    <g transform={`translate(${x},${y + 10})`}>
                      <text
                        textAnchor='middle'
                        fill='#374151'
                        fontSize={12}
                        dy={0}
                      >
                        {payload.value}
                      </text>
                      {xTickFormatter && (
                        <text
                          textAnchor='middle'
                          fill='#6B7280'
                          fontSize={11}
                          dy={14} // 첫 줄 아래로 내려주기
                        >
                          {xTickFormatter(payload.value)}
                        </text>
                      )}
                    </g>
                  );
                }}
                interval={0}
                // angle={-25}
                // textAnchor='end'
                height={46}
              />
              <YAxis
                tickFormatter={fmtCompact}
                tick={{ fontSize: 16, fill: '#6B7280' }}
                domain={[0, 'auto']}
                interval={0} // 모든 tick 표시
                tickCount={12}
                width={68}
              />

              {/* 평균 참조선 */}
              {chargAvg && (
                <>
                  <ReferenceLine
                    y={chargAvg}
                    stroke='#94A3B8'
                    strokeDasharray='4 4'
                  >
                    {/* 평균 라벨 */}
                  </ReferenceLine>
                </>
              )}

              {/* 예쁜 툴팁 */}
              <Tooltip
                separator=': '
                contentStyle={{ borderRadius: 8, borderColor: '#E5E7EB' }}
                formatter={(value: any, name: any, { payload }: any) => {
                  const row = payload as TData | undefined;
                  if (!row) return [value, name];
                  return tooltipFormatter?.(value, name, row) ?? [value, name];
                }}
                labelFormatter={(label: string) => {
                  return (
                    <span className='flex items-center gap-1'>
                      <span className='font-semibold'>
                        {labelFormatter?.(label) ?? label}
                      </span>
                    </span>
                  );
                }}
              />

              {/* 심플 범례 */}
              <Legend
                verticalAlign='bottom'
                align='center'
                iconType='circle'
                iconSize={10}
                wrapperStyle={{ fontSize: 16, color: '#6B7280' }}
              />

              {/* 아래층 (모서리 0) */}
              {series?.map((s, idx) => (
                <Bar
                  key={idx}
                  dataKey={s.key}
                  name={s.name}
                  stackId={s.stackId}
                  fill={s.fill}
                  radius={s.radius}
                  barSize={48}
                  maxBarSize={48}
                >
                  {data?.map((d, i) => {
                    const color = s.barCondition?.(d) ?? s.fill;
                    return <Cell key={`cell-${i}`} fill={color} />;
                  })}

                  {s.labelPosition && (
                    <LabelList
                      position={s.labelPosition}
                      fill={s?.labelFill ?? 'black'}
                      style={{ fontSize: 12 }}
                      formatter={(v: any) =>
                        (v
                          ? v.toLocaleString()
                          : '') as unknown as React.ReactNode
                      }
                    />
                  )}
                </Bar>
              ))}
            </RBarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default BarChart;
