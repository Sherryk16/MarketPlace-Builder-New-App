import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Head from "./Header/Head";
import Navbar from "./Header/Navbar";
import Footer from "@/app/Footer/Footer";
import BrandsSection from "@/app/BrandsSection/page"; // Ensure this is the correct path
import CartProviderWrapper from "@/app/components/CartProvider"; // Ensure this is the correct path
import { SearchProvider } from "@/app/Search/SearchContext";
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton
} from '@clerk/nextjs'

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
   
    <html lang="en">
       <ClerkProvider>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* Wrap the application with CartProviderWrapper */}
       
       <SearchProvider>
        <CartProviderWrapper>
          <Head />
          <Navbar />
          
          {/* Main Content */}
          {children}
            
         <BrandsSection/>
          <Footer />
        </CartProviderWrapper>
        </SearchProvider>
     
      </body>
      </ClerkProvider>
      
    </html>
    
  );
}
