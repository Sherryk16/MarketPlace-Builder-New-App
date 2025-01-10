"use client";

import React from "react";
import Slider from "react-slick";
import Image from "next/image";
import Link from "next/link";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const products = [
  {
    id: 29,
    name: "Mini LCW Chair",
    price: "$56.00",
    image: "/top1.png",
    slug: "mini-lcw-chair",
  },
  {
    id: 30,
    name: "Modern Chair",
    price: "$70.00",
    image: "/chair2.png",
    slug: "modern-chair",
  },
  {
    id: 31,
    name: "Classic Wooden Chair",
    price: "$85.00",
    image: "/chair3.png",
    slug: "classic-wooden-chair",
  },
  {
    id: 32,
    name: "Designer Chair",
    price: "$95.00",
    image: "/chair4.png",
    slug: "designer-chair",
  },
];

export default function TopCategories() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 1 },
      },
    ],
    customPaging: () => (
      <div
        className="w-3 h-3 rounded-full bg-gray-300 hover:bg-pink-500 transition duration-300"
        style={{ margin: "0 5px" }}
      />
    ),
    dotsClass: "slick-dots flex justify-center mt-6",
  };

  return (
    <div className="text-center py-10">
      {/* Section Title */}
      <h2 className="text-4xl font-bold text-blue-900 mb-8">Top Categories</h2>

      {/* Slider */}
      <Slider {...settings}>
        {products.map((product) => (
          <div key={product.id} className="px-4">
            <div className="group flex flex-col items-center relative">
              {/* Image Container */}
              <div className="relative mt-5">
                <div className="w-40 h-40 rounded-full bg-purple-100 flex items-center justify-center relative overflow-hidden group-hover:ring-4 group-hover:ring-purple-500">
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={100}
                    height={100}
                    className="object-contain"
                  />
                </div>
                {/* Button */}
                <Link
                  href={`/ProductDetail/${product.slug}`}
                  className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-1 rounded-full text-sm shadow-md opacity-0 group-hover:opacity-100 transition-all duration-300"
                >
                  View Shop
                </Link>
              </div>
              {/* Product Info */}
              <h3 className="text-lg font-semibold mt-10">{product.name}</h3>
              <p className="text-gray-500">{product.price}</p>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}
