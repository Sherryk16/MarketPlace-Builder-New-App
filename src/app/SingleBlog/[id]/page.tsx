import Image from "next/image";
import React from "react";
import blogs from "@/app/blogs"; // Import blog data
import CommentSection from "@/app/components/CommentSection";
import RelatedProducts from "@/app/RelatedProducts/page";

// Server Component for dynamic blog page
export default function Blog({ params }: { params: { id: string } }) {
  // Find the blog based on the dynamic id
  const blog = blogs.find((blog) => blog.id.toString() === params.id);

  if (!blog) return <p>Blog not found.</p>;

  return (
    <main>
      <div className="bg-gray-50 min-h-screen p-8">
        <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
          <Image
            src={blog.image}
            width={870}
            height={453}
            alt={blog.title}
            className="w-full object-cover"
          />
          <div className="p-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">{blog.title}</h1>
            <div className="text-sm text-gray-600 mb-4">
              <span>By {blog.author}</span>
              <span className="mx-2">|</span>
              <span>{blog.date}</span>
            </div>
            <p className="text-gray-700 leading-relaxed">{blog.content}</p>
          </div>
          <CommentSection initialComments={[]} />
        </div>
        <RelatedProducts />
      </div>
    </main>
  );
}

// This will generate static pages at build time
export async function generateStaticParams() {
  // Ensure this returns a structure that Next.js can understand
  const paths = blogs.map((blog) => ({
    params: { id: blog.id.toString() },
  }));

  return paths;  // Remove the additional map and return directly
}
