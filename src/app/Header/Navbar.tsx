'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { CiSearch } from 'react-icons/ci';
import { client } from '@/sanity/lib/client';
import { useRouter } from 'next/navigation';
import { useSearch } from '@/app/Search/SearchContext';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const { searchQuery, setSearchQuery } = useSearch();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();

  // Function to fetch search results from Sanity
  const fetchSearchResults = async () => {
    if (!searchQuery.trim()) return;

    setIsSearching(true);
    try {
      console.log('Fetching search results for:', searchQuery);
      const query = `
        *[_type in ["product", "latestProduct", "trendingProduct", "relatedProduct"] && name match "${searchQuery}*"] {
          _id,
          name,
          price,
          "src": image.asset->url,
          discountPrice,
          reviews,
          tags,
          category,
          colour,
          description,
          "currentSlug": slug.current
        }
      `;
      const results = await client.fetch(query);
      console.log('Search Results:', results);
      setSearchResults(results);
    } catch (error) {
      console.error('Error fetching search results:', error);
    } finally {
      setIsSearching(false);
    }
  };

  // Trigger search when the searchQuery changes
  useEffect(() => {
    if (searchQuery.trim()) {
      fetchSearchResults();
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]); // Runs whenever searchQuery changes

  const handleSearchSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    fetchSearchResults();
    router.push(`/Shop?search=${searchQuery}`);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Handle click outside of the search bar to close it
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setIsSearchOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  // Handle product click to navigate to the Shop page with the search query
  const handleProductClick = (productName: string) => {
    // Navigate to the Shop page with the search query
    router.push(`/Shop?search=${productName}`);
  };

  return (
    <div className="mb-5 relative z-50 flex flex-wrap items-center justify-between px-4 py-3 md:justify-around">
      <Link href={'/'}>
      <div className="font-bold text-[24px] md:text-[34px]">
        <h1>Hekto</h1>
      </div>
      </Link>

      {/* Hamburger Menu Button for Mobile */}
      <div className="md:hidden">
        <button
          className="text-black focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? '✖' : '☰'}
        </button>
      </div>

      {/* Navigation Links */}
      <div
        className={`w-full md:w-auto md:flex ${isMenuOpen ? 'block' : 'hidden'}`}
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
                <Link href="/admin">
                  <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">
                   Admin Page
                  </li>
                </Link>
                <Link href="/AboutUs">
                  <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">
                    About Us
                  </li>
                </Link>
                <Link href="/Login">
                  <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">
                    My Account
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
          <Link href="/Blog">
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
      <form
        onSubmit={handleSearchSubmit}
        className="flex items-center w-full md:w-auto justify-center md:justify-end gap-2 mt-3 md:mt-0"
      >
        <div ref={searchRef} className="relative">
          <input
            className="w-full md:w-[200px] rounded-md border border-gray-400 px-2 py-1 text-sm"
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onFocus={() => setIsSearchOpen(true)}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button
            type="submit"
            className="absolute right-0 top-0 bottom-0 text-lg text-white bg-pink-600 h-8 flex items-center justify-center rounded-md w-8"
          >
            <CiSearch />
          </button>
        </div>
      </form>

      {/* Search Results Dropdown */}
      {isSearchOpen && searchQuery && searchResults.length > 0 && (
        <div className="absolute top-full left-0 right-0 bg-white shadow-lg rounded-md mt-2 p-4 z-50">
          <ul>
            {searchResults.map((product: any) => (
              <li
                key={product._id}
                className="flex items-center justify-between py-2 px-4 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleProductClick(product.name)} // Navigate to the Shop page with search query
              >
                <div>
                  <h3 className="font-semibold">{product.name}</h3>
                  <p className="text-sm text-gray-600">${product.price}</p>
                </div>
                <img
                  src={product.src}
                  alt={product.name}
                  className="w-12 h-12 object-cover rounded-md"
                />
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* No Results */}
      {isSearchOpen && searchQuery && !isSearching && searchResults.length === 0 && (
        <div className="absolute top-full left-0 right-0 bg-white shadow-lg rounded-md mt-2 p-4 z-50 text-center text-gray-500">
          No products found for "{searchQuery}"
        </div>
      )}

      {/* Loading State */}
      {isSearching && (
        <div className="absolute top-full left-0 right-0 bg-white shadow-lg rounded-md mt-2 p-4 z-50 text-center">
          Searching...
        </div>
      )}
    </div>
  );
}
