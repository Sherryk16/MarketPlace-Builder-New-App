import Image from "next/image";
import blogs from "../blogs";



export default function Blog() {
  return (
    <div className="bg-gray-50 min-h-screen p-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-800">Our Blog</h1>
        <p className="text-sm text-gray-500">Home &gt; Blog</p>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Blog Section */}
        <div className="col-span-3 flex flex-wrap gap-6">
          {blogs.map((card, index) => (
            <div
              key={index}
              className="min-w-[300px] max-w-[870px] border rounded-lg shadow-md overflow-hidden bg-white transform transition-all duration-300 hover:scale-105 hover:shadow-xl hover:bg-gray-100"
            >
              <Image
                src={card.image}
                width={870}
                height={453}
                alt={card.title}
                className="object-cover transition-opacity duration-300 group-hover:opacity-80"
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

        {/* Sidebar Section */}
        <div className="col-span-1">
          {/* Search */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">Search</h3>
            <input
              type="text"
              placeholder="Search here..."
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>

          {/* Categories */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">
              Categories
            </h3>
            <ul className="text-sm text-gray-600 space-y-2">
              <li>Fashion (10)</li>
              <li>Technology (8)</li>
              <li>Travel (6)</li>
              <li>Music (4)</li>
            </ul>
          </div>

          {/* Recent Posts */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">
              Recent Posts
            </h3>
            <ul className="text-sm text-gray-600 space-y-2">
              <li>
                <a href="#" className="hover:text-pink-500">
                  How to design with Tailwind CSS
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-pink-500">
                  Top 10 travel destinations for 2024
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-pink-500">
                  Understanding React hooks
                </a>
              </li>
            </ul>
          </div>

          {/* Sale Product */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">
              Sale Product
            </h3>
            <div className="flex items-center gap-4">
              <Image
                src={"/sofaa1.png"} // Replace with your image
                width={50}
                height={50}
                alt="Sale Product"
                className="w-16 h-16 object-cover rounded-lg"
              />
              <div>
                <h4 className="text-sm font-medium text-gray-700">
                  Product Name
                </h4>
                <p className="text-sm text-gray-500">$20.00</p>
              </div>
            </div>
          </div>

          {/* Follow Us */}
          <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-4">
              Follow Us
            </h3>
            <div className="flex gap-4">
              <a href="#" className="text-pink-500">
                <Image src={"/fb.png"} height={25} width={25} alt="fb" />
              </a>
              <a href="#" className="text-pink-500">
                <Image src={"/twitter.png"} height={30} width={30} alt="twitter" />
              </a>
              <a href="#" className="text-pink-500">
                <Image src={"/insta.png"} height={30} width={30} alt="insta" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
