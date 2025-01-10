'use client';

import { useRouter } from "next/navigation"; // Updated import
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { client, urlFor } from "@/sanity/lib/client";

// Define the Product type
interface Product {
  name: string;
  tags: string[];
  code: string;
  colour: string[];
  discountPrice: number | null;
  price: number;
  image: { asset: { url: string } };
  section: string;
  category: string;
  currentSlug: string;
}

export default function RelatedProducts() {
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchRelatedProducts = async () => {
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
      }`;

      try {
        const fetchedProducts = await client.fetch(query);
        setRelatedProducts(fetchedProducts);
      } catch (error) {
        console.error('Error fetching related products:', error);
      }
    };

    fetchRelatedProducts();
  }, []);

  // Navigate to the product details page
  const handleNavigate = (currentSlug: string) => {
    router.push(`/ProductDetail/${currentSlug}`);
  };

  return (
    <div className="mt-16">
      <h2 className="font-bold text-2xl text-gray-800 mb-6">Related Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {relatedProducts.map((product) => (
          <div
            key={product.currentSlug}
            className="border hover:scale-105 border-gray-200 p-4 rounded-lg cursor-pointer hover:shadow-md transition-all"
            onClick={() => handleNavigate(product.currentSlug)} // Navigate on click
          >
            <Image
              src={urlFor(product.image).url()}
              height={340}
              width={270}
              alt={product.name}
              className="object-cover rounded-md mb-4"
            />
            <h3 className="font-medium text-gray-700 mb-2">{product.name}</h3>
            <p className="text-gray-500">{product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
