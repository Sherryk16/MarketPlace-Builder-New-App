'use client'
import React, { createContext, useContext, useState } from "react";

// Define a more specific type for image (if it's an object, adjust accordingly)
interface SanityImage {
  asset: {
    _ref: string;
    _type: string;
  };
  url?: string;  // Add url property
}
interface Product {
  currentSlug: string;  // Using slug instead of id
  name: string;
  price: number;
  size?: string | string[];  // Define size as a string or an array of strings
  image:SanityImage ;  // Specify image type more precisely
  quantity: number;
}

interface CartContextProps {
  cartItems: Product[];
  addToCart: (product: Product) => void;
  removeFromCart: (slug: string) => void;
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<Product[]>([]);

  const addToCart = (product: Product) => {
    setCartItems((prevItems) => {
      const existingProductIndex = prevItems.findIndex((item) => item.currentSlug === product.currentSlug);

      if (existingProductIndex >= 0) {
        const updatedCart = [...prevItems];
        updatedCart[existingProductIndex].quantity += 1;
        return updatedCart;
      } else {
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (slug: string) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.currentSlug !== slug));
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

export default CartProvider;
