'use client';

import { cva, type VariantProps } from 'class-variance-authority';

import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { showToastError } from '@/lib/toast';
import { cn } from '@/lib/utils';
import React from 'react';

function FieldSet({ className, ...props }: React.ComponentProps<'fieldset'>) {
  return (
    <fieldset
      data-slot='field-set'
      className={cn(
        'flex flex-col gap-6',
        'has-[>[data-slot=checkbox-group]]:gap-3 has-[>[data-slot=radio-group]]:gap-3',
        className,
      )}
      {...props}
    />
  );
}

function FieldLegend({
  className,
  variant = 'legend',
  ...props
}: React.ComponentProps<'legend'> & { variant?: 'legend' | 'label' }) {
  return (
    <legend
      data-slot='field-legend'
      data-variant={variant}
      className={cn(
        'mb-3 font-medium',
        'data-[variant=legend]:text-base',
        'data-[variant=label]:text-sm',
        className,
      )}
      {...props}
    />
  );
}

function FieldGroup({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot='field-group'
      className={cn(
        'group/field-group @container/field-group flex w-full flex-col gap-7 data-[slot=checkbox-group]:gap-3 [&>[data-slot=field-group]]:gap-4',
        className,
      )}
      {...props}
    />
  );
}

const fieldVariants = cva(
  'group/field flex w-full gap-3 data-[invalid=true]:text-destructive',
  {
    variants: {
      orientation: {
        vertical: ['flex-col [&>*]:w-full [&>.sr-only]:w-auto'],
        horizontal: [
          'flex-row items-center',
          '[&>[data-slot=field-label]]:flex-auto',
          'has-[>[data-slot=field-content]]:items-start has-[>[data-slot=field-content]]:[&>[role=checkbox],[role=radio]]:mt-px',
        ],
        responsive: [
          'flex-col [&>*]:w-full [&>.sr-only]:w-auto @md/field-group:flex-row @md/field-group:items-center @md/field-group:[&>*]:w-auto',
          '@md/field-group:[&>[data-slot=field-label]]:flex-auto',
          '@md/field-group:has-[>[data-slot=field-content]]:items-start @md/field-group:has-[>[data-slot=field-content]]:[&>[role=checkbox],[role=radio]]:mt-px',
        ],
      },
    },
    defaultVariants: {
      orientation: 'vertical',
    },
  },
);

function Field({
  className,
  orientation = 'vertical',
  ...props
}: React.ComponentProps<'div'> & VariantProps<typeof fieldVariants>) {
  return (
    <div
      role='group'
      data-slot='field'
      data-orientation={orientation}
      className={cn(fieldVariants({ orientation }), className)}
      {...props}
    />
  );
}

function FieldContent({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot='field-content'
      className={cn(
        'group/field-content flex flex-1 flex-col gap-1.5 leading-snug',
        className,
      )}
      {...props}
    />
  );
}

function FieldLabel({
  className,
  ...props
}: React.ComponentProps<typeof Label>) {
  return (
    <Label
      data-slot='field-label'
      className={cn(
        'group/field-label peer/field-label flex w-fit gap-2 leading-snug group-data-[disabled=true]/field:opacity-50',
        'has-[>[data-slot=field]]:w-full has-[>[data-slot=field]]:flex-col has-[>[data-slot=field]]:rounded-md has-[>[data-slot=field]]:border [&>*]:data-[slot=field]:p-4',
        'has-data-[state=checked]:bg-primary/5 has-data-[state=checked]:border-primary dark:has-data-[state=checked]:bg-primary/10',
        className,
      )}
      {...props}
    />
  );
}

function FieldTitle({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot='field-label'
      className={cn(
        'flex w-fit items-center gap-2 text-sm leading-snug font-medium group-data-[disabled=true]/field:opacity-50',
        className,
      )}
      {...props}
    />
  );
}

function FieldDescription({ className, ...props }: React.ComponentProps<'p'>) {
  return (
    <p
      data-slot='field-description'
      className={cn(
        'text-muted-foreground text-sm leading-normal font-normal group-has-[[data-orientation=horizontal]]/field:text-balance',
        'last:mt-0 nth-last-2:-mt-1 [[data-variant=legend]+&]:-mt-1.5',
        '[&>a:hover]:text-primary [&>a]:underline [&>a]:underline-offset-4',
        className,
      )}
      {...props}
    />
  );
}

function FieldSeparator({
  children,
  className,
  ...props
}: React.ComponentProps<'div'> & {
  children?: React.ReactNode;
}) {
  return (
    <div
      data-slot='field-separator'
      data-content={!!children}
      className={cn(
        'relative -my-2 h-5 text-sm group-data-[variant=outline]/field-group:-mb-2',
        className,
      )}
      {...props}
    >
      <Separator className='absolute inset-0 top-1/2' />
      {children && (
        <span
          className='bg-background text-muted-foreground relative mx-auto block w-fit px-2'
          data-slot='field-separator-content'
        >
          {children}
        </span>
      )}
    </div>
  );
}

function FieldError({
  className,
  children,
  errors,
  toastOnError,
  ...props
}: React.ComponentProps<'div'> & {
  errors?: Array<{ message?: string } | undefined>;
  toastOnError?: boolean;
}) {
  // 1) 메시지 정제
  const messages = React.useMemo(() => {
    if (!errors?.length) return [] as string[];
    const uniq = [
      ...new Map(
        errors
          .map((e) => e?.message?.trim())
          .filter(Boolean)
          .map((m) => [m, m]),
      ).values(),
    ] as string[];
    return uniq;
  }, [errors]);

  // 2) "마지막 상태만" 토스트 (트레일링 디바운스)
  React.useEffect(() => {
    if (!toastOnError || messages.length === 0) return;

    const id = window.setTimeout(() => {
      // 타임아웃 시점의 최신 상태로 판단
      if (messages.length > 0) {
        // 마지막이 에러면 이때 한 번만 토스트
        const msg = messages[0];
        showToastError({ description: msg, formMessageId: msg });
      }
      // 마지막이 정상(=messages.length === 0)이면 아무것도 안 함
    }, 50); // ← 지연 시간(원하는 값으로 조정)

    // 다음 변경이 오면 앞선 예약 취소 → 앞의 건 무시, 항상 "나중 것"만 남음
    return () => {
      clearTimeout(id);
    };
  }, [toastOnError, messages]);

  // 토스트 모드면 인라인 숨기고, 아니라면 평소처럼 렌더
  if (toastOnError) return null;

  if (children) {
    return (
      <div
        role='alert'
        data-slot='field-error'
        className={cn('text-destructive text-sm font-normal', className)}
        {...props}
      >
        {children}
      </div>
    );
  }
  if (messages.length === 0) return null;

  const content =
    messages.length === 1 ? (
      messages[0]
    ) : (
      <ul className='ml-4 flex list-disc flex-col gap-1'>
        {messages.map((m, i) => (
          <li key={i}>{m}</li>
        ))}
      </ul>
    );

  return (
    <div
      role='alert'
      data-slot='field-error'
      className={cn('text-destructive text-sm font-normal', className)}
      {...props}
    >
      {content}
    </div>
  );
}

export {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
  FieldTitle,
};
