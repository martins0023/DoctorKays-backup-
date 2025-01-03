import React from "react";
import Navbar from "../components/Navbar";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Stayintouch from "../components/Stayintouch";
import Footer from "../components/Footer";
import { Calendar } from "lucide-react";
import { posts } from "../constants";
import BlogNotFound from "../components/BlogNotFound";
import Testimonials from "../components/Testimonials";

const BlogDetail = () => {
  const { id } = useParams(); // Get the ID from the route
  const location = useLocation();
  const blog = location.state; // Access blog data from state

  const truncateText = (text, maxWords) => {
    const words = text.split(" ");
    if (words.length <= maxWords) return text;
    return words.slice(0, maxWords).join(" ") + "...";
  };
  
  const navigate = useNavigate();

  if (!blog) {
    return (
      <div className="">
        <BlogNotFound />
      </div>
    ); // Fallback in case state is missing
  }
  return (
    <div className="">
      <Navbar />
      <div className="max-w-7xl mx-auto pt-8 px-6 md:px-12">
        <div className="mt-6 p-4">
          <div className="flex justify-center mb-6">
            <p className="text-xs font-semibold rounded-full bg-purple-600 px-4 py-2">
              #{blog.category}
            </p>
          </div>
          <h1 className="text-4xl font-bold text-center">{blog.title}</h1>
          <div className="mt-4 flex justify-between items-center">
            <div className="flex gap-2 items-center">
              <Calendar />
              <p className="text-sm font-medium ">
                {`${blog.date} `}
              </p>
            </div>
            <p className="text-sm font-medium ">By Doctor Kays</p>
          </div>
          <img
            src={blog.imageUrl}
            alt={blog.title}
            className="w-full h-auto mt-6 rounded-lg object-cover"
          />
          <p className="mt-6 text-lg text-gray-300 leading-loose">
            {blog.description}
          </p>
        </div>

        {/* Recommended Articles Section */}
        <div className="mt-12 p-4">
          <h2 className="text-2xl font-semibold mb-4">Recommended Articles</h2>
          <div className="flex space-x-4 overflow-x-auto">
            {posts.map((post) => (
              <div
                key={post.id}
                onClick={() => handleNavigate(post)}
                className="min-w-[250px] sm:min-w-[300px] md:min-w-[350px] bg-gradient-to-l from-gray-800 to-gray-950 md:p-4 p-3 rounded-lg cursor-pointer"
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
                <p className="text-sm text-gray-400 mb-4">
                  {truncateText(post.description, 15)}
                  <span className="text-white">{" "}read more</span>
                </p>
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

        {/* Related Articles Section */}
        <div className="mt-12 p-4">
          <h2 className="text-2xl font-semibold  mb-4">Related Articles</h2>
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {/* Placeholder for related articles */}
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
            <p className="text-sm text-gray-400 mb-4">{truncateText(post.description, 15)}<span className="text-white">{" "}read more</span> </p>
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

        <Testimonials />
        <Stayintouch />
        <Footer />
      </div>
      <footer className="bg-primary text-white p-4 text-center">
        <div>© 2025 Drkays</div>
      </footer>
    </div>
  );
};

export default BlogDetail;
