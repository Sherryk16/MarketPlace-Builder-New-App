// blogs.js
export type Blog = {
    id: number;
    title: string;
    description: string;
    content: string;
    image: string;
    author: string;
    date: string;
   
  };
const blogs = [
    {
      id: 1,
      title: "The Future of Artificial Intelligence in Everyday Life",
      description:
        "Artificial intelligence is shaping the world like never before. Discover how AI is impacting industries and everyday life...",
      content:
        "Artificial intelligence (AI) is transforming how we live, work, and interact. From self-driving cars to personalized healthcare, AI is becoming an integral part of our everyday lives...",
      image: "/blog1.png",
      author: "Sheharyar Khan",
      date: "01-05-2025",
    
    },
    {
      id: 2,
      title: "10 Tips for Designing Stunning UI with Tailwind CSS",
      description:
        "Master Tailwind CSS with these 10 tips to create stunning and responsive user interfaces that captivate your audience...",
      content:
        "Tailwind CSS allows developers to create beautiful and functional designs quickly. By following these tips, you can take your Tailwind CSS skills to the next level...",
      image: "/blog2.png",
      author: "Sheharyar Khan",
      date: "02-05-2025",
    },
    {
      id: 3,
      title: "Exploring Web3: The Next Generation of the Internet",
      description:
        "Web3 is the next evolution of the web, promising decentralization and new opportunities. Learn how to get started...",
      content:
        "Web3 introduces a decentralized internet that empowers users through blockchain technology. This guide explains what Web3 is and how you can get started with this exciting technology...",
      image: "/blog3.png",
      author: "Sheharyar Khan",
      date: "03-05-2025",
    },
    {
      id: 4,
      title: "Why Next.js is the Best Framework for Modern Web Apps",
      description:
        "Next.js offers unmatched performance and flexibility for developers. Explore the key features that make it the best...",
      content:
        "Next.js is a React framework that provides features like server-side rendering, static site generation, and API routes. It has become a favorite among developers for building modern web applications...",
      image: "/blogg.png",
      author: "Sheharyar Khan",
      date: "04-05-2025",
    },
    {
      id: 5,
      title: "Mastering TypeScript: A Guide for Frontend Developers",
      description:
        "TypeScript has become essential for frontend developers. Learn the basics and advanced concepts to enhance your skills...",
      content:
        "TypeScript enhances JavaScript by adding static typing, making it easier to catch errors early in development. This guide will help you master TypeScript for frontend development...",
      image: "/blogg2.png",
      author: "Sheharyar Khan",
      date: "05-05-2025",
    },
    {
        id: 6,
        title: "Mastering TypeScript: A Guide for Frontend Developers",
        description:
          "TypeScript has become essential for frontend developers. Learn the basics and advanced concepts to enhance your skills...",
        content:
          "TypeScript enhances JavaScript by adding static typing, making it easier to catch errors early in development. This guide will help you master TypeScript for frontend development...",
        image: "/blogg3.png",
        author: "Sheharyar Khan",
        date: "05-05-2025",
      },
  ];
  
  export default blogs;
  