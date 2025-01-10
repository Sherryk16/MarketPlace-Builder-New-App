// components/AboutSection.js
import Image from "next/image";
import React from "react";
import OurFeatures from '@/app/OurFeatures/page'
import Link from "next/link";

const AboutSection = () => {
  return (
    <main>
    <section className="flex flex-col md:flex-row items-center px-16 py-12 md:py-16">
      {/* Image Section */}
      <div className="md:w-1/2">
        <Image
          src="/About.png" // Replace with your actual image path
          alt="Ecommerce Business"
          width={500}
          height={300}
          className="rounded-lg shadow-lg"
        />
      </div>

      {/* Text Content Section */}
      <div className="md:w-1/2 mt-6 md:mt-0 md:pl-8">
        <h2 className="text-2xl md:text-3xl font-bold text-[#151875]">
          Know About Our Ecommerce <br /> Business, History
        </h2>
        <p className="mt-4 text-gray-600 leading-relaxed">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Natus neque
          ultricies mattis aliquam, malesuada diam et. Maecenas sed ipsum
          tristique arcu est vitae eget dolor volutpat. Accumsan faucibus nisl
          lobortis quis bibendum quam.
        </p>
        <Link href={'/Contact'}>
        <button className="mt-6 bg-pink-500 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-pink-600">
          Contact us
        </button>
        </Link>
      </div>
    </section>
    <h1 className="text-3xl text-center font-bold text-black mb-3">Our Features</h1>
    <OurFeatures/>
    <section className="px-6 py-12 md:py-16 bg-gray-50 mt-10">
      <div className="text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
          Our Client Say!
        </h2>

        {/* Client Images */}
        <div className="flex justify-center space-x-4 mt-6">
          <Image
            src="/client1.png" // Replace with actual image path
            alt="Client 1"
            width={50}
            height={50}
            className="rounded-full shadow-lg"
          />
          <Image
            src="/client1.png" // Replace with actual image path
            alt="Client 2"
            width={50}
            height={50}
            className="rounded-full shadow-lg"
          />
          <Image
            src="/client1.png" // Replace with actual image path
            alt="Client 3"
            width={50}
            height={50}
            className="rounded-full shadow-lg"
          />
        </div>

        {/* Client Name */}
        <h3 className="mt-4 text-lg font-semibold text-gray-800">
          Selina Gomez
        </h3>
        <p className="text-gray-500">CEO of WebFlow Studio</p>

        {/* Testimonial Text */}
        <p className="mt-6 text-gray-600 leading-relaxed max-w-2xl mx-auto">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Non nisl
          rhoncus quam velit id sollicitudin aliquet id lacus. Nam vitae arcu
          nunc, sed iaculis egestas arcu.
        </p>

        {/* Divider */}
        <div className="mt-6 flex justify-center">
          <div className="h-1 w-16 bg-pink-500 rounded-full"></div>
        </div>
      </div>
    </section>
    </main>
  );
};

export default AboutSection;
