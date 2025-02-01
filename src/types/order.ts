// ./src/types/order.ts
export interface ShippingAddress {
    name: string;
    address: string;
    city: string;
    postalCode: string;
    country: string;
  }
  
  export interface CartItem {
    name: string;
    quantity: number;
    price: number;
    image: string;
  }
  
  export interface Order {
    stripeSessionId: string;
    paymentStatus: string;
    shippingAddress: ShippingAddress;
    cartItems: CartItem[];
    createdAt: string;
    customer: {
      _id: string;
      name: string;
    };
  }
  