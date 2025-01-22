"use client";

import Link from "next/link";
import { MdAccountCircle } from "react-icons/md";
import { IoCartOutline } from "react-icons/io5";
import { useCart } from "@/app/components/CartProvider"; // Ensure this path is correct

const Head = () => {
  const { cartItems } = useCart(); // Access cartItems from the context

  return (
    <div className="bg-violet-600">
      {/* Navbar */}
      <div className="flex justify-between items-center h-[44px] px-4 sm:px-8">
        {/* Login */}
        <div>
          <Link href={"/Login"}>
            <div className="flex items-center gap-1 text-white text-[16px] font-semibold">
              Login <MdAccountCircle className="text-2xl" />
            </div>
          </Link>
        </div>

        {/* Cart */}
        <div>
          <Link href={"/Cart"}>
            <div className="flex items-center gap-1 text-white text-[16px] font-semibold relative">
              <IoCartOutline className="text-2xl" />
              {cartItems.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {cartItems.length}
                </span>
              )}
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Head;
