export const MOCK_PRODUCTS = Array.from({ length: 15 }).map((_, i) => ({
  id: `P-${(i + 1).toString().padStart(3, '0')}`,
  name: `더미 상품 ${i + 1}`,
  barcode: `DUMMY-${(i + 1).toString().padStart(3, '0')}`,
  price: 1000 * (i + 1),
  stock: 10 + i,
  updatedAt: new Date(Date.now() - i * 3600_000).toISOString(),
}));
