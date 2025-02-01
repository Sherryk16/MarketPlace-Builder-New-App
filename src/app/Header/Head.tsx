"use client";

import { MdAccountCircle } from "react-icons/md";
import { IoCartOutline } from "react-icons/io5";
import { useCart } from "@/app/components/CartProvider"; // Ensure this path is correct
import { useUser, UserButton, SignInButton } from "@clerk/nextjs";
import Link from "next/link";

const Head = () => {
  const { cartItems } = useCart(); // Access cartItems from the context
  const { isSignedIn, user } = useUser(); // Clerk authentication state

  return (
    <div className="bg-violet-600">
      {/* Navbar */}
      <div className="flex justify-between items-center h-[44px] px-4 sm:px-8">
        {/* Login or User Info */}
        <div>
          {isSignedIn ? (
            <div className="flex items-center gap-2 text-white">
              {/* User profile */}
              <span className="font-semibold text-[16px]">
                Hello, {user?.firstName || "User"}!
              </span>
              {/* UserButton for profile/logout */}
              <UserButton afterSignOutUrl="/" />
            </div>
          ) : (
            <SignInButton mode="modal">
              <button className="flex items-center gap-1 text-white text-[16px] font-semibold">
                Login <MdAccountCircle className="text-2xl" />
              </button>
            </SignInButton>
          )}
        </div>

        {/* Cart */}
        <div>
          
          <div className="flex items-center gap-1 text-white text-[16px] font-semibold relative">
          <Link href={'/Cart'}>  <IoCartOutline className="text-2xl" /></Link>
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {cartItems.length}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Head;
