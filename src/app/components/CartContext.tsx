// CartContext.tsx

import { createContext, useContext, useState, useEffect } from "react";
import { getCartFromLocalStorage, saveCartToLocalStorage } from "./CartUtils";

// Define the Product type (adjust it according to your actual product data)
interface Product {
  id: string;
  name: string;
  code: string;
  price: number;
  image: any; // Adjust the type for image (or define it more specifically)
  currentSlug: string;
  quantity: number;
}

interface CartContextType {
  cart: Product[]; // Use Product[] instead of any[]
  addToCart: (product: Product) => void;
  removeFromCart: (productCode: string) => void;
}

const CartContext = createContext<CartContextType | null>(null);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<Product[]>([]); // Use Product[] here

  useEffect(() => {
    const storedCart = getCartFromLocalStorage();
    setCart(storedCart);
  }, []);

  const addToCart = (product: Product) => { // Use Product type
    const updatedCart = [...cart, product];
    setCart(updatedCart);
    saveCartToLocalStorage(updatedCart);
  };

  const removeFromCart = (productCode: string) => {
    const updatedCart = cart.filter((item) => item.code !== productCode);
    setCart(updatedCart);
    saveCartToLocalStorage(updatedCart);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
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
