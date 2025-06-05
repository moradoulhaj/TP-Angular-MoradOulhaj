import { CartItem } from "./cart";

export interface History {
    id: string;
    userId: string;
    contactInfo: string;
    cart: CartItem[]; // from cart.model
    total: number;
    status: 'pending' | 'shipped' | 'delivered' | 'cancelled';
  }
  