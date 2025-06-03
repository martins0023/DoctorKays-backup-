// File: src/pages/BlogDetail.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Stayintouch from '../components/Stayintouch';
import Footer from '../components/Footer';
import Testimonials from '../components/Testimonials';
import { client } from '../../lib/client';
import ListenButton from '../components/Blog/ListenButton';
import BlogImage from '../components/Blog/BlogImage';
import { v4 as uuidv4 } from 'uuid';
import HelmetMeta from '../components/Blog/HelmetMeta';
import BlogContent from '../components/Blog/BlogContent';
import ReactionButtons from '../components/Blog/ReactionButtons';
import RecommendedArticles from '../components/Blog/RecommendedArticles';
import CommentsSection from '../components/Blog/CommentsSection';
import BlogHeader from '../components/Blog/BlogHeader';
import Spinner from '../components/Blog/Spinner';
import NotFound from '../components/Blog/NotFound';


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
  const { id } = useParams();
  const location = useLocation();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [isPosting, setIsPosting] = useState(false);
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [postError, setPostError] = useState('');
  const [newName, setNewName] = useState('');
  const [newText, setNewText] = useState('');
  const [recommendedArticles, setRecommendedArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const synth = window.speechSynthesis;

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
          comments[]{
            _key, name, text, postedAt, likes, dislikes,
            replies[]{
              _key, name, text, postedAt, likes, dislikes,
              replies[]{         // third level, if you want it
                _key, name, text, postedAt, likes, dislikes
              }
            }
          }
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

  const fmtDate = iso => new Date(iso).toLocaleString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: '2-digit'
  });

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

  // NEW: Handle reaction for nested comments
  // NEW: Handle reaction for nested comments
  const handleReactComment = async (commentKey, reactionType) => {
    try {
      const incField = reactionType === 'like' ? 'likes' : 'dislikes';
      // Computed property name for dynamic path
      const path = `comments[_key=="${commentKey}"].${incField}`;
      await client
        .patch(post._id)
        .setIfMissing({ [path]: 0 })
        .inc({ [path]: 1 })
        .commit();

      // Refresh local state
      setComments(prev => prev.map(c => {
        if (c._key === commentKey) {
          return { ...c, [incField]: (c[incField] || 0) + 1 };
        }
        // Nested replies
        const updateNested = replies => replies.map(r => {
          if (r._key === commentKey) return { ...r, [incField]: (r[incField] || 0) + 1 };
          return { ...r, replies: updateNested(r.replies || []) };
        });
        return { ...c, replies: updateNested(c.replies || []) };
      }));
    } catch (err) {
      console.error('React comment failed', err);
    }
  };

  // NEW: Handle submitting a reply to a comment
  const handleSubmitReply = async (parentKey, replyObj) => {
    setPostError('');
    try {
      await client
        .patch(post._id)
        // Ensure replies array exists on target comment
        .setIfMissing({ [`comments[_key=="${parentKey}"].replies`]: [] })
        // Append to nested replies
        .append(`comments[_key=="${parentKey}"].replies`, [replyObj])
        .commit({ autoGenerateArrayKeys: true });

      // Local state update
      const addReply = items => items.map(item => {
        if (item._key === parentKey) {
          return { ...item, replies: [...(item.replies || []), replyObj] };
        }
        return { ...item, replies: addReply(item.replies || []) };
      });
      setComments(prev => addReply(prev));
    } catch (err) {
      console.error('Reply submit failed', err);
      setPostError('Failed to post reply. Please try again.');
    }
  };

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
      likes: 0, dislikes: 0, replies: []
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
  

  const truncateText = (text, maxWords) => {
    const words = text.split(' ');
    return words.length <= maxWords ? text : words.slice(0, maxWords).join(' ') + '...';
  };

  if (loading) return <Spinner />;
  if (!post) return <NotFound />;

  const descriptionText = post.description[0]?.children[0]?.text || '';

  return (
    <>
      <HelmetMeta title={post.title} description={descriptionText} imageUrl={post.imageUrl} />
      <Navbar />
      <div className="max-w-7xl mx-auto pt-8 px-6 md:px-12">
        <BlogHeader category={post.category} title={post.title} date={post.date} author={post.author} post={post} />
        <BlogImage imageUrl={post.imageUrl} alt={post.title} />
        <ListenButton isSpeaking={isSpeaking} handleSpeech={handleSpeech} />
        <BlogContent description={post.description} components={portableTextComponents} />
        <ReactionButtons likes={post.likes} onLike={() => updateReactions('like')}  />
        <CommentsSection
          comments={comments}
          onSubmit={handleSubmitComment}
          onReplySubmit={handleSubmitReply}
          onReact={handleReactComment}
          isPosting={isPosting}
          postError={postError}
          newName={newName}
          newText={newText}
          setNewName={setNewName}
          setNewText={setNewText}
          fmtDate={fmtDate}
        />
        <RecommendedArticles recommendedArticles={recommendedArticles} category={post.category} slug={post.slug} truncateText={truncateText} />
        <Testimonials />
        <Stayintouch />
      </div>
      <Footer />
      <footer className="bg-primary text-white p-4 text-center">© 2025 Doctor Kays</footer>
    </>
  );
};

export default BlogDetail;
