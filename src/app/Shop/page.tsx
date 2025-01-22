'use client';

import Image from "next/image";
import { useRouter } from "next/navigation";
import { IoCartOutline } from "react-icons/io5";
import { FaRegHeart } from "react-icons/fa";
import { useEffect, useState } from "react";
import { client } from "@/sanity/lib/client";
import { useCart } from "../components/CartProvider";
import { useSearch } from "@/app/Search/SearchContext"; // Import useSearch from SearchContext
import PopupMessage from "@/app/components/cartPopup"; // Import the PopupMessage component

interface Product {
  _id: string;
  currentSlug: any;
  name: string;
  price: number;
  discountPrice: number;
  src: any;
  reviews?: number;
  tags?: string[];
  category?: string;
  colour?: string;
  description?: string;
}

export default function Shop() {
  const { searchQuery, setSearchQuery } = useSearch(); // Get searchQuery and setSearchQuery from context
  const router = useRouter();
  const { addToCart } = useCart();
  const [products, setProducts] = useState<Product[]>([]);
  const [popupMessage, setPopupMessage] = useState<string | null>(null); // State for managing popup message

  // Fetch products from Sanity
  useEffect(() => {
    const fetchProducts = async () => {
      const query = `*[_type in ["product", "latestProduct", "trendingProduct", "relatedProduct"]] {
        name,
        price,
        "src": image.asset->url,
        discountPrice,
        reviews,
        tags,
        category,
        colour,
        description,
        "currentSlug": slug.current,
        _id
      }`;

      try {
        const data: Product[] = await client.fetch(query);
        setProducts(data); // Set the fetched products
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };

    fetchProducts();
  }, []);

  // Filter products based on the search query
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) // Filter using the global searchQuery
  );

  const navigateToDetail = (currentSlug: string) => {
    router.push(`/ProductDetail/${currentSlug}`);
  };

  const handleAddToWishlist = (currentSlug: string) => {
    console.log(`Product ${currentSlug} added to wishlist`);
  };

  const handleAddToCart = (product: Product) => {
    addToCart({
      ...product,
      quantity: 1,
      image: product.src,
    });

    // Show popup message when item is added to cart
    setPopupMessage(`${product.name} added to cart!`);

    // Clear the message after 3 seconds
    setTimeout(() => {
      setPopupMessage(null);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Ecommerce Accessories & Fashion Items</h1>

        {/* Search bar */}
        <div className="flex mb-6">
          <input
            className="w-full md:w-[300px] rounded-md border border-gray-400 px-2 py-1 text-sm"
            type="text"
            placeholder="Search for products..."
            value={searchQuery} // Bind to the global searchQuery
            onChange={(e) => setSearchQuery(e.target.value)} // Correctly update the global searchQuery
          />
        </div>

        {/* Display filtered products */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div
                key={product.currentSlug}
                className="bg-white border rounded-md shadow-md p-4 cursor-pointer transform transition-transform hover:scale-105 hover:shadow-lg relative"
              >
                <div
                  className="w-[200px] h-[200px] flex justify-center items-center"
                  onClick={() => navigateToDetail(product.currentSlug)}
                >
                  <Image
                    src={product.src}
                    alt={product.name}
                    width={150}
                    height={150}
                    className="object-cover rounded-md transition-opacity duration-300 group-hover:opacity-80"
                  />
                </div>
                <div className="mt-4">
                  <h3 className="text-lg font-semibold">{product.name}</h3>
                  <div className="flex items-center mt-2">
                    <span className="text-red-500 font-bold mr-2">${product.discountPrice}</span>
                    <span className="line-through text-gray-500">${product.price}</span>
                  </div>
                </div>

                {/* Buttons for Add to Cart and Wishlist */}
                <div className="flex justify-between items-center mt-4">
                  <button
                    className="flex items-center gap-2 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition"
                    onClick={() => handleAddToCart(product)}
                  >
                    <IoCartOutline className="text-lg" />
                    Add to Cart
                  </button>
                  <button
                    className="flex items-center gap-2 bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition"
                    onClick={() => handleAddToWishlist(product.currentSlug)}
                  >
                    <FaRegHeart className="text-lg" />
                    Wishlist
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>No products found for your search.</p>
          )}
        </div>
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
