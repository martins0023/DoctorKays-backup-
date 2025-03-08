import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Stayintouch from "../components/Stayintouch";
import Footer from "../components/Footer";
import {
  Calendar,
  PlayCircle,
  PauseCircle,
  ThumbsUp,
  ThumbsDown,
} from "lucide-react";
import { Blogposts } from "../constants";
import BlogNotFound from "../components/BlogNotFound";
import Testimonials from "../components/Testimonials";
import { client } from "../../lib/client";
import { PortableText } from "@portabletext/react";

const portableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="mt-4 text-lg text-gray-300 leading-relaxed">{children}</p>
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
      <h6 className="text-2xl font-medium text-gray-400 mt-2">{children}</h6>
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

const BlogDetail = () => {
  const { id } = useParams(); // Get the ID from the route
  const location = useLocation();
  const blog = location.state; // Access blog data from state

  const navigate = useNavigate();

  const [post, setPost] = useState(null);
  const [recommendedArticles, setRecommendedArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSpeaking, setIsSpeaking] = useState(false); // TTS state
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const synth = window.speechSynthesis; // Web Speech API

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const query = `*[_type == "blog" && slug.current == $id][0]{
          _id,
          title,
          author,
          slug,
          category,
          section,
          date,
          "imageUrl": image[0].asset->url,
          description,
          likes,
          dislikes
        }`;
        const data = await client.fetch(query, { id }); // Pass the id as a parameter
        setPost(data);
        setLikes(data.likes || 0);
        setDislikes(data.dislikes || 0);
        setLoading(false);

        // Fetch recommended articles based on the blog's category
        const recommendedQuery = `*[_type == "blog" && category == $category && _id != $id]{
          _id,
          title,
          slug,
          category,
          "imageUrl": image[0].asset->url,
          "descriptionText": coalesce(description[2].children[0].text, "") // Get the first block of text safely
        }`;
        const recommendedData = await client.fetch(recommendedQuery, {
          category: data.category,
          id: data._id,
        });
        setRecommendedArticles(recommendedData);
      } catch (error) {
        console.error("Error fetching post:", error);
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  const updateLikes = async (type) => {
    try {
      const updatedField =
        type === "like" ? { likes: likes + 1 } : { dislikes: dislikes + 1 };
      await client.patch(post._id).setIfMissing(updatedField).commit();
      if (type === "like") setLikes((prev) => prev + 1);
      else setDislikes((prev) => prev + 1);
    } catch (error) {
      console.error(`Error updating ${type}:`, error);
    }
  };
  // Helper function to convert rich text to plain text
  const extractPlainText = (richText) => {
    if (!richText || !Array.isArray(richText)) return "";
    return richText
      .map((block) => {
        if (block._type === "block" && block.children) {
          return block.children.map((child) => child.text).join("");
        }
        return "";
      })
      .join("\n\n"); // Join paragraphs with spacing
  };

  const handleSpeech = () => {
    if (!synth) {
      alert("Text-to-Speech is not supported in this browser.");
      return;
    }

    const plainText = extractPlainText(post.description); // Extract plain text from rich-text content

    if (isSpeaking) {
      synth.cancel(); // Stop all queued speech
      setIsSpeaking(false);
    } else {
      // Split text into smaller chunks
      const CHUNK_SIZE = 150; // Adjust based on performance and limits
      const textChunks = plainText.match(
        new RegExp(`.{1,${CHUNK_SIZE}}(\\s|$)`, "g")
      );

      if (!textChunks || textChunks.length === 0) {
        alert("No content available to read.");
        return;
      }

      // Speak each chunk sequentially
      let currentChunkIndex = 0;

      const speakChunk = () => {
        if (currentChunkIndex < textChunks.length) {
          const utterance = new SpeechSynthesisUtterance(
            textChunks[currentChunkIndex]
          );
          utterance.lang = "en-US";
          utterance.pitch = 1; // Adjust pitch for a natural tone
          utterance.rate = 1; // Adjust speech rate
          utterance.volume = 1; // Full volume
          utterance.voice = synth
            .getVoices()
            .find((voice) => voice.name.includes("Google US English")); // Select preferred voice

          utterance.onend = () => {
            currentChunkIndex++;
            speakChunk(); // Trigger the next chunk
          };

          synth.speak(utterance);
        } else {
          setIsSpeaking(false); // End speech when all chunks are done
        }
      };

      setIsSpeaking(true);
      speakChunk(); // Start speaking
    }
  };

  const truncateText = (text, maxWords) => {
    const words = text.split(" ");
    if (words.length <= maxWords) return text;
    return words.slice(0, maxWords).join(" ") + "...";
  };

  if (loading) return <p>Loading...</p>;
  if (!post) {
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
              #{post.category}
            </p>
          </div>
          <h1 className="text-4xl font-bold text-center">{post.title}</h1>
          <div className="mt-4 flex justify-between items-center">
            <div className="flex gap-2 items-center">
              <Calendar />
              <p className="text-sm font-medium ">{`${post.date} `}</p>
            </div>
            <p className="text-sm font-medium ">By {post.author}</p>
          </div>
          <img
            src={post.imageUrl}
            alt={post.title}
            className="w-full max-h-[400px] h-auto mt-6 rounded-lg object-cover"
          />
          {/* Listen Button */}
          <div className="mt-4 flex items-center gap-4 justify-center">
            <button
              onClick={handleSpeech}
              className="flex items-center gap-2 bg-gradient-to-l from-blue-600 to-gray-800 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition"
            >
              {isSpeaking ? <PauseCircle /> : <PlayCircle />}
              {isSpeaking ? "Pause Audio" : "Listen to Blog"}
            </button>
          </div>
          <p className="mt-6 text-lg text-gray-300 leading-loose">
            <PortableText
              value={post.description}
              components={portableTextComponents}
            />
          </p>
          <div className="mt-4 flex items-center gap-4 justify-center">
            <button
              onClick={() => updateLikes("like")}
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition"
            >
              <ThumbsUp />
              Like ({likes})
            </button>
            <button
              onClick={() => updateLikes("dislike")}
              className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-full hover:bg-red-700 transition"
            >
              <ThumbsDown />
              Dislike ({dislikes})
            </button>
          </div>
        </div>

        {/* Recommended Articles Section */}
        <div className="mt-12 p-4">
          <h2 className="text-2xl font-semibold mb-4">
            Related & Recommended Articles
          </h2>
          {recommendedArticles.length > 0 ? (
            <div className="flex space-x-4 overflow-x-auto">
              {recommendedArticles.map((article) => (
                <div
                  key={article._id}
                  onClick={() =>
                    navigate(`/blog/${article.slug.current}`, {
                      state: article,
                    })
                  }
                  className="min-w-[250px] sm:min-w-[300px] md:min-w-[350px] bg-gradient-to-l from-gray-800 to-gray-950 md:p-4 p-3 rounded-lg cursor-pointer"
                >
                  <img
                    src={article.imageUrl}
                    alt={article.title}
                    className="w-full h-40 object-cover rounded-lg mb-4"
                  />
                  <div className="bg-slate-200 p-1 w-fit rounded-full h-fit mb-1">
                    <p className="text-sm text-primary font-medium">
                      #{article.category}
                    </p>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">
                    {article.title}
                  </h3>
                  <p className="text-sm text-gray-400 mb-4">
                    {truncateText(article.descriptionText, 20)}...
                    <span className="text-white"> read more</span>
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-400 mt-6">
              <p>
                No related or recommended articles found for this blog post.
              </p>
            </div>
          )}
        </div>

        <Testimonials />
        <Stayintouch />
        <Footer />
      </div>
      <footer className="bg-primary text-white p-4 text-center">
        <div>© 2025 Doctor kays</div>
      </footer>
    </div>
  );
};

export default BlogDetail;
