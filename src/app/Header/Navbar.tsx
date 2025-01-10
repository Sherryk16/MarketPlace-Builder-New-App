"use client"
import { useState } from "react";
import Link from "next/link";
import { CiSearch } from "react-icons/ci"; // Ensure you import the search icon

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };


  return (
    <div className="mb-5 relative z-50 flex flex-wrap items-center justify-between px-4 py-3 md:justify-around ">
      {/* Logo Section */}
      <div className="font-bold text-[24px] md:text-[34px]">
        <h1>Hekto</h1>
      </div>

      {/* Hamburger Menu Button for Mobile */}
      <div className="md:hidden">
        <button
          className="text-black focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? "✖" : "☰"}
        </button>
      </div>

      {/* Navigation Links */}
      <div
        className={`w-full md:w-auto md:flex ${
          isMenuOpen ? "block" : "hidden"
        }`}
      >
        <ul className="flex flex-col md:flex-row gap-4 text-black font-medium text-[14px] md:text-[16px] justify-center">
          <Link href="/">
            <li className="hover:text-pink-600 cursor-pointer">Home</li>
          </Link>
          <div className="relative">
          <li
            className="hover:text-pink-600 cursor-pointer"
            onClick={toggleDropdown}
          >
            Pages
          </li>
          {isDropdownOpen && (
            <ul className="absolute top-full left-0 bg-white shadow-lg rounded-md mt-2 w-40">
              <Link href="/about">
                <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">
                  About Us
                </li>
              </Link>
              <Link href="/Login">
                <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">
                  My Account
                </li>
              </Link>
              <Link href="/AboutUs">
                <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">
                  About Us
                </li>
              </Link>
              <Link href="/Contact">
                <li className="px-4 py-2 text-black hover:bg-gray-200 cursor-pointer">
                  Contact Us
                </li>
              </Link>
              <Link href="/faq">
                <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">
                  FAQ
                </li>
              </Link>
            </ul>
          )}
          </div>
          <Link href="/ShopList">
            <li className="hover:text-pink-600 cursor-pointer">Products</li>
          </Link>
          <Link href="/Pages/Blog">
            <li className="hover:text-pink-600 cursor-pointer">Blog</li>
          </Link>
          <Link href="/Shop">
            <li className="hover:text-pink-600 cursor-pointer">Shop</li>
          </Link>
          <Link href="/Contact">
            <li className="hover:text-pink-600 cursor-pointer">Contact</li>
          </Link>
        </ul>
      </div>

      {/* Search Input and Button */}
      <div className="flex items-center w-full md:w-auto mt-3 md:mt-0 justify-center md:justify-end gap-2">
        <input
          className="w-full md:w-[200px] rounded-md border border-gray-400 px-2 py-1 text-sm"
          type="text"
          placeholder="Search..."
        />
        <button className="text-lg text-white bg-pink-600 h-8 flex items-center justify-center rounded-md w-8">
          <CiSearch />
        </button>
      </div>
    </div>
  );
}
