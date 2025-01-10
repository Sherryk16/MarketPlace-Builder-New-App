'use client'; // For client-side rendering
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

const slides = [
  {
    id: 1,
    bulbSrc: "/bulb.png",
    chairSrc: "/homesofa.png",
    title: "New Furniture Collection Trends in 2020",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Magna in est adipiscing elit.",
    subtitle: "Best Furniture For Your Castle...",
    buttonText: "Shop Now",
  },
  {
    id: 2,
    bulbSrc: "/bulb.png",
    chairSrc: "/chair2.png",
    title: "Exclusive Furniture Designs",
    description: "Praesent vitae eros eget tellus tristique bibendum. Donec rutrum sed sem quis venenatis.",
    subtitle: "Modern & Elegant Solutions...",
    buttonText: "Explore More",
  },
  {
    id: 3,
    bulbSrc: "/bulb.png",
    chairSrc: "/chair3.png",
    title: "Custom-Made Furniture Options",
    description: "Suspendisse potenti. Fusce nec tellus sed augue semper porta. Mauris massa.",
    subtitle: "Tailored to Your Needs...",
    buttonText: "Get Started",
  },
];

export default function FurnitureBanner() {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Automatically slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval); // Cleanup on component unmount
  }, []);

  // Handle manual navigation
  const handleNext = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
  };

  const handlePrev = () => {
    setCurrentSlide((prevSlide) => (prevSlide - 1 + slides.length) % slides.length);
  };

  return (
    <div className="relative bg-white">
      {/* Navigation Buttons */}
      <div className="absolute top-1/2 left-4 transform -translate-y-1/2 z-10">
        <button
          onClick={handlePrev}
          className="p-2 bg-gray-200 rounded-full hover:bg-gray-300 transition"
        >
          ❮
        </button>
      </div>
      <div className="absolute top-1/2 right-4 transform -translate-y-1/2 z-10">
        <button
          onClick={handleNext}
          className="p-2 bg-gray-200 rounded-full hover:bg-gray-300 transition"
        >
          ❯
        </button>
      </div>

      {/* Slides */}
      <div className="overflow-hidden px-6 py-12 md:px-14 md:py-16 lg:py-20 lg:px-20">
        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{
            transform: `translateX(-${currentSlide * 100}%)`,
          }}
        >
          {slides.map((slide) => (
            <div key={slide.id} className="flex-shrink-0 w-full">
              <div className="flex flex-wrap lg:flex-nowrap items-center justify-between gap-10 lg:gap-16">
                {/* Left Section */}
                <div className="flex flex-col md:flex-row items-start gap-6 md:gap-10">
                  {/* Bulb Image */}
                  <Image
                    src={slide.bulbSrc}
                    width={387}
                    height={387}
                    alt="Bulb"
                    className="w-[200px] md:w-[300px] lg:w-[387px] object-contain"
                  />

                  {/* Text Section */}
                  <div className="max-w-lg text-center md:text-left">
                    <p className="text-pink-500 text-sm md:text-lg font-semibold mb-2 md:mb-3">
                      {slide.subtitle}
                    </p>
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-3 md:mb-4">
                      {slide.title}
                    </h1>
                    <p className="text-gray-600 text-sm md:text-base lg:text-lg mb-4 md:mb-6">
                      {slide.description}
                    </p>
                    <Link href="/Shop">
                      <button className="bg-pink-500 text-white text-sm md:text-lg font-semibold py-2 md:py-3 px-6 md:px-8 rounded-lg hover:bg-pink-600 transition">
                        {slide.buttonText}
                      </button>
                    </Link>
                  </div>
                </div>

                {/* Right Section */}
                <div className="flex justify-center">
                  {/* Chair Image */}
                  <Image
                    src={slide.chairSrc}
                    width={450}
                    height={450}
                    alt="Chair"
                    className="w-[300px] md:w-[400px] lg:w-[450px] object-contain"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Indicators */}
      <div className="flex justify-center mt-6 space-x-2">
        {slides.map((_, index) => (
          <div
            key={index}
            className={`w-3 h-3 rounded-full cursor-pointer ${
              index === currentSlide ? "bg-pink-500" : "bg-gray-300"
            }`}
            onClick={() => setCurrentSlide(index)}
          ></div>
        ))}
      </div>
    </div>
  );
}
