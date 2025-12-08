import { Button } from '@/components/ui/button';
import { ReloadIcon } from '@radix-ui/react-icons';
import { DownloadIcon } from 'lucide-react';

type Props = {
  isPending?: boolean;
} & React.ComponentProps<'button'>;

const ExcelDownload = ({ isPending, title, onClick }: Props) => {
  return (
    <Button
      type='button'
      disabled={isPending}
      aria-disabled={isPending}
      aria-label='엑셀 다운로드'
      className='bg-excel hover:bg-excel/80 h-10 cursor-pointer'
      onClick={onClick}
    >
      {isPending ? <ReloadIcon className='animate-spin' /> : <DownloadIcon />}
      {title ?? '엑셀다운로드'}
    </Button>
  );
};

export default ExcelDownload;
