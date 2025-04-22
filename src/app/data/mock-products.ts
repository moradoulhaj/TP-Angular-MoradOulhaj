import { Product } from '../models/product';

export const mockProducts: Product[] = [];

const appleProductsData = [
    {
      id: 1,
      productID: 'APL-001',
      title: 'iPhone 15 Pro Max',
      price: '1349.00 €',
      quantity: 0,
      picture: 'https://fdn2.gsmarena.com/vv/pics/apple/apple-iphone-15-pro-max-1.jpg',
    },
    {
      id: 2,
      productID: 'APL-002',
      title: 'MacBook Air M2',
      price: '1249.00 €',
      quantity: 9,
      picture: 'https://m.media-amazon.com/images/I/71f5Eu5lJSL._AC_SL1500_.jpg',
    },
    {
      id: 3,
      productID: 'APL-003',
      title: 'iPad Pro 12.9"',
      price: '1469.00 €',
      quantity: 12,
      picture: 'https://m.media-amazon.com/images/I/81gC7frRJyL._AC_SL1500_.jpg',
    },
    {
      id: 4,
      productID: 'APL-004',
      title: 'Apple Watch Series 9',
      price: '449.00 €',
      quantity: 30,
      picture: 'https://m.media-amazon.com/images/I/71T5NVOgbpL._AC_SL1500_.jpg',
    },
    {
      id: 5,
      productID: 'APL-005',
      title: 'AirPods Pro (2nd Gen)',
      price: '299.00 €',
      quantity: 40,
      picture: 'https://m.media-amazon.com/images/I/61f1YfTkTDL._AC_SL1500_.jpg',
    },
  ];
  

for (const data of appleProductsData) {
  const product = new Product(data.productID);
  product.id = data.id;
  product.productTitle = data.title;
  product.productPrice = data.price;
  product.productQuantity = data.quantity;
  product.productPicture = data.picture;

  mockProducts.push(product);
}
