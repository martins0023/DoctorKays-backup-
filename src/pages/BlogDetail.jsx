import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Stayintouch from "../components/Stayintouch";
import Footer from "../components/Footer";
import { Calendar, PlayCircle, PauseCircle } from "lucide-react";
import { Blogposts } from "../constants";
import BlogNotFound from "../components/BlogNotFound";
import Testimonials from "../components/Testimonials";
import { client } from "../../lib/client";
import { PortableText } from '@portabletext/react';

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

  
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSpeaking, setIsSpeaking] = useState(false); // TTS state
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
          description
        }`;
        const data = await client.fetch(query, { id }); // Pass the id as a parameter
        setPost(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching post:', error);
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);
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
      const CHUNK_SIZE = 100; // Adjust based on performance and limits
      const textChunks = plainText.match(new RegExp(`.{1,${CHUNK_SIZE}}(\\s|$)`, 'g'));
  
      if (!textChunks || textChunks.length === 0) {
        alert("No content available to read.");
        return;
      }
  
      // Speak each chunk sequentially
      let currentChunkIndex = 0;
  
      const speakChunk = () => {
        if (currentChunkIndex < textChunks.length) {
          const utterance = new SpeechSynthesisUtterance(textChunks[currentChunkIndex]);
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
              <p className="text-sm font-medium ">
                {`${post.date} `}
              </p>
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
            <PortableText value={post.description} />
          </p>
        </div>

        {/* Recommended Articles Section */}
        <div className="mt-12 p-4">
          <h2 className="text-2xl font-semibold mb-4">Recommended Articles</h2>
          <div className="flex space-x-4 overflow-x-auto">
            {Blogposts.map((post) => (
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
            {Blogposts.map((post) => (
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
