
export default function Contact() {

    return (
      <div className=" min-h-screen p-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-800">Contact Us</h1>
          <p className="text-sm text-gray-500">Home &gt; Page &gt; Contact Us</p>
        </div>
  
        {/* Information and Contact Way Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Information About Us */}
          <div>
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Information About Us</h2>
            <p className="text-gray-600 text-sm mb-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris viverra elit nunc, et 
              sodales lorem suscipit non. Donec euismod ligula sit amet lectus vulputate feugiat.
            </p>
            <div className="flex gap-4">
              <span className="w-4 h-4 bg-blue-500 rounded-full"></span>
              <span className="w-4 h-4 bg-pink-500 rounded-full"></span>
              <span className="w-4 h-4 bg-green-500 rounded-full"></span>
            </div>
          </div>
  
          {/* Contact Way */}
          <div>
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Contact Way</h2>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <span className="w-4 h-4 bg-blue-500 rounded-full"></span>
                <p className="text-gray-600 text-sm">Tel: 877-45-70-70</p>
              </div>
              <div className="flex items-center gap-4">
                <span className="w-4 h-4 bg-pink-500 rounded-full"></span>
                <p className="text-gray-600 text-sm">Support Forum for over 24h</p>
              </div>
              <div className="flex items-center gap-4">
                <span className="w-4 h-4 bg-orange-500 rounded-full"></span>
                <p className="text-gray-600 text-sm">20 Margaret St, London</p>
              </div>
              <div className="flex items-center gap-4">
                <span className="w-4 h-4 bg-green-500 rounded-full"></span>
                <p className="text-gray-600 text-sm">Post at contact@ecommerce.com</p>
              </div>
            </div>
          </div>
        </div>
  
        {/* Get In Touch Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mb-12">
          {/* Form */}
          <div>
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Get In Touch</h2>
            <p className="text-gray-600 text-sm mb-6">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi posuere aliquet sapien.
            </p>
            <form className="space-y-4">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
              <input
                type="email"
                placeholder="Your Email"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
              <input
                type="text"
                placeholder="Subject"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
              <textarea
                placeholder="Write Your Message"
                rows={4}
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
              ></textarea>
              <button
                type="submit"
                className="bg-pink-500 text-white px-6 py-2 rounded-full hover:bg-pink-600"
              >
                Send Email
              </button>
            </form>
          </div>
  
          {/* Illustration */}
          <div>
            <img
              src={'/uss.png'}
              
              alt="Contact Illustration"
              className="w-full h-auto"
            />
          </div>
        </div>
  
       
        
      </div>
    );
  }