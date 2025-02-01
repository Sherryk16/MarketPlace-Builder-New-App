'use client';

import { useState, useEffect } from "react";
import { useCart } from "@/app/components/CartProvider"; // Assuming you're using a Cart context
import { urlFor } from "@/sanity/lib/client";
import { useRouter } from "next/navigation";
import { useUser, useClerk } from "@clerk/clerk-react"; // Import Clerk's hooks
import Image from "next/image";

export default function CheckoutPage() {
  const { cartItems } = useCart();
  const router = useRouter();
  const { isLoaded, isSignedIn } = useUser(); // Get user status from Clerk
  const { redirectToSignIn } = useClerk(); // Clerk's method to redirect to login page

  useEffect(() => {
    // Redirect to login page if not signed in
    if (isLoaded && !isSignedIn) {
      redirectToSignIn(); // This will navigate the user to Clerk's login page
    }
  }, [isLoaded, isSignedIn, redirectToSignIn]);

  const [formData, setFormData] = useState({
    name: "",
    address: "",
    apartment: "",
    city: "",
    postalCode: "",
    country: "Bangladesh",
    email: "",
    phone: "",
    deliveryMethod: "Standard",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const calculateSubtotal = () =>
    cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const calculateShipping = (method: string) => {
    const shippingRates: { [key: string]: number } = {
      Standard: 15,
      Express: 25,
      Overnight: 50,
    };
    return shippingRates[method] || 15;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // Simple form validation
    if (
      !formData.email ||
      !formData.name ||
      !formData.address ||
      !formData.city ||
      !formData.postalCode ||
      !formData.phone
    ) {
      setError("Please fill in all required fields.");
      setIsLoading(false);
      return;
    }

    try {
      // Send data to your backend to create a checkout session
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items: cartItems,
          shippingAddress: formData,
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to create session: ${response.statusText}`);
      }

      const { id } = await response.json();
      const stripe = await import("@stripe/stripe-js").then((m) =>
        m.loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)
      );

      if (stripe) {
        const result = await stripe.redirectToCheckout({ sessionId: id });
        if (result.error) {
          setError(result.error.message || "Something went wrong with Stripe.");
        }
      }
    } catch (err) {
      console.error("Checkout Error:", err);
      setError("Failed to process payment. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isLoaded) return <div>Loading...</div>; // Wait for the Clerk data to load

  return (
    <div className="container mx-auto p-4 lg:p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Left Section: Form */}
      <div className="lg:col-span-2 bg-gray-50 p-8 rounded-lg shadow-lg">
        <form onSubmit={handleSubmit} className="space-y-8">
          <div>
            <h2 className="text-lg font-semibold text-[#1D3178]">Contact Information</h2>
            <input
              type="email"
              placeholder="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full border-b-2 border-gray-300 bg-transparent p-2 focus:outline-none focus:border-pink-500"
            />
            <input
              type="tel"
              placeholder="Phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="mt-2 w-full border-b-2 border-gray-300 bg-transparent p-2 focus:outline-none focus:border-pink-500"
            />
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-4 text-[#1D3178]">Shipping Address</h2>
            <input
              type="text"
              placeholder="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full border-b-2 border-gray-300 bg-transparent p-2 focus:outline-none focus:border-pink-500"
            />
            <input
              type="text"
              placeholder="Address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
              className="w-full mt-4 border-b-2 border-gray-300 bg-transparent p-2 focus:outline-none focus:border-pink-500"
            />
            <input
              type="text"
              placeholder="Apartment, suite, etc. (optional)"
              name="apartment"
              value={formData.apartment}
              onChange={handleChange}
              className="w-full mt-4 border-b-2 border-gray-300 bg-transparent p-2 focus:outline-none focus:border-pink-500"
            />
            <div className="grid grid-cols-2 gap-4 mt-4">
              <input
                type="text"
                placeholder="City"
                name="city"
                value={formData.city}
                onChange={handleChange}
                required
                className="w-full border-b-2 border-gray-300 bg-transparent p-2 focus:outline-none focus:border-pink-500"
              />
              <input
                type="text"
                placeholder="Postal Code"
                name="postalCode"
                value={formData.postalCode}
                onChange={handleChange}
                required
                className="w-full border-b-2 border-gray-300 bg-transparent p-2 focus:outline-none focus:border-pink-500"
              />
            </div>
            <select
              name="country"
              value={formData.country}
              onChange={handleChange}
              required
              className="w-full mt-4 border-b-2 border-gray-300 bg-transparent p-2 focus:outline-none focus:border-pink-500"
            >
              <option value="Bangladesh">Bangladesh</option>
            </select>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-4 text-[#1D3178]">Delivery Method</h2>
            <select
              name="deliveryMethod"
              value={formData.deliveryMethod}
              onChange={handleChange}
              required
              className="w-full border-b-2 border-gray-300 bg-transparent p-2 focus:outline-none focus:border-pink-500"
            >
              <option value="Standard">Standard</option>
              <option value="Express">Express</option>
              <option value="Overnight">Overnight</option>
            </select>
          </div>

          {error && <p className="text-red-500">{error}</p>}
          <button
            type="submit"
            className="w-full py-3 bg-pink-500 text-white font-medium rounded-lg hover:bg-pink-600 disabled:opacity-50"
            disabled={isLoading}
          >
            {isLoading ? "Processing..." : "Proceed to Payment"}
          </button>
        </form>
      </div>

      {/* Right Section: Order Summary */}
      <div>
        <div className="bg-gray-100 p-4 md:p-6 rounded-lg shadow-lg">
          <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-4">Your Order</h3>
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div key={item.id} className="flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <Image
                    src={urlFor(item.image).url()}
                    alt={item.name}
                    width={50}
                    height={50}
                    className="rounded-md"
                  />
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-gray-500">
                      Qty: {item.quantity}
                    </p>
                  </div>
                </div>
                <div className="text-gray-800 font-medium">
                  ${item.price * item.quantity}
                </div>
              </div>
            ))}
          </div>
          <hr className="my-4" />
          <div className="flex justify-between text-gray-800 font-medium mb-2">
            <span>Subtotal:</span>
            <span>${calculateSubtotal().toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-gray-800 font-medium mb-2">
            <span>Shipping:</span>
            <span>${calculateShipping(formData.deliveryMethod).toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-gray-800 font-medium mb-4">
            <span>Total:</span>
            <span>${(calculateSubtotal() + calculateShipping(formData.deliveryMethod)).toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
