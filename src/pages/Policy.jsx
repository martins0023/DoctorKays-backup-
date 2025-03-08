import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { PortableText } from "@portabletext/react";
import { client } from "../../lib/client";

const portableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="mt-4 text-lg leading-relaxed">{children}</p>
    ),
    h1: ({ children }) => (
      <h1 className="text-2xl font-bold mt-6">{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-xl font-semibold mt-6">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-lg font-medium mt-4">{children}</h3>
    ),
    h4: ({ children }) => (
      <h4 className="text-3xl font-medium mt-3">{children}</h4>
    ),
    h5: ({ children }) => (
      <h5 className="text-2xl font-semibold mt-2">{children}</h5>
    ),
    h6: ({ children }) => (
      <h6 className="text-2xl font-medium  mt-2">{children}</h6>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc list-inside mt-4 space-y-2">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal list-inside mt-4 space-y-2">{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => <li className="ml-6">{children}</li>,
    number: ({ children }) => <li className="ml-6">{children}</li>,
  },
  marks: {
    strong: ({ children }) => <strong className="font-bold">{children}</strong>,
    em: ({ children }) => <em className="italic">{children}</em>,
    link: ({ value, children }) => (
      <a
        href={value.href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-500 underline"
      >
        {children}
      </a>
    ),
  },
};
const Policy = () => {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const query = `
          *[_type == "policy"] {
            _id,
            title,
            description,
          }
        `;
        const data = await client.fetch(query);
        setPosts(data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching policy data:", err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);
  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-8 p-4">
        {posts.map((post, index) => (
          <p className="mt-6 text-lg leading-loose">
            <PortableText
              value={post.description}
              components={portableTextComponents}
            />
          </p>
        ))}
      </div>
      <footer className="bg-primary text-white p-4 text-center">
        <div>© 2025 Doctor kays</div>
      </footer>
    </div>
  );
};

export default Policy;
