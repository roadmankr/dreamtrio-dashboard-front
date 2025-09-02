import { useCallback, useState } from 'react';

interface UseModalStateProps {
  initialState?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

interface UseModalStateReturn {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void; // 상태를 직접 설정하는 함수 (내부/외부 모두 사용 가능)
  handleOpenChange: (open: boolean) => void; // 모달 컴포넌트의 onOpenChange prop에 연결할 함수 (내부/외부 로직 포함)
  toggle: () => void; // 상태를 토글하는 함수 (내부/외부 로직 포함)
  close: () => void;
}

// useModalState 훅 정의
const useModalState = ({
  initialState = false,
  open: controlledOpen, // 외부 open prop
  onOpenChange: controlledOnOpenChange, // 외부 onOpenChange prop
}: UseModalStateProps = {}): UseModalStateReturn => {
  // 초기값 및 선택적 인자 처리

  // 외부에서 제어되지 않을 때 사용할 내부 상태
  const [internalIsOpen, setInternalIsOpen] = useState(initialState);

  // 내부 상태 변경 함수
  const handleInternalOpenChange = useCallback((open: boolean) => {
    setInternalIsOpen(open);
  }, []);

  // 최종적인 모달 상태 결정 (외부 prop 우선)
  const isOpen = controlledOpen ?? internalIsOpen;

  // 최종적인 모달 핸들러 결정 (외부 prop 우선)
  const handleOpenChange = controlledOnOpenChange ?? handleInternalOpenChange;

  // 상태를 직접 설정하는 함수 (내부/외부 제어 방식에 관계없이 최종 핸들러 사용)
  const setIsOpen = useCallback(
    (open: boolean) => {
      handleOpenChange(open); // 최종 결정된 핸들러 호출
    },
    [handleOpenChange],
  );

  // 상태를 토글하는 함수 (내부/외부 제어 방식에 관계없이 최종 핸들러 사용)
  const toggle = useCallback(() => {
    setIsOpen(!isOpen); // 현재 결정된 isOpen 상태 사용
  }, [setIsOpen, isOpen]);

  const close = useCallback(() => {
    handleOpenChange(false);
  }, [handleOpenChange]);

  return {
    isOpen, // 최종 결정된 모달 상태
    setIsOpen, // 외부/내부 제어를 통합한 상태 설정 함수
    handleOpenChange, // 외부/내부 제어를 통합한 상태 변경 핸들러 (onOpenChange prop 연결용)
    toggle, // 외부/내부 제어를 통합한 토글 함수
    close,
  };
};

export default useModalState;
