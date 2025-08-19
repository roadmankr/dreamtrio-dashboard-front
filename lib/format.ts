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

// export const debounce = (func: Function, delay: number) => {
//   let timer: NodeJS.Timeout;
//   return function (...args: any[]) {
//     clearTimeout(timer);
//     timer = setTimeout(() => func(...args), delay);
//   };
// };
