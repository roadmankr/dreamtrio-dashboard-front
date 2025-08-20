export const formatPhoneNumber = (value: string) => {
  if (!value) {
    return '';
  }

  value = value.replace(/\D/g, '');

  const result = [];
  let restNumber = '';

  // 지역번호와 나머지 번호로 나누기
  if (value.startsWith('02')) {
    // 서울 02 지역번호
    result.push(value.slice(0, 2));
    restNumber = value.slice(2);
  } else if (value.startsWith('1')) {
    // 지역 번호가 없는 경우
    // 1xxx-yyyy
    restNumber = value;
  } else {
    // 나머지 3자리 지역번호 & 010 번호
    // 0xx-yyyy-zzzz
    result.push(value.slice(0, 3));
    restNumber = value.slice(3);
  }

  if (restNumber.length === 7) {
    // 7자리만 남았을 때는 xxx-yyyy
    result.push(restNumber.slice(0, 3));
    result.push(restNumber.slice(3, 7));
  } else {
    result.push(restNumber.slice(0, 4));
    result.push(restNumber.slice(4, 8));
  }

  return result.filter((val) => val).join('-');
};

export const formatDateString = (value: string) => {
  if (!value) return '';

  // 숫자만 추출
  const digits = value.replace(/\D/g, '').slice(0, 8); // 최대 8자리까지만

  if (digits.length <= 4) return digits; // 연도
  if (digits.length <= 6) return `${digits.slice(0, 4)}-${digits.slice(4, 6)}`;
  return `${digits.slice(0, 4)}-${digits.slice(4, 6)}-${digits.slice(6, 8)}`;
};

export const formatBizNumber = (value: string) => {
  // 숫자만 추출
  const digits = value.replace(/\D/g, '');

  // 하이픈 삽입: 3-2-5
  if (digits.length <= 3) return digits;
  if (digits.length <= 5) return `${digits.slice(0, 3)}-${digits.slice(3)}`;
  if (digits.length <= 10)
    return `${digits.slice(0, 3)}-${digits.slice(3, 5)}-${digits.slice(5)}`;

  return `${digits.slice(0, 3)}-${digits.slice(3, 5)}-${digits.slice(5, 10)}`;
};

// 값 포맷터 (원 단위 → 자동: 억/만/천)
export const fmt = (v: number) => {
  if (v == null || isNaN(v)) return '-';
  if (v >= 100000000) return `${(v / 100000000).toLocaleString()}억`;
  if (v >= 10000) return `${(v / 10000).toLocaleString()}만`;
  if (v >= 1000) return `${(v / 1000).toLocaleString()}천`;
  return v.toLocaleString();
};

// 축 간단 포맷 (compact)
export const fmtCompact = (v: number) => fmt(v);
export const fmtPercent = (v: number) =>
  `${(v * 100).toFixed(v >= 0.1 ? 1 : 2)}%`;
/**
 * 금액 단위를 천원/만원 단위로 줄여주는 formatter
 * @param value 원 단위 숫자
 * @param unitType "천원" | "만원" | "억" 자동 계산 옵션
 */
export function formatCurrency(
  value: number,
  unitType: 'auto' | '천원' | '만원' | '억' = 'auto',
): string {
  if (value == null || isNaN(value)) return '-';

  // 자동 모드: 숫자 크기에 맞춰 단위 결정
  if (unitType === 'auto') {
    if (value >= 100000000) {
      // 1억 이상
      return `${Math.floor(value / 100000000).toLocaleString()}억`;
    }
    if (value >= 10000) {
      // 1만 이상
      return `${Math.floor(value / 10000).toLocaleString()}만`;
    }
    if (value >= 1000) {
      // 1천 이상
      return `${Math.floor(value / 1000).toLocaleString()}천`;
    }
    return value.toLocaleString();
  }

  // 고정 모드
  switch (unitType) {
    case '천원':
      return `${Math.floor(value / 1000).toLocaleString()}천원`;
    case '만원':
      return `${Math.floor(value / 10000).toLocaleString()}만원`;
    case '억':
      return `${Math.floor(value / 100000000).toLocaleString()}억`;
    default:
      return value.toLocaleString();
  }
}

// export const debounce = (func: Function, delay: number) => {
//   let timer: NodeJS.Timeout;
//   return function (...args: any[]) {
//     clearTimeout(timer);
//     timer = setTimeout(() => func(...args), delay);
//   };
// };
