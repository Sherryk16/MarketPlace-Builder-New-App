'use client';
import React, { useState } from "react";
import { useRouter } from "next/navigation"; // Import Next.js router
import { IoCartOutline } from "react-icons/io5";
import { FaRegHeart } from "react-icons/fa";

export default function Shop() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const router = useRouter(); // Initialize router

  // Sample product data (replace with API data later)
  const products = [
    {
      id: 45,
      name: "Dictum morbi",
      image: "/chair1.png",
      price: 20.0,
      originalPrice: 30.0,
      rating: 5,
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Magna in est adipiscing in phasellus non in justo.",
    },
    {
      id: 46,
      name: "Sodales sit",
      image: "/chair2.png",
      price: 15.0,
      originalPrice: 25.0,
      rating: 4,
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Magna in est adipiscing in phasellus non in justo.",
    },
    {
      id: 47,
      name: "Mauris quis",
      image: "/chair3.png",
      price: 25.0,
      originalPrice: 40.0,
      rating: 5,
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Magna in est adipiscing in phasellus non in justo.",
    },
  ];

  // Function to handle navigation to the product detail page
  const navigateToDetail = (id: number) => {
    router.push(`/ProductDetail/${id}`); // Navigate to the dynamic route
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar Toggle Button for Mobile */}
        <button
          className="md:hidden bg-blue-500 text-white px-4 py-2 rounded"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          {isSidebarOpen ? "Close Menu" : "Menu"}
        </button>

        {/* Sidebar */}
        <div
          className={`absolute md:relative bg-white w-3/4 md:w-1/4 p-6 shadow-md md:shadow-none transform md:transform-none ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } transition-transform duration-300 ease-in-out z-10`}
        >
          <div className="space-y-6">
            {/* Product Brand */}
            <div>
              <h2 className="font-bold text-lg mb-3">Product Brand</h2>
              <ul className="space-y-2">
                <li>
                  <input type="checkbox" id="brand1" />
                  <label htmlFor="brand1"> Coaster Furniture</label>
                </li>
                <li>
                  <input type="checkbox" id="brand2" />
                  <label htmlFor="brand2"> Fusion Dot High Fashion</label>
                </li>
                <li>
                  <input type="checkbox" id="brand3" />
                  <label htmlFor="brand3"> Unique Furniture Restor</label>
                </li>
                <li>
                  <input type="checkbox" id="brand4" />
                  <label htmlFor="brand4"> Dream Furniture Flipping</label>
                </li>
              </ul>
            </div>

            {/* Categories */}
            <div>
              <h2 className="font-bold text-lg mb-3">Categories</h2>
              <ul className="space-y-2">
                <li>
                  <input type="checkbox" id="category1" />
                  <label htmlFor="category1"> Prestashop</label>
                </li>
                <li>
                  <input type="checkbox" id="category2" />
                  <label htmlFor="category2"> Magento</label>
                </li>
                <li>
                  <input type="checkbox" id="category3" />
                  <label htmlFor="category3"> Bigcommerce</label>
                </li>
                <li>
                  <input type="checkbox" id="category4" />
                  <label htmlFor="category4"> osCommerce</label>
                </li>
              </ul>
            </div>

            {/* Price Filter */}
            <div>
              <h2 className="font-bold text-lg mb-3">Price Filter</h2>
              <ul className="space-y-2">
                <li>
                  <input type="checkbox" id="price1" />
                  <label htmlFor="price1"> $0.00 - $150.00</label>
                </li>
                <li>
                  <input type="checkbox" id="price2" />
                  <label htmlFor="price2"> $150.00 - $350.00</label>
                </li>
                <li>
                  <input type="checkbox" id="price3" />
                  <label htmlFor="price3"> $350.00 - $500.00</label>
                </li>
              </ul>
              <div className="mt-3">
                <input
                  type="text"
                  placeholder="Min - Max"
                  className="w-full border p-2 rounded"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Overlay to close sidebar on mobile */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-0 md:hidden"
            onClick={() => setIsSidebarOpen(false)}
          ></div>
        )}

        {/* Product List */}
        <div className="flex-1 space-y-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="flex flex-col md:flex-row gap-6 p-4 border rounded-md hover:shadow-lg cursor-pointer"
              onClick={() => navigateToDetail(product.id)} // Click event to navigate
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full md:w-36 h-36 object-cover md:order-none order-first"
              />
              <div className="space-y-2">
                <h3 className="text-lg font-semibold">{product.name}</h3>
                <div className="text-yellow-500 flex items-center">
                  {"★".repeat(product.rating)}
                </div>
                <div className="text-gray-600 line-through">
                  ${product.originalPrice.toFixed(2)}
                </div>
                <div className="text-red-500 font-bold">
                  ${product.price.toFixed(2)}
                </div>
                <p className="text-gray-500 text-sm">{product.description}</p>
                <div className="flex items-center gap-3 text-blue-500">
                  <button className="text-sm hover:underline">
                    <FaRegHeart />
                  </button>
                  <button className="text-sm hover:underline">
                    <IoCartOutline className="text-lg" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
