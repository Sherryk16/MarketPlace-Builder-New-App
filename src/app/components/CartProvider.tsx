"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

// Define a specific type for image
interface SanityImage {
  asset: {
    _ref: string;
    _type: string;
  };
  url?: string;
}

interface Product {
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
  const [cartItems, setCartItems] = useState<Product[]>(() => {
    if (typeof window !== "undefined") {
      const storedItems = localStorage.getItem("cart");
      return storedItems ? JSON.parse(storedItems) : [];
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product: Product) => {
    setCartItems((prevItems) => {
      const existingProductIndex = prevItems.findIndex((item) => item.currentSlug === product.currentSlug);

      if (existingProductIndex >= 0) {
        const updatedCart = [...prevItems];
        updatedCart[existingProductIndex].quantity += product.quantity;
        return updatedCart;
      } else {
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (slug: string) => {
    setCartItems((prevItems) =>
      prevItems
        .map((item) =>
          item.currentSlug === slug
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
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
