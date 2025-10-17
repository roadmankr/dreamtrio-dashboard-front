const useHeaderSummary = () => {
  const rows = [
    { label: '총 구매금액', value: '30,000,000원' },
    { label: '매입대비 판매율', value: '20%' },
    { label: '타매장 매입대비 판매율', value: '20%' },
    { label: '타매장 매입대비 매출이익', value: '20%' },
    { label: '매출이익', value: '6,000,000원' },
    { label: '잔여재고', value: '20,000,000원' },
  ];

  return { rows };
};

export default useHeaderSummary;
