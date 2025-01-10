'use client'; 

import { useState } from "react";
import Image from "next/image";

// Sample product data (this can later be replaced with data fetched from Sanity)
const productData = [
  {
    id: "wood-chair",
    name: "Wood Chair",
    image: "/chair1.png", // Image path for Wood Chair
    description: "Material expose like metals, Simple neutral colors, Clear lines and geometric figures",
  },
  {
    id: "plastic-chair",
    name: "Plastic Chair",
    image: "/plastic-chair.png", // Image path for Plastic Chair
    description: "Material oppose like metals, Clear lines and geometric figures, Lightweight and durable",
  },
  {
    id: "sofa-collection",
    name: "Sofa Collection",
    image: "/sofa-collection.png", 
    description: "Comfortable, Soft cushions, Stylish designs",
  },
];

export default function DiscountSection() {
  // State to track the selected product category
  const [selectedProduct, setSelectedProduct] = useState<string>("wood-chair");

  // Function to handle category selection (this will be used when a link is clicked)
  const handleProductSelect = (productId: string) => {
    setSelectedProduct(productId);
  };

  // Get selected product data based on selectedProduct state
  const selectedProductData = productData.find((product) => product.id === selectedProduct);

  return (
    <div className="flex items-center justify-center px-4 py-10 lg:px-10 h-auto lg:h-[597px] mx-auto">
      <div className="relative bg-white shadow-lg rounded-lg flex flex-wrap lg:flex-nowrap items-center w-full max-w-[1214px]">
        {/* Left Section */}
        <div className="p-6 md:p-8 w-full lg:w-1/2">
          <div className="text-sm text-gray-600 space-x-3 mb-4 text-center lg:text-left">
            {productData.map((product) => (
              <span
                key={product.id}
                className="cursor-pointer hover:underline"
                onClick={() => handleProductSelect(product.id)}
              >
                {product.name}
              </span>
            ))}
          </div>
          <h2 className="text-2xl md:text-4xl font-bold mb-4 text-center lg:text-left">
            20% Discount Of All Products
          </h2>
          <p className="text-gray-700 mb-6 text-center lg:text-left">{selectedProductData?.name}</p>
          <ul className="space-y-2 mb-6 text-gray-700 text-sm md:text-base">
            {selectedProductData?.description.split(", ").map((desc, index) => (
              <li key={index} className="flex items-center justify-center lg:justify-start">
                <span className="mr-2 text-green-600">✔</span>{desc}
              </li>
            ))}
          </ul>
          <div className="flex justify-center lg:justify-start">
            <button className="bg-pink-500 text-white px-6 py-2 rounded-md hover:bg-pink-600">
              Shop Now
            </button>
          </div>
        </div>

        {/* Right Section */}
        <div className="w-full lg:w-1/2 flex items-center justify-center relative">
          <div className="rounded-full bg-pink-100 w-48 h-48 md:w-72 md:h-72 absolute"></div>
          {/* Dynamically change the image based on the selected product */}
          <Image
            src={selectedProductData?.image || "/placeholder.png"} // Default placeholder if no image is selected
            alt={selectedProductData?.name || "Product Image"}
            width={72}
            height={72}
            className="relative w-48 h-48 md:w-72 md:h-72 object-cover"
          />
        </div>
      </div>
    </div>
  );
}
