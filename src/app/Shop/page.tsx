'use client';

import Image from "next/image";
import { useRouter } from "next/navigation";
import { IoCartOutline } from "react-icons/io5";
import { FaRegHeart } from "react-icons/fa";

export default function Home() {
  const router = useRouter();

  const products = [
    {rating:2, id: 33, name: "Vel elit eiusmod", price: 60, discountPrice: 45, image: "/pr1.png" },
    {rating:2, id: 34, name: "Ultricies condimentum", price: 75, discountPrice: 50, image: "/pr2.png" },
    {rating:2, id: 35, name: "Vitae suspendisse", price: 80, discountPrice: 60, image: "/pr3.png" },
    {rating:2, id: 36, name: "Sed at fermentum", price: 90, discountPrice: 65, image: "/watch1.png" },
    {rating:2, id: 37, name: "Fusce pellentesque", price: 100, discountPrice: 80, image: "/watch2.png" },
    {rating:2, id: 38, name: "Vestibulum magna", price: 120, discountPrice: 90, image: "/sofaa1.png" },
    {rating:2, id: 39, name: "Pellentesque condimentum", price: 85, discountPrice: 70, image: "/sofaa2.png" },
    {rating:2, id: 40, name: "Cras scelerisque vel it", price: 95, discountPrice: 75, image: "/camera.png" },
    {rating:2, id: 41, name: "Lectus vulputate faucibus", price: 110, discountPrice: 85, image: "/homesofa.png" },
    {rating:2, id: 42, name: "Solicitudin amet arcu", price: 105, discountPrice: 90, image: "/pr4.png" },
    {rating:2, id: 43, name: "Ultrices mauris sit", price: 115, discountPrice: 95, image: "/image17.png" },
    {rating:2, id: 44, name: "Pariar risus ut", price: 125, discountPrice: 100, image: "/image15.png" },
  ];

  const navigateToDetail = (id: number) => {
    router.push(`/ProductDetail/${id}`);
  };

  const handleAddToCart = (id: number) => {
    console.log(`Product ${id} added to cart`);
  };

  const handleAddToWishlist = (id: number) => {
    console.log(`Product ${id} added to wishlist`);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Ecommerce Accessories & Fashion Items</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white border rounded-md shadow-md p-4 cursor-pointer transform transition-transform hover:scale-105 hover:shadow-lg relative"
            >
              <div
                className="w-[200]
                h-[200] flex justify-center items-center"
                onClick={() => navigateToDetail(product.id)}
              >
                <Image
                  src={product.image}
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
                <div className="text-yellow-500 flex items-center">
                  {"★".repeat(product.rating)}

                </div>
              </div>

              {/* Buttons for Add to Cart and Wishlist */}
              <div className="flex justify-between items-center mt-4">
                <button
                  className="flex items-center gap-2 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition"
                  onClick={() => handleAddToCart(product.id)}
                >
                  <IoCartOutline className="text-lg" />
                  Add to Cart
                </button>
                <button
                  className="flex items-center gap-2 bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition"
                  onClick={() => handleAddToWishlist(product.id)}
                >
                  <FaRegHeart className="text-lg" />
                  Wishlist
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
