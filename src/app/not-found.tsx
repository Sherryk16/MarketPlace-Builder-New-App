import Link from 'next/link';
import Image from 'next/image';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center mb-10">
      <Image src={'/404.png'} width={913} height={526} alt="404" />
      <Link
        href={'/'}
        className=" bg-pink-600 font-semibold px-6 py-3 text-white rounded-md hover:bg-pink-500"
      >
        Back to Home
      </Link>
    </div>
  );
}
