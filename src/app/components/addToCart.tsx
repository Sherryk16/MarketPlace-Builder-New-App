import { IoCartOutline } from "react-icons/io5";
import { useState, useEffect } from "react";
import Image from "next/image";

interface Product {
  name: string;
  price: number;
  image: any;
  currentSlug: string;
  quantity: any;
  code: any;
}

export default function FeaturedProductItem({ product }: { product: Product }) {
  const [cart, setCart] = useState<Product[]>([]);

  // Retrieve cart from localStorage on initial load
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  const handleAddToCart = () => {
    // Add product to the cart
    const updatedCart = [...cart, product];

    // Save the updated cart to localStorage
    localStorage.setItem('cart', JSON.stringify(updatedCart));

    // Update the state
    setCart(updatedCart);
  };

  return (
    <div className="group relative w-[250px] flex-shrink-0 bg-white p-4 hover:scale-105 transition-transform mx-auto shadow-lg rounded-md">
      {/* Product Image and Details */}
      <div className="relative w-full aspect-square flex justify-center items-center bg-gray-100 rounded-md overflow-hidden">
        <Image
          src={product.image?.asset?._ref || '/placeholder.jpg'} // Use default image if none
          alt={product.name}
          width={178}
          height={178}
        />
        <div className="absolute top-2 left-2 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            className="p-2 rounded-full shadow-md hover:bg-gray-200 transition"
            onClick={handleAddToCart}
          >
            <IoCartOutline className="text-lg bg-slate-100" />
          </button>
        </div>
      </div>
      <div className="mt-3 text-center py-2 rounded-md transition-colors bg-white group-hover:bg-blue-900 group-hover:text-white">
        <p className="font-serif text-[18px]">{product.name}</p>
        <p className="mt-1 text-[14px] font-mono">Code: {product.code}</p>
        <p className="text-[14px] font-sans">${product.price}</p>
      </div>
    </div>
  );
}
