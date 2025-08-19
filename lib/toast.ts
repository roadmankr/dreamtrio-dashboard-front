import { toast } from 'sonner';

export const showToastSuccess = ({
  description,
  title = '성공',
  duration = 1500,
}: {
  description: string;
  title?: string;
  duration?: number;
}) => {
  const id = toast.success(title, {
    duration,
    description,
  });

  // 4초 후 강제로 닫기 (hover 여부 무시)
  setTimeout(() => toast.dismiss(id), duration);
};

export const showToastError = ({
  description,
  title = '에러',
}: {
  description: string;
  title?: string;
}) => {
  toast.error(title, {
    duration: Infinity,
    description,
    closeButton: true,
    classNames: {
      toast: 'touch-auto select-text',
      actionButton: ' group-[.toast]:!bg-white group-[.toast]:!text-primary',
    },
    style: {
      userSelect: 'text',
    },
    action: {
      label: '텍스트 복사',
      onClick: (e) => {
        e.preventDefault();
        navigator.clipboard.writeText(description);
        showToastSuccess({
          title: '텍스트 복사',
          description: '텍스트가 복사되었습니다',
          duration: 2000,
        });
      },
    },
  });
};
