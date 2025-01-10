'use client'
import React, { createContext, useContext, useState } from "react";

interface Product {
  currentSlug: string;  // Using slug instead of id
  name: string;
  price: number;
  size?:any;
  image: any;
  quantity: number;
}

interface CartContextProps {
  cartItems: Product[];
  addToCart: (product: Product) => void;
  removeFromCart: (slug: string) => void;
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

export  const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<Product[]>([]);

  const addToCart = (product: Product) => {
    setCartItems((prevItems) => {
      // Find the product in the cart using the slug (unique identifier)
      const existingProductIndex = prevItems.findIndex((item) => item.currentSlug === product.currentSlug);

      if (existingProductIndex >= 0) {
        // If the product is already in the cart, increment its quantity
        const updatedCart = [...prevItems];
        updatedCart[existingProductIndex].quantity += 1;
        return updatedCart;
      } else {
        // If the product doesn't exist, add it with quantity 1
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (slug: string) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.currentSlug!== slug));
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
 export default CartProvider