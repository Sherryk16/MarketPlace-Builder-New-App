export default function CustomDiv() {
  return (
    <div
      className="relative h-[462px] w-full bg-gray-200 flex items-center justify-center"
      style={{
        backgroundImage: "url('/2.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className="text-center p-4 md:p-8">
        <p className="text-lg font-bold text-blue-700">
          Get Latest Update By Subscribe <br /> Our Newsletter
        </p>
        <button className="mt-4 px-6 py-2 bg-pink-500 text-white rounded hover:bg-pink-600">
          Shop Now
        </button>
      </div>
    </div>
  );
}
