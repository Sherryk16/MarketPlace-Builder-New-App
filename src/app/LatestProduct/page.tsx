'use client'; // Correct directive for client-side rendering

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { client, urlFor } from '@/sanity/lib/client'; // Sanity client setup
import Link from 'next/link'; // Import Link from next/link
import { IoCartOutline } from 'react-icons/io5'; // Cart Icon
import { FaRegHeart } from 'react-icons/fa'; // Heart Icon for Wishlist
import { useCart } from "@/app/components/CartProvider";
import PopupMessage from "@/app/components/cartPopup"; // Import the PopupMessage component

// Define the type for the Sanity image asset
interface SanityImage {
  asset: {
    _ref: string;
    _type: string;
    url: string; // Ensure url is part of the image asset
  };
}

interface Product {
  id: string;
  name: string;
  code: string;
  price: number;
  image: SanityImage; // Updated to use the SanityImage type
  currentSlug: string;
  discount: number;
  quantity: number;
  _id: string; // Adding _id field as required
}

export default function ProductSection() {
  const [selectedCategory, setSelectedCategory] = useState<string>('new-arrival');
  const { addToCart } = useCart(); // Ensure this is set up correctly
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [popupMessage, setPopupMessage] = useState<string | null>(null); // State to control the popup message

  // Handle category click event
  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
  };

  // Fetch products for the selected category
  useEffect(() => {
    const fetchProducts = async () => {
      const query = `*[_type == 'latestProduct' && section == $category] | order(_createdAt desc) {
        name, code, price, discount, image, section, "currentSlug": slug.current
      }`;
      const params = { category: selectedCategory };

      try {
        const data = await client.fetch(query, params);
        const formattedData = data.map((item: any) => ({
          id: item.code || `${item.name}-${Math.random()}`,
          image: item.image, // SanityImage is automatically inferred here
          name: item.name,
          price: item.price,
          discount: item.discount || 0,
          currentSlug: item.currentSlug || '',
          quantity: 1, // Initialize quantity to 1
          _id: item._id || item.code, // Ensure _id is set
        }));
        setProducts(formattedData);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [selectedCategory]);

  if (loading) return <p>Loading...</p>;

  const handleAddToCart = (product: Product) => {
    // Ensure the image URL is properly set from the SanityImage object
    const imageUrl = product.image.asset.url;

    // Add the product to the cart with _id and imageUrl correctly set
    addToCart({
      ...product,
      quantity: 1,
      imageUrl: imageUrl, // Now we're using the correct image URL
    });

    // Set the popup message
    setPopupMessage(`${product.name} added to cart!`);

    // Clear the message after 3 seconds
    setTimeout(() => {
      setPopupMessage(null);
    }, 3000);
  };

  return (
    <div>
      {/* Section Heading */}
      <div className="text-[#1A0B5B] text-[32px] md:text-[42px] font-semibold text-center mb-8 mt-10">
        Latest Products
      </div>

      {/* Category Selector */}
      <ul className="flex justify-center items-center gap-4 text-sm md:text-base mb-8">
        {['new-arrival', 'best-seller', 'featured', 'special-offer'].map((category) => (
          <li key={category}>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handleCategoryClick(category);
              }}
              className={`${
                selectedCategory === category
                  ? 'text-pink-600 font-bold border-b-2 border-pink-600'
                  : 'text-gray-700 hover:text-pink-600'
              }`}
            >
              {category.replace('-', ' ').toUpperCase()}
            </a>
          </li>
        ))}
      </ul>

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4 sm:px-8 mt-8">
        {products.length === 0 ? (
          <p className="text-center text-gray-500">No products available in this category.</p>
        ) : (
          products.map((item) => (
            <div
              key={item.id}
              className="group bg-white p-6 rounded-lg shadow-lg hover:scale-105 transition-transform cursor-pointer relative"
            >
              {/* Product Image */}
              <div className="relative w-full h-[300px] bg-slate-100 flex justify-center items-center">
                {item.image ? (
                  <Image
                    src={urlFor(item.image).url()}
                    width={250}
                    height={250}
                    alt={`Image of ${item.name}`}
                    objectFit="cover"
                  />
                ) : (
                  <div className="w-[250px] h-[250px] bg-gray-200 flex items-center justify-center">
                    No Image
                  </div>
                )}
              </div>

              {/* Product Details */}
              <div className="flex flex-col items-center mt-4">
                <p className="text-lg font-semibold text-gray-900">{item.name}</p>
                <div className="flex gap-3 items-center mt-2">
                  <p className="text-xl text-pink-600 font-semibold">{`$${item.price}`}</p>
                  {item.discount > 0 && (
                    <p className="text-sm text-gray-400 line-through">{`$${item.discount}`}</p>
                  )}
                </div>
              </div>

              {/* Buttons (Cart and Heart) */}
              <div className="absolute top-2 left-2 flex flex-col gap-4 opacity-0 group-hover:opacity-100 transition-opacity">
                {/* Cart Button */}
                <button
                  className="p-2 rounded-full shadow-md bg-gray-200 hover:bg-gray-300 transition"
                  onClick={() => handleAddToCart(item)} // Add product to cart
                >
                  <IoCartOutline className="text-lg text-gray-700" />
                </button>

                {/* Wishlist Button */}
                <button className="p-2 rounded-full shadow-md bg-gray-200 hover:bg-gray-300 transition">
                  <FaRegHeart className="text-lg text-gray-700" />
                </button>
              </div>

              {/* Link to Product Detail */}
              <Link href={`/ProductDetail/${item.currentSlug}`} passHref>
                <button className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded-md text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                  View Details
                </button>
              </Link>
            </div>
          ))
        )}
      </div>

      {/* Show the PopupMessage component */}
      {popupMessage && (
        <PopupMessage
          message={popupMessage}
          onClose={() => setPopupMessage(null)}
        />
      )}
    </div>
  );
}
