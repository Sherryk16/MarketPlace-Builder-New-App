'use client'

import React, { createContext, useContext, useState, useEffect } from "react";

// Define a more specific type for image (if it's an object, adjust accordingly)
interface SanityImage {
  asset: {
    _ref: string;
    _type: string;
  };
  url?: string;  // Add url property
}

interface Product {
  _id: any;
  currentSlug: string;
  name: string;
  price: number;
  size?: string | string[];
  image: SanityImage;
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

  useEffect(() => {
    // Sync with localStorage on the client-side only
    const storedCartItems = localStorage.getItem('cartItems');
    if (storedCartItems) {
      setCartItems(JSON.parse(storedCartItems));
    }
  }, []);

  const addToCart = (product: Product) => {
    setCartItems((prevItems) => {
      const existingProductIndex = prevItems.findIndex((item) => item.currentSlug === product.currentSlug);
      let updatedCart;

      if (existingProductIndex >= 0) {
        updatedCart = [...prevItems];
        updatedCart[existingProductIndex].quantity += 1;
      } else {
        updatedCart = [...prevItems, { ...product, quantity: 1 }];
      }

      // Sync cartItems with localStorage
      localStorage.setItem('cartItems', JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  const removeFromCart = (slug: string) => {
    setCartItems((prevItems) => {
      const updatedCart = prevItems.filter((item) => item.currentSlug !== slug);
      // Sync cartItems with localStorage
      localStorage.setItem('cartItems', JSON.stringify(updatedCart));
      return updatedCart;
    });
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
