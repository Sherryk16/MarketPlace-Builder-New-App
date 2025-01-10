'use client';

import { useRouter } from "next/navigation"; // Updated import
import React from "react";
import Image from "next/image";
import { client ,urlFor} from "@/sanity/lib/client";

const query = `*[_type == 'relatedProduct']|order(_createdAt desc){
        name,
          tags,
        code,
          colour,
          discountPrice,
        price,
        image,
          section,
          category,
        "currentSlug": slug.current
      }`
      const relatedProducts= await client.fetch(query)
export default function RelatedProducts() {
  const router = useRouter();

  // Navigate to the product details page
  const handleNavigate = (currentSlug: number) => {
    router.push(`/ProductDetail/${currentSlug}`);
  };

  return (
    <div className="mt-16">
      <h2 className="font-bold text-2xl text-gray-800 mb-6">Related Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {relatedProducts.map((product:any) => (
          <div
            key={product.currentSlug}
            className="border  hover:scale-105  border-gray-200 p-4 rounded-lg cursor-pointer hover:shadow-md transition-all "
            onClick={() => handleNavigate(product.currentSlug)} // Navigate on click
          >
            <Image
              src={urlFor(product.image).url()}
              height={340}
              width={270}
              alt={product.name}
              className=" object-cover rounded-md mb-4"
            />
            <h3 className="font-medium text-gray-700 mb-2">{product.name}</h3>
            <p className="text-gray-500">{product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
