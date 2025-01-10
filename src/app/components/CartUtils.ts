interface Product {
  name: string;
  price: number;
  image: string; // Assuming image is a URL string. Adjust accordingly.
  currentSlug: string;
  quantity: number;
  code: string;
}

export const getCartFromLocalStorage = (): Product[] => {
  const storedCart = localStorage.getItem("cart");
  return storedCart ? JSON.parse(storedCart) : [];
};

export const saveCartToLocalStorage = (cart: Product[]): void => {
  localStorage.setItem("cart", JSON.stringify(cart));
};

export const addToCart = (product: Product): Product[] => {
  const cart = getCartFromLocalStorage();

  // Check for duplicates
  const isProductInCart = cart.some((item) => item.code === product.code);
  if (isProductInCart) {
    alert("This product is already in your cart!");
    return cart;
  }

  const updatedCart = [...cart, product];
  saveCartToLocalStorage(updatedCart);
  alert(`${product.name} has been added to your cart.`);
  return updatedCart;
};

export const removeFromCart = (productCode: string): Product[] => {
  const cart = getCartFromLocalStorage();
  const updatedCart = cart.filter((item) => item.code !== productCode);
  saveCartToLocalStorage(updatedCart);
  return updatedCart;
};
