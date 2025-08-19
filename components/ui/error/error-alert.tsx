'use client';

import { cn } from '@/lib/utils';
import { Alert, AlertDescription } from '../alert';

interface Props {
  error: string;
  className?: string;
}

const ErrorAlert = ({ error, className }: Props) => {
  return (
    <Alert variant='destructive'>
      <AlertDescription className={cn('mt-1', className)}>
        <span>{error}</span>
      </AlertDescription>
    </Alert>
  );
};

export default ErrorAlert;
