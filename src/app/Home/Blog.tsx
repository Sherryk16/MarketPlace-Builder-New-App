import blogs from "../blogs"; 
import Image from "next/image";

export default function CardsGrid() {
  // Limit to the first 3 blogs
  const limitedBlogs = blogs.slice(0, 3);

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {limitedBlogs.map((card, index) => (
          <div
            key={index}
            className="border rounded-lg shadow-md overflow-hidden bg-white transform transition-all duration-300 hover:scale-105 hover:shadow-xl hover:bg-gray-100"
          >
            <Image
              src={card.image}
              height={150}
              width={150}
              alt={card.title}
              className="w-full h-48 object-cover transition-opacity duration-300 group-hover:opacity-80"
            />
            <div className="p-4">
              <div className="text-sm text-gray-600 flex items-center mb-2">
                <span className="mr-2 text-pink-500">●</span>
                <span>{card.author}</span>
                <span className="mx-2">|</span>
                <span>{card.date}</span>
              </div>
              <h3 className="text-lg font-semibold text-blue-900 mb-2">
                {card.title}
              </h3>
              <p className="text-sm text-gray-700 mb-4">{card.description}</p>
              <a
                href={`SingleBlog/${card.id}`}
                className="text-sm text-blue-500 font-medium hover:underline"
              >
                Read More
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
