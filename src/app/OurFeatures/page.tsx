import React from 'react'
import Image from 'next/image'

export default function page() {
  return (
    
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 px-4 sm:px-8">
              {[
                { src: "/truck.png", title: "24/7 Support", description: "Lorem ipsum dolor sit amet consectetur adipisicing elit." },
                { src: "/coin.png", title: "Easy Returns", description: "Lorem ipsum dolor sit amet consectetur adipisicing elit." },
                { src: "/badge.png", title: "Quality Guarantee", description: "Lorem ipsum dolor sit amet consectetur adipisicing elit." },
                { src: "/dial.png", title: "Customer Support", description: "Lorem ipsum dolor sit amet consectetur adipisicing elit." },
              ].map((item, index) => (
                <div
                  key={index}
                  className="bg-slate-200 p-4 rounded-lg flex flex-col items-center text-center"
                >
                  <Image src={item.src} width={65} height={65} alt={item.title} />
                  <h3 className="mt-5 text-lg font-bold">{item.title}</h3>
                  <p className="mt-3 text-sm text-slate-500">{item.description}</p>
                </div>
              ))}
    </div>
  )
}
