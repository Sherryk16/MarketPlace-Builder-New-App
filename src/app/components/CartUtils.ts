// CartUtils.ts
export const getCartFromLocalStorage = () => {
  const storedCart = localStorage.getItem("cart");
  return storedCart ? JSON.parse(storedCart) : [];
};

export const saveCartToLocalStorage = (cart: any[]) => {
  localStorage.setItem("cart", JSON.stringify(cart));
};

export const addToCart = (product: any) => {
  const cart = getCartFromLocalStorage();

  // Check for duplicates
  const isProductInCart = cart.some((item: any) => item.code === product.code);
  if (isProductInCart) {
    alert("This product is already in your cart!");
    return cart;
  }

  const updatedCart = [...cart, product];
  saveCartToLocalStorage(updatedCart);
  alert(`${product.name} has been added to your cart.`);
  return updatedCart;
};

export const removeFromCart = (productCode: string) => {
  const cart = getCartFromLocalStorage();
  const updatedCart = cart.filter((item: any) => item.code !== productCode);
  saveCartToLocalStorage(updatedCart);
  return updatedCart;
};
