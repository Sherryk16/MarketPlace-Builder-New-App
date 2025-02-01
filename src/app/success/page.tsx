"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

const Success = () => {
  const [orderUpdated, setOrderUpdated] = useState(false);
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const orderId = searchParams.get("order_id");

  useEffect(() => {
    if (sessionId && orderId) {
      updateOrderStatus(sessionId, orderId);
    }
  }, [sessionId, orderId]);

  const updateOrderStatus = async (sessionId: string, orderId: string) => {
    try {
      const response = await fetch(`/api/checkout`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId, orderId }),
      });

      const data = await response.json();
      if (response.ok) {
        console.log("✅ Order updated:", data);
        setOrderUpdated(true);
      } else {
        console.error("❌ Failed to update order:", data.error);
      }
    } catch (error) {
      console.error("❌ Error updating order:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4 py-8">
      <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 text-center max-w-lg w-full">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-800">Order Placed!</h1>
        <p className="text-gray-600 mt-2">
          {orderUpdated
            ? "Your payment has been confirmed. Thank you for shopping!"
            : "Processing your order. Please wait..."}
        </p>
        <a
          href="/"
          className="mt-4 bg-pink-500 text-white px-6 sm:px-8 py-3 w-full sm:w-auto text-center rounded-full font-semibold hover:bg-pink-600 transition block"
        >
          Continue Shopping
        </a>
      </div>
    </div>
  );
};

export default Success;
