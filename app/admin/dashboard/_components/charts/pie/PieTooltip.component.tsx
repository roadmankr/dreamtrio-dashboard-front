import { nf } from '@/lib/form';
import {
  NameType,
  ValueType,
} from 'recharts/types/component/DefaultTooltipContent';
import { TPieChartTooltip } from '../../../_config';

interface Props {
  colorsByKey: TPieChartTooltip[];
  name: NameType;
  value: ValueType;
}

const PieTooltip = ({ colorsByKey, name, value }: Props) => {
  const key = name;
  const color = colorsByKey.find((color) => color.key === key)?.color;

  return (
    <span key={key} className='text-sm font-semibold' style={{ color }}>
      {key}
      <strong className='ml-2 text-sm text-neutral-700'>
        {nf.format(Number(value ?? 0))}
      </strong>
    </span>
  );
};

export default PieTooltip;
