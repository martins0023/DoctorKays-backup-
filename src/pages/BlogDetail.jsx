import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async"; // ← add this
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
import SocialShare from "../components/SocialShare/SocialShare";
import { v4 as uuidv4 } from "uuid";
import { FaComment, FaThumbsUp, FaThumbsDown } from "react-icons/fa";

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
      <h6 className="text-2xl font-medium mt-2">{children}</h6>
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

function shuffleArray(arr) {
  // Fisher–Yates shuffle
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

const BlogDetail = () => {
  const { id } = useParams(); // Get the ID from the route
  const location = useLocation();
  const blog = location.state; // Access blog data from state

  const navigate = useNavigate();

  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [isPosting, setIsPosting] = useState(false);
  const [postError, setPostError] = useState("");
  const [newName, setNewName] = useState("");
  const [newText, setNewText] = useState("");
  const [recommendedArticles, setRecommendedArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  // track which reply-box is open
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyText, setReplyText]   = useState('');
  const [replyName, setReplyName]   = useState('');

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
          dislikes,
          comments
          
        }`;
        const data = await client.fetch(query, { id }); // Pass the id as a parameter
        setPost(data);
        setComments(data.comments || []);
        setLikes(data.likes || 0);
        setDislikes(data.dislikes || 0);
        setLoading(false);

        const recommendedQuery = `*[_type == "blog" 
                              && category == $category 
                              && _id != $id]{
        _id,
        title,
        slug,
        category,
        "imageUrl": image[0].asset->url,
        "descriptionText": coalesce(description[2].children[0].text, "")
      }[0...5]`;
        let related = await client.fetch(recommendedQuery, {
          category: data.category,
          id: data._id,
        });

        // 3) If no related were found, fall back to 5 random featured posts
        if (!related.length) {
          const fallbackQuery = `*[_type == "blog" && _id != $id]{
          _id,
          title,
          slug,
          category,
          "imageUrl": image[0].asset->url,
          "descriptionText": coalesce(description[2].children[0].text, "")
        }`;
          const allOthers = await client.fetch(fallbackQuery, { id: data._id });
          related = shuffleArray(allOthers).slice(0, 5);
        }

        setRecommendedArticles(related);
      } catch (error) {
        console.error("Error fetching post:", error);
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  const fmtDate = (iso) =>
    new Date(iso).toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });

  const updateReactions = async (type) => {
    if (!post) return;
    const field = type === "like" ? "likes" : "dislikes";

    try {
      // Atomically increment on the server
      await client
        .patch(post._id)
        .inc({ [field]: 1 }) // <-- use .inc rather than setIfMissing
        .commit();

      // Optimistically update UI
      setPost((prev) => ({
        ...prev,
        [field]: (prev[field] || 0) + 1,
      }));
    } catch (err) {
      console.error("Failed to update", type, err);
    }
  };

  // Comments submission
  const handleSubmitComment = async (e) => {
    e.preventDefault();
    if (!newName.trim() || !newText.trim()) return;
    setIsPosting(true);
    setPostError("");
    const commentObj = {
      _key: uuidv4(),
      name: newName.trim(),
      text: newText.trim(),
      postedAt: new Date().toISOString(),
    };
    try {
      const updated = await client
        .patch(post._id)
        .setIfMissing({ comments: [] })
        .append("comments", [commentObj])
        .commit({ autoGenerateArrayKeys: true });
      setComments(updated.comments);
      setNewName("");
      setNewText("");
    } catch (err) {
      console.error("Comment submit failed", err);
      setPostError("Failed to post your comment. Please try again.");
    } finally {
      setIsPosting(false);
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
      const CHUNK_SIZE = 1000; // Adjust based on performance and limits
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

  if (loading)
    return (
      <div className="flex justify-center items-center py-10">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-purple-500"></div>
      </div>
    );
  if (!post) {
    return (
      <div className="">
        <BlogNotFound />
      </div>
    ); // Fallback in case state is missing
  }
  return (
    <>
      <Helmet>
        {/* Standard title tag */}
        <title>{post.title} | Doctor Kays</title>

        {/* Open Graph tags for rich link preview */}
        <meta property="og:type" content="article" />
        <meta property="og:title" content={post.title} />
        <meta
          property="og:description"
          content={post.description[0]?.children[0]?.text || ""}
        />
        <meta property="og:image" content={post.imageUrl} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />

        {/* Twitter Card tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.title} />
        <meta
          name="twitter:description"
          content={post.description[0]?.children[0]?.text || ""}
        />
        <meta name="twitter:image" content={post.imageUrl} />
        <meta name="twitter:image:alt" content={post.title} />
      </Helmet>

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
            {/* social sharing */}
            <SocialShare post={post} />
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
            <p className="mt-6 text-lg leading-loose">
              <PortableText
                value={post.description}
                components={portableTextComponents}
              />
            </p>
            <div className="mt-4 flex items-center gap-4 justify-center">
              <button
                onClick={() => updateReactions("like")}
                className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition"
              >
                👍 Like {post.likes}
              </button>
              <button
                onClick={() => updateReactions("dislike")}
                className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-full hover:bg-red-700 transition"
              >
                👎 Dislike {post.dislikes}
              </button>
            </div>
          </div>

          {/* Comments Section */}
          <section className="mb-16 mt-10">
            <h2 className="text-2xl font-semibold mb-4">Comments</h2>

            {/* existing comments */}
            <ul className="space-y-6 mb-8">
              {comments.map((c) => (
                <li key={c._key} className="p-4 border rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">{c.name}</span>
                    <time className="text-xs text-gray-500">
                      {fmtDate(c.postedAt)}
                    </time>
                  </div>
                  <p className="">{c.text}</p>
                </li>
              ))}
              {!comments.length && (
                <p className="text-gray-500">No comments yet.</p>
              )}
            </ul>

            {/* new comment form */}
            <form onSubmit={handleSubmitComment} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Name</label>
                <input
                  type="text"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  disabled={isPosting}
                  className="w-full border rounded-lg px-3 py-2 text-black"
                  placeholder="Your name"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Comment
                </label>
                <textarea
                  value={newText}
                  onChange={(e) => setNewText(e.target.value)}
                  disabled={isPosting}
                  className="w-full border rounded-lg px-3 py-2 text-black"
                  placeholder="Your comment…"
                  rows={4}
                  required
                />
              </div>
              <button
                type="submit"
                disabled={isPosting}
                className={`flex items-center gap-2 px-6 py-2 rounded-lg text-white
      ${
        isPosting
          ? "bg-gray-400 cursor-not-allowed"
          : "bg-gradient-to-r from-fuchsia-700 to-slate-500 hover:opacity-90"
      }`}
              >
                {isPosting ? (
                  <>
                    <svg
                      className="animate-spin h-5 w-5"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v8H4z"
                      />
                    </svg>
                    Posting…
                  </>
                ) : (
                  <>
                    Post Comment
                    <FaComment />
                  </>
                )}
              </button>
            </form>
          </section>

          {/* Recommended Articles Section */}
          <div className="mt-12 p-4">
            {recommendedArticles.length > 0 ? (
              <>
                <h2 className="text-2xl font-semibold mb-4">
                  {recommendedArticles.length &&
                  recommendedArticles[0].category === post.category
                    ? "Related & Recommended Articles"
                    : "Featured Articles"}
                </h2>

                <div className="flex space-x-4 overflow-x-auto">
                  {recommendedArticles.map((article) => (
                    <div
                      key={article._id}
                      onClick={() => {
                        window.scrollTo({ top: 0, left: 0 });
                        navigate(`/blog/${article.slug.current}`, {
                          state: article,
                        });
                      }}
                      className="min-w-[250px] sm:min-w-[300px] md:min-w-[350px]  md:p-4 p-2 rounded-lg cursor-pointer"
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
                      <h3 className="text-xl  font-semibold mb-2">
                        {article.title}
                      </h3>
                      <p className="text-sm text-gray-400 mb-4">
                        {truncateText(article.descriptionText, 20)}...
                        <span className=""> read more</span>
                      </p>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center text-gray-400 mt-6">
                <p>
                  No related or recommended articles found for this blog post.
                  Check out other blogs{" "}
                  <a className="text-blue underline" href="/blog">
                    here.
                  </a>
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
    </>
  );
};

export default BlogDetail;
