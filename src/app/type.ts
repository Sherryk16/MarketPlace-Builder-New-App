// src/types.ts

export interface Image {
    asset: {
      _ref: string;
    };
  }
  
  export interface Product {
    id: string;
    name: string;
    code: string;
    price: number;
    image: Image;
    currentSlug: string;
    quantity: number;
  }
  