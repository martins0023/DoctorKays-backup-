import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { client } from "../../lib/client";

const BlogPosts = () => {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const [groupedPosts, setGroupedPosts] = useState({}); // For grouping posts by section

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const query = `
          *[_type == "blog"] | order(date desc) {
            _id,
            title,
            slug,
            category,
            section,
            author,
            date,
            "imageUrl": image[0].asset->url,
            "descriptionText": coalesce(description[2].children[0].text, "") // Get the first block of text safely
          }
        `;
        const data = await client.fetch(query);
        setPosts(data);

        // Group posts by section
        const grouped = data.reduce((acc, post) => {
          if (!acc[post.section]) {
            acc[post.section] = [];
          }
          acc[post.section].push(post);
          return acc;
        }, {});
        setGroupedPosts(grouped);

        setLoading(false);
      } catch (err) {
        console.error("Error fetching posts:", err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const navigate = useNavigate();

  const handleNavigate = (post) => {
    navigate(`/blog/${post.slug.current}`);
  };

  const truncateText = (text, maxWords) => {
    const words = text.split(" ");
    if (words.length <= maxWords) return text;
    return words.slice(0, maxWords).join(" ") + "...";
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="py-10">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">Blog Sections</h2>
        <a href="/all-posts" className="text-primary font-semibold">
          View All Posts
        </a>
      </div>
      <p className="mb-8 text-neutral-400">
        Dive into the latest insights, tips, and updates from Doctor Kays. Our
        blog is your go-to source for exploring a wide range of topics, from
        expert advice and industry trends to practical guides and inspiring
        stories. Stay informed, stay inspired, and discover something new with
        every article.
      </p>

      {Object.keys(groupedPosts).map((section) => (
        <div key={section} className="mb-12">
          <h3 className="text-2xl font-bold mb-4">{section}</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {groupedPosts[section].slice(0, 6).map((post) => (
              <div
                key={post._id}
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
                <h3 className="text-xl font-semibold text-white mb-2">{post.title}</h3>
                <p className="text-sm text-gray-400 mb-4">
                  {truncateText(post.descriptionText, 20)}
                  <span className="text-white"> read more</span>
                </p>
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <span className="text-sm text-gray-400">
                      by {post.author}
                    </span>
                  </div>
                  <span className="text-sm text-gray-400">{post.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default BlogPosts;
