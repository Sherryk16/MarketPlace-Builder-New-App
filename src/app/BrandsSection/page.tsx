import React from 'react'
import Image from 'next/image'

export default function page() {
  return (
    <div>
       {/* Brand Images */}
       <Image
            src={"/brands.png"}
            width={904}
            height={93}
            alt="brands"
            className="mx-auto"
          />

    </div>
  )
}
