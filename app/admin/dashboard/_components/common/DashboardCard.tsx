import {
  PanelCard,
  PanelCardBody,
  PanelCardHeader,
} from '@/components/ui/card/panel-card';
import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  title: string;
  className?: string;
}

const DashboardCard = ({ title, children, className }: Props) => {
  return (
    <PanelCard>
      <PanelCardHeader title={title} />
      <PanelCardBody className={cn(``, className)}>
        {children}
        {/* <PanelCardItem className={cn(``, className)}>{children}</PanelCardItem> */}
      </PanelCardBody>
    </PanelCard>
  );
};

export default DashboardCard;
