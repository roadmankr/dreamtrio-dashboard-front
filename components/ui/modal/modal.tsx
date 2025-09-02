'use client';

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import useModalState from '@/shared/hooks/useModalState';
import { InfoCircledIcon, ReloadIcon } from '@radix-ui/react-icons';
import { TriangleAlertIcon } from 'lucide-react';
import { JSX, ReactNode } from 'react';
import UnderlineLabel from '../label/underline-label';

interface Props {
  title: ReactNode;
  description?: ReactNode;
  trigger?: JSX.Element;
  onSubmit?: any;
  onCancel?: () => void;
  isDestructive?: boolean;
  disabled?: boolean;
  isPending?: boolean;
  submitIcon?: JSX.Element;
  submitText?: string;
  cancelText?: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  hideCancel?: boolean;
}

const Modal = ({
  title,
  trigger,
  onSubmit,
  onCancel,
  isPending = false,
  isDestructive = false,
  submitIcon,
  disabled,
  submitText = '확인',
  cancelText = '취소',
  description,
  open,
  onOpenChange,
  hideCancel = true,
}: Props) => {
  const { isOpen, handleOpenChange } = useModalState({ open, onOpenChange });

  const handleConfirm = () => {
    onSubmit?.();

    if (!onSubmit) {
      handleOpenChange(false);
    }
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={handleOpenChange}>
      {trigger && <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>}
      <AlertDialogContent
        className={`w-[90vw] max-w-lg rounded-lg bg-white p-[1.5px]`}
      >
        <div
          className={cn(
            'flex h-full w-full flex-col gap-3 rounded-lg border bg-white p-6 shadow-xl',
            isDestructive ? 'border-red-500' : 'border-gray-500',
          )}
        >
          <AlertDialogHeader className='flex flex-col gap-2'>
            <AlertDialogTitle
              className={cn(
                'flex items-center gap-1 text-lg font-semibold',
                isDestructive ? 'text-destructive' : 'text-primary',
              )}
            >
              {isDestructive ? (
                <TriangleAlertIcon className='h-5 w-5 translate-y-[1px] text-red-500' />
              ) : (
                <InfoCircledIcon className='h-5 w-5 translate-y-[1px] text-blue-500' />
              )}
              {typeof title === 'string' ? (
                <UnderlineLabel
                  text={title}
                  className={isDestructive ? 'text-destructive' : ''}
                  bgColor={isDestructive ? 'bg-destructive/15' : 'bg-[#D9E3FF]'}
                />
              ) : (
                title
              )}
            </AlertDialogTitle>
            {description && (
              <AlertDialogDescription
                className={cn(
                  'max-w-full rounded-md px-3 py-2 text-sm leading-relaxed font-medium break-all whitespace-pre-wrap',
                  isDestructive
                    ? 'border border-red-200 bg-red-50 text-red-600'
                    : 'border border-gray-200 bg-slate-50 text-gray-600',
                )}
              >
                {description}
              </AlertDialogDescription>
            )}
          </AlertDialogHeader>

          <AlertDialogFooter className='flex justify-end gap-2'>
            {!hideCancel && (
              <AlertDialogCancel asChild>
                <Button variant='outline' onClick={onCancel}>
                  {cancelText}
                </Button>
              </AlertDialogCancel>
            )}
            <Button
              type='button'
              aria-label='모달 확인 버튼'
              variant={isDestructive ? 'destructive' : 'default'}
              onClick={handleConfirm}
              disabled={disabled}
              className={cn({
                'cursor-not-allowed opacity-50': isPending,
              })}
            >
              {isPending ? (
                <ReloadIcon className='size-3 animate-spin' />
              ) : (
                submitIcon
              )}
              {submitText}
            </Button>
          </AlertDialogFooter>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default Modal;
