import React from "react";
import { clinic1, clinic3, doc1 } from "../assets";
import { useNavigate } from "react-router-dom";

const BlogPosts = () => {
  const posts = [
    {
      id: 1,
      category: "postrate cancer",
      title: "Dealing with Postrate Cancer",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt",
      author: "Doctor Kays",
      readTime: "5min read",
      date: "1st of January, 2024",
      imageUrl: clinic1, // Replace with actual image paths
    },
    {
      id: 2,
      category: "Diarrhea",
      title: "How to deal with Diarrhea",
      description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt",
      author: "Doctor Kays",
      readTime: "5min read",
      date: "2nd of January, 2024",
      imageUrl: clinic3, // Replace with actual image paths
    },
    {
      id: 3,
      category: "Liver Cancer",
      title: "Surviving Liver Cancer",
      description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt",
      author: "Doctor Kays",
      readTime: "5min read",
      date: "3rd of January, 2024",
      imageUrl: doc1, // Replace with actual image paths
    },
  ];

  const truncateText = (text, maxWords) => {
    const words = text.split(" ");
    if (words.length <= maxWords) return text;
    return words.slice(0, maxWords).join(" ") + "...";
  };

  const navigate = useNavigate();

  const handleNavigate = (blog) => {
    navigate(`/blog/${blog.id}`, { state: blog });
  };

  return (
    <div className="py-10">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">Latest Article</h2>
        {/* <a href="/all-posts" className="text-primary font-semibold">View All Posts</a> */}
      </div>
      <p className="mb-8 text-neutral-400">
        Donec ac odio tempor orci dapibus ultrices. Ut lectus arcu bibendum at
        varius vel pharetra vel. Enim sed faucibus turpis in eu mi bibendum.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {posts.map((post) => (
          <div
            key={post.id}
            onClick={() => handleNavigate(post)}
            className="bg-gradient-to-l from-gray-800 to-gray-950 p-4 rounded-lg cursor-pointer"
          >
            <img
              src={post.imageUrl}
              alt={post.title}
              className="w-full h-40 object-cover rounded-lg mb-4"
            />
            <div className="bg-slate-200 p-1 w-fit rounded-full h-fit mb-1">
              <p className="text-sm text-primary font-medium">
                #{post.category}
              </p>
            </div>
            <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
            <p className="text-sm text-gray-400 mb-4">{truncateText(post.description, 20)}<span className="text-white">{" "}read more</span> </p>
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <span className="text-sm text-gray-400">{post.author}</span>
              </div>
              <span className="text-sm text-gray-400">{post.readTime}</span>
            </div>
          </div>
        ))}
      </div>

      {/* more and tags */}
      <div className="flex justify-between items-center mb-6 mt-20">
        <h2 className="text-3xl font-bold">For women</h2>
      </div>
      <p className="mb-8">
        Donec ac odio tempor orci dapibus ultrices. Ut lectus arcu bibendum at
        varius vel pharetra vel. Enim sed faucibus turpis in eu mi bibendum.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {posts.map((post) => (
          <div
            key={post.id}
            onClick={() => handleNavigate(post)}
            className="cursor-pointer bg-gradient-to-r from-gray-800 to-gray-950 p-4 rounded-lg"
          >
            <img
              src={post.imageUrl}
              alt={post.title}
              className="w-full h-40 object-cover rounded-lg mb-4"
            />
            <div className="bg-slate-200 p-1 w-fit rounded-full h-fit mb-1">
              <p className="text-sm text-primary font-medium">
                #{post.category}
              </p>
            </div>
            <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
            <p className="text-sm text-gray-400 mb-4">{truncateText(post.description, 20)} <span className="text-white">{" "}read more</span></p>
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <span className="text-sm text-gray-400">{post.author}</span>
              </div>
              <span className="text-sm text-gray-400">{post.readTime}</span>
            </div>
          </div>
        ))}
      </div>

      {/* others */}
      <div className="flex justify-between items-center mb-6 mt-20">
        <h2 className="text-3xl font-bold">Sex Education</h2>
      </div>
      <p className="mb-8">
        Donec ac odio tempor orci dapibus ultrices. Ut lectus arcu bibendum at
        varius vel pharetra vel. Enim sed faucibus turpis in eu mi bibendum.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {posts.map((post) => (
          <div
            key={post.id}
            onClick={() => handleNavigate(item)}
            className="cursor-pointer bg-gradient-to-l from-gray-800 to-gray-950 p-4 rounded-lg"
          >
            <img
              src={post.imageUrl}
              alt={post.title}
              className="w-full h-40 object-cover rounded-lg mb-4"
            />
            <div className="bg-slate-200 p-1 w-fit rounded-full h-fit mb-1">
              <p className="text-sm text-primary font-medium">
                #{post.category}
              </p>
            </div>
            <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
            <p className="text-sm text-gray-400 mb-4">{truncateText(post.description, 20)} <span className="text-white">{" "}read more</span></p>
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <span className="text-sm text-gray-400">{post.author}</span>
              </div>
              <span className="text-sm text-gray-400">{post.readTime}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-between items-center mb-6 mt-20">
        <h2 className="text-3xl font-bold">Pregnant Women</h2>
      </div>
      <p className="mb-8">
        Donec ac odio tempor orci dapibus ultrices. Ut lectus arcu bibendum at
        varius vel pharetra vel. Enim sed faucibus turpis in eu mi bibendum.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {posts.map((post) => (
          <div
            key={post.id}
            onClick={() => handleNavigate(post)}
            className="cursor-pointer bg-gray-800 p-4 rounded-lg"
          >
            <img
              src={post.imageUrl}
              alt={post.title}
              className="w-full h-40 object-cover rounded-lg mb-4"
            />
            <div className="bg-slate-200 p-1 w-fit rounded-full h-fit mb-1">
              <p className="text-sm text-primary font-medium">
                #{post.category}
              </p>
            </div>
            <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
            <p className="text-sm text-gray-400 mb-4">{truncateText(post.description, 20)} <span className="text-white">{" "}read more</span></p>
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <span className="text-sm text-gray-400">{post.author}</span>
              </div>
              <span className="text-sm text-gray-400">{post.readTime}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogPosts;
