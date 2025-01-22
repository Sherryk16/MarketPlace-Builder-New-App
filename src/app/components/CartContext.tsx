// context/CartContext.tsx
import { createContext, useContext, useState, useEffect } from "react";
import { getCartFromLocalStorage, saveCartToLocalStorage } from "./CartUtils";
import { useRouter } from "next/router";

interface CartContextType {
  cart: any[];
  addToCart: (product: any) => void;
  removeFromCart: (productCode: string) => void;
  cartMessage: string;
  setCartMessage: (message: string) => void;
  clearCartMessage: () => void;
}

const CartContext = createContext<CartContextType | null>(null);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<any[]>([]);
  const [cartMessage, setCartMessage] = useState<string>("");

  useEffect(() => {
    const storedCart = getCartFromLocalStorage();
    setCart(storedCart);
  }, []);

  const addToCart = (product: any) => {
    const updatedCart = [...cart, product];
    setCart(updatedCart);
    saveCartToLocalStorage(updatedCart);
    setCartMessage(`${product.name} has been added to your cart!`);
  };

  const removeFromCart = (productCode: string) => {
    const updatedCart = cart.filter((item) => item.code !== productCode);
    setCart(updatedCart);
    saveCartToLocalStorage(updatedCart);
  };

  const clearCartMessage = () => {
    setCartMessage(""); // Clear the popup message
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        cartMessage,
        setCartMessage,
        clearCartMessage,
      }}
    >
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
