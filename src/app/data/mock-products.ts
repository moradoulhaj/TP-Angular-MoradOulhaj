import { Product } from '../models/product';

export const mockProducts: Product[] = [];

for (let i = 1; i <= 50; i++) {
  const p = new Product(`PROD-${i.toString().padStart(3, '0')}`);
  p.id = i;
  p.productTitle = `Product #${i}`;
  p.productPrice = (Math.random() * 100 + 10).toFixed(2) + ' €';
  p.productQuantity = Math.floor(Math.random() * 100) + 1;

  mockProducts.push(p);
}
