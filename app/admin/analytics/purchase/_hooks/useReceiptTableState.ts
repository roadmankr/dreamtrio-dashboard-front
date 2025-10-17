import useCheckbox from '@/features/checkbox/model/useCheckbox';

const rows = [
  {
    id: '2025/08/04-1',
    qty: 30,
    supply: '365,455',
    vat: '36,545',
    total: '402,000',
  },
  {
    id: '2025/08/04-4',
    qty: 34,
    supply: '761,600',
    vat: '76,160',
    total: '837,760',
  },
  {
    id: '2025/08/04 계',
    qty: 64,
    supply: '1,127,055',
    vat: '112,705',
    total: '1,239,760',
    strong: true,
  },
  {
    id: '2025/08/07-1',
    qty: 139,
    supply: '2,847,700',
    vat: '284,772',
    total: '3,132,472',
  },
  {
    id: '2025/08/07 계',
    qty: 139,
    supply: '2,847,700',
    vat: '284,772',
    total: '3,132,472',
    strong: true,
  },
];

const useReceiptTableState = () => {
  const { isAllSelected, toggleAll, toggleOne, selected } = useCheckbox({
    rows,
    getRowId: (row) => row.id,
  });
  return { rows, isAllSelected, toggleAll, toggleOne, selected };
};

export default useReceiptTableState;
