'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { client, urlFor } from '@/sanity/lib/client';
import Image from 'next/image';
import RelatedProducts from '@/app/RelatedProducts/page';
import { useCart } from "@/app/components/CartProvider";
import Link from 'next/link';

interface SanityImage {
  asset: {
    url: any;
    _ref: string;
    _type: string;
  };
  url?: string;  // Add url property for direct use cases
}

interface Product {
  _id: string;
  currentSlug: string;
  name: string;
  price: number;
  image: SanityImage;  // image can either be a string (URL) or a SanityImage object
  quantity: number;
  discountPrice?: number | null;
  reviews?: string;
  tags?: string[];
  code: string;
  category?: string;
  colour?: string | string[];
  description?: string;
}

const SingleProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setError('Invalid product ID');
      setLoading(false);
      return;
    }

    const fetchProduct = async () => {
      try {
        const query = `
          *[_type in ["product", "latestProduct", "trendingProduct", "relatedProduct"] && slug.current == $slug] {
            name,
            price,
            "src": image.asset->url,
            discountPrice,
            reviews,
            tags,
            category,
            colour,
            description,
            _id
          }
        `;

        const params = { slug: id };

        const data = await client.fetch(query, params);

        if (data && data.length > 0) {
          const fetchedProduct = data[0];
          setProduct({
            _id: fetchedProduct._id,
            currentSlug: Array.isArray(id) ? id[0] : id, // Ensure currentSlug is a string
            name: fetchedProduct.name,
            price: typeof fetchedProduct.price === 'string' ? parseFloat(fetchedProduct.price) : fetchedProduct.price,
            image: fetchedProduct.src || '', // Directly assign the src or empty string
            quantity: 1,
            discountPrice: fetchedProduct.discountPrice || null,
            reviews: fetchedProduct.reviews || '',
            tags: fetchedProduct.tags || [],
            code: fetchedProduct._id,
            category: fetchedProduct.category || '',
            colour: fetchedProduct.colour || [],
            description: fetchedProduct.description || '',
          });
        } else {
          setError('Product not found');
        }
      } catch (err) {
        console.error('Error fetching product:', err);
        setError('An error occurred while fetching the product.');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!product) return <p>Product not found</p>;

  return (
    <div className="container mx-auto p-6">
      <ProductDetail product={product} />
      <DescriptionSection product={product} />
    </div>
  );
};

const ProductDetail = ({ product }: { product: Product }) => {
  const { addToCart } = useCart();
  const [activeImage, setActiveImage] = useState<string>(getImageUrl(product.image));

  const handleThumbnailClick = (img: string) => setActiveImage(img);

  const handleAddToCart = () => {
    const productWithIdAndQuantity = {
      _id: product._id,
      currentSlug: product.currentSlug,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
      discountPrice: product.discountPrice,
      reviews: product.reviews,
      tags: product.tags,
      code: product.code,
      category: product.category,
      colour: product.colour,
      description: product.description,
    };
    addToCart(productWithIdAndQuantity);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-[120px_1fr_2fr] gap-4 shadow-lg p-6 rounded-lg bg-white">
      {/* Thumbnails */}
      <div className="flex flex-col items-start gap-4">
        {[product.image].map((img, index) => {
          const imageUrl = getImageUrl(img); // Use the helper function for image URL extraction
          return (
            <Image
              key={index}
              width={151}
              height={155}
              src={imageUrl}
              alt={`Thumbnail ${index + 1}`}
              className="w-[151px] h-[155px] object-contain rounded-lg cursor-pointer border border-gray-200 hover:border-blue-500"
              onClick={() => handleThumbnailClick(imageUrl)}
            />
          );
        })}
      </div>

      {/* Main Image */}
      <div className="flex justify-center items-center bg-slate-200 border border-gray-200 rounded-lg overflow-hidden">
        <Image
          src={activeImage || '/placeholder-image.png'} // Handle image URL
          alt={product.name}
          width={375}
          height={486}
          className="object-contain"
        />
      </div>

      {/* Product Details */}
      <div>
        <h1 className="text-3xl font-semibold text-gray-800">{product.name}</h1>
        <div className="flex items-center gap-2 mt-2">
          <span className="text-yellow-400 text-lg">★★★★★</span>
        </div>
        <div className="flex items-center gap-4 mt-4">
          <span className="text-2xl font-bold text-[#1A0B5B]">
            {product.discountPrice ? (
              <>
                <span className="line-through text-gray-500">{`$${product.price}`}</span>
                {` $${product.discountPrice}`}
              </>
            ) : (
              `$${product.price}`
            )}
          </span>
        </div>

        {/* Colour */}
        <div className="mt-8">
          <h3 className="font-semibold text-[#1A0B5B]">Colour</h3>
          <div className="flex gap-2 mt-2">
            {Array.isArray(product.colour) ? (
              product.colour.join(', ') // If it's an array, join them as a string
            ) : (
              product.colour || 'No colours available' // If it's a single string, display it directly
            )}
          </div>
        </div>

        <div>
          <h1 className="font-semibold text-[#1A0B5B] mt-3">Description</h1>
          <h1 className="font-serif text-slate-500 mt-2">{product.description}</h1>
        </div>

        {/* Categories */}
        <div className="mt-6">
          <h3 className="font-semibold text-[#1A0B5B]">Category</h3>
          <p className="text-gray-500">{product.category || 'No category available.'}</p>
        </div>

        {/* Tags */}
        <div className="mt-6">
          <h3 className="font-semibold text-[#1A0B5B]">Tags</h3>
          <p className="text-gray-500">{product.tags?.join(', ') || 'No tags available.'}</p>
        </div>

        {/* Add to Cart Button */}
        <div className="mt-6">
          <button
            className="bg-pink-600 text-white px-6 py-3 rounded-lg transition-all hover:scale-105"
            onClick={handleAddToCart}
          >
            Add To Cart
          </button>
        </div>
      </div>
    </div>
  );
};

// Helper function to safely extract the image URL from the image field
const getImageUrl = (image: SanityImage | string): string => {
  if (typeof image === 'string') {
    return image; // Directly return if it's a string (URL)
  } else if (image?.asset?.url) {
    return image.asset.url; // Extract the URL if it's a SanityImage
  }
  return '/placeholder-image.png'; // Fallback to a placeholder if no valid URL is found
};

const DescriptionSection = ({ product }: { product: Product }) => {
  const [activeTab, setActiveTab] = useState('Description');
  const tabs = ['Description', 'Additional Info', 'Reviews', 'Video'];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'Description':
        return <p>{product.description || 'No description available.'}</p>;
      case 'Additional Info':
        return <p>Additional information about the product goes here.</p>;
      case 'Reviews':
        return <p>{product.reviews || 'No reviews available for this product.'}</p>;
      case 'Video':
        return <p>Product video goes here.</p>;
      default:
        return null;
    }
  };

  return (
    <div className="mt-16">
      <div className="flex gap-6 border-b border-gray-200 pb-4">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`font-medium ${activeTab === tab ? 'text-[#1A0B5B] border-b-2 border-[#1A0B5B]' : 'text-gray-500'}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>
      <div className="mt-6 text-gray-700">{renderTabContent()}</div>
      <RelatedProducts />
    </div>
  );
};

export default SingleProductPage;
