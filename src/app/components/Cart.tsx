'use client'

import { useCart } from "@/app/components/CartProvider";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/client";
import Link from "next/link";

export default function CartPage() {
  const { cartItems, addToCart, removeFromCart } = useCart();

  const calculateSubtotal = () =>
    cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="container mx-auto p-4 lg:p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Cart Items Section */}
      <div className="lg:col-span-2">
        <table className="w-full border-collapse border border-gray-300">
          <thead className="bg-gray-200 text-left">
            <tr>
              <th className="p-2 md:p-4 border border-gray-300">Product</th>
              <th className="p-2 md:p-4 border border-gray-300">Price</th>
              <th className="p-2 md:p-4 border border-gray-300">Quantity</th>
              <th className="p-2 md:p-4 border border-gray-300">Total</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item) => (
              <tr key={item.currentSlug} className="text-center">
                <td className="p-2 md:p-4 border border-gray-300 flex flex-col md:flex-row items-center gap-4">
                  <Image
                    src={urlFor(item.image).url() || '/placeholder.jpg'}  // Fallback image
                    alt={item.name}
                    width={60}
                    height={60}
                    className="rounded-md"
                  />
                  <div className="text-left">
                    <p className="font-semibold">{item.name}</p>
                    <p className="text-sm text-gray-500">Size: XL</p>
                  </div>
                </td>
                <td className="p-2 md:p-4 border border-gray-300">
                  ${item.price}
                </td>
                <td className="p-2 md:p-4 border border-gray-300">
                  <div className="flex justify-center items-center gap-2">
                    <button
                      className="px-2 py-1 border border-gray-300 bg-gray-100 rounded-md"
                      onClick={() => addToCart({ ...item, quantity: item.quantity + 1 })}
                    >
                      +
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      className="px-2 py-1 border border-gray-300 bg-gray-100 rounded-md"
                      onClick={() => removeFromCart(item.currentSlug)}
                    >
                      -
                    </button>
                  </div>
                </td>
                <td className="p-2 md:p-4 border border-gray-300">
                  ${item.price * item.quantity}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex flex-col sm:flex-row justify-between mt-4 gap-2">
          <button className="px-4 py-2 bg-pink-500 text-white rounded-md w-full sm:w-auto">
            Update Cart
          </button>
          <button className="px-4 py-2 bg-pink-500 text-white rounded-md w-full sm:w-auto">
            Clear Cart
          </button>
        </div>
      </div>

      {/* Cart Summary Section */}
      <div>
        <div className="bg-gray-100 p-4 md:p-6 rounded-lg shadow-lg">
          <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-4">
            Cart Totals
          </h3>
          <div className="flex justify-between mb-2">
            <span>Subtotal:</span>
            <span>${calculateSubtotal().toFixed(2)}</span>
          </div>
          <div className="flex justify-between mb-4">
            <span>Totals:</span>
            <span>${(calculateSubtotal() + 5).toFixed(2)}</span>
          </div>
          <Link href={'/checkout'}>
            <button className="w-full bg-green-500 text-white py-2 rounded-md">
              Proceed to Checkout
            </button>
          </Link>
        </div>

        <div className="bg-gray-100 p-4 md:p-6 rounded-lg shadow-lg mt-6">
          <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-4">
            Calculate Shipping
          </h3>
          <input
            type="text"
            placeholder="Country"
            className="w-full mb-2 px-4 py-2 border rounded-md"
          />
          <input
            type="text"
            placeholder="Mirpur Dhaka"
            className="w-full mb-2 px-4 py-2 border rounded-md"
          />
          <input
            type="text"
            placeholder="Postal Code"
            className="w-full mb-4 px-4 py-2 border rounded-md"
          />
          <button className="w-full bg-pink-500 text-white py-2 rounded-md">
            Calculate Shipping
          </button>
        </div>
      </div>
    </div>
  );
}
