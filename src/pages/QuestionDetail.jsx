import React, { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import axios from "axios";
import { Helmet } from "react-helmet";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { ThumbsUp, ThumbsDown, MessageCircle, Share2 } from "lucide-react";
import { motion } from "framer-motion";

const QuestionDetail = () => {
  const location = useLocation();
  const { id } = useParams(); // assuming your route is something like /community/:id
  const initialQuestion = location.state?.question;

  // Use a local state so we can update the question details when reactions change.
  const [questionDetail, setQuestionDetail] = useState(initialQuestion);

  const [error, setError] = useState(null);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState(
    initialQuestion ? initialQuestion.comments : []
  );
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(!initialQuestion);

  // Compute validity: comment must be non-empty
  const isFormValid = comment.trim() !== "";

  // If questionDetail is not available from location state, fetch it
  useEffect(() => {
    if (!questionDetail && id) {
      const fetchQuestion = async () => {
        try {
          const res = await axios.get(`https://doctorkays-backend-1.onrender.com/api/questions/${id}` || `http://localhost:5000/api/questions/${id}`);
          setQuestionDetail(res.data);
          
          setComments(res.data.comments || []);
          setLoading(false);
        } catch (err) {
          console.error("Error fetching question:", err);
          setError("Question not found.");
          setLoading(false);
        }
      };
      fetchQuestion();
    }
  }, [id, questionDetail]);

  // Function to update likes/dislikes
  const handleReaction = async (type) => {
    try {
      const res = await axios.patch(
        `https://doctorkays-backend-1.onrender.com/api/questions/${questionDetail._id}/reactions`,
        { type }
      );
      // Update the local question state with the updated question data
      setQuestionDetail(res.data);
    } catch (err) {
      console.error(`Error updating ${type}:`, err);
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid) return;
    setSubmitting(true);
    try {
      const res = await axios.post(
        `https://doctorkays-backend-1.onrender.com/api/questions/${questionDetail._id}/comments` ||
          `http://localhost:5000/api/questions/${questionDetail._id}/comments`,
        { user: "Anonymous", content: comment }
      );
      setComments(res.data.comments);
      setComment("");
    } catch (error) {
      console.error("Error adding comment:", error);
    } finally {
      setSubmitting(false);
    }
  };

  // Share function using Web Share API or fallback to clipboard
  const handleShare = async () => {
    const shareUrl = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Check out this question on Doctor Kays",
          url: shareUrl,
        });
        console.log("Shared successfully");
      } catch (error) {
        console.error("Error sharing:", error);
      }
    } else {
      try {
        await navigator.clipboard.writeText(shareUrl);
        alert("Link copied to clipboard!");
      } catch (err) {
        console.error("Failed to copy the link", err);
      }
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error || !questionDetail) return <p>{error || "Question not found."}</p>;

  return (
    <div>
      {/* Use Helmet to update meta tags dynamically */}
      <Helmet>
        <title>{questionDetail.question}</title>
        <meta name="description" content={questionDetail.question} />
      </Helmet>
      <Navbar />
      <div className="max-w-3xl mx-auto p-6">
        {/* Question Header */}
        <div className="bg-white p-4 rounded shadow mb-4">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-base font-bold text-gray-800">
              {questionDetail.user}
            </h2>
            <span className="text-sm text-gray-500">
              {new Date(questionDetail.date).toLocaleDateString("en-CA")}
            </span>
          </div>
          <p className="font-semibold text-black text-base mt-2">
            {questionDetail.title}
          </p>
          <p className="text-md text-gray-700 mb-3">
            {questionDetail.question}
          </p>

          {/* Likes / Dislikes Section */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-4 text-sm text-gray-500"
          >
            {/* Enhanced Like Button */}
            <div
              className="flex items-center gap-1 bg-gray-100 px-3 py-1 rounded-full cursor-pointer hover:scale-110 transition-transform"
              onClick={() => handleReaction("like")}
            >
              <ThumbsUp className="w-4 h-4 text-green-600" />
              <span className="font-medium text-gray-600">
                {questionDetail.likes}
              </span>
            </div>
            {/* Enhanced Dislike Button */}
            <div
              className="flex items-center gap-1 bg-gray-100 px-3 py-1 rounded-full cursor-pointer hover:scale-110 transition-transform"
              onClick={() => handleReaction("dislike")}
            >
              <ThumbsDown className="w-4 h-4 text-red-600" />
              <span className="font-medium text-gray-600">
                {questionDetail.dislikes}
              </span>
            </div>
            {/* Share Button */}
            <div
              className="flex items-center gap-1 bg-gray-100 px-3 py-1 rounded-full cursor-pointer hover:scale-110 transition-transform"
              onClick={handleShare}
            >
              <Share2 className="w-4 h-4 text-blue-600" />
              <span className="font-medium text-gray-600">Share</span>
            </div>
          </motion.div>

          {/* Doctor Replied Status */}
          <div className="mt-4 p-4 border rounded-lg bg-gray-50">
            <div className="flex items-center gap-3 mb-2">
              {questionDetail.hasDoctorReplied ? (
                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-md text-xs sm:text-sm font-semibold">
                  Doctor Kays has replied
                </span>
              ) : (
                <span className="bg-red-100 text-red-700 px-3 py-1 rounded-md text-xs sm:text-sm font-semibold">
                  Doctor Kays hasn't replied
                </span>
              )}
            </div>
            {questionDetail.answer && (
              <div className="pl-4 border-l-4 border-green-600">
                <p className="text-gray-700 text-sm leading-relaxed">
                  {questionDetail.answer}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Comments Section */}
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">Comments</h3>
          {comments.length > 0 ? (
            comments.map((c, idx) => (
              <div
                key={idx}
                className="border-b last:border-b-0 pb-3 mb-3 last:mb-0 last:pb-0"
              >
                <div className="flex items-center justify-between">
                  <span className="text-gray-700 font-medium">{c.user}</span>
                  <span className="text-xs text-gray-500">
                    {new Date(c.date).toLocaleDateString("en-CA")}
                  </span>
                </div>
                <p className="text-gray-600 mt-1">{c.content}</p>
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-500">
              No comments yet. Be the first to comment!
            </p>
          )}

          {/* Comment Form */}
          <form onSubmit={handleCommentSubmit} className="mt-4">
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full border p-2 rounded text-gray-700"
              rows="3"
              placeholder="Add a comment..."
              required
            />
            <button
              disabled={!isFormValid || submitting}
              type="submit"
              className={`bg-primary text-white py-2 px-4 rounded hover:opacity-90 transition ${
                !isFormValid || submitting
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
            >
              {submitting ? "Commenting..." : "Submit comment"}
            </button>
          </form>
        </div>
      </div>

      <div className="max-w-7xl mx-auto md:pt-20 pt-10 px-6">
        <Footer />
      </div>
      <footer className="bg-primary text-white p-4 text-center">
        <div>© 2025 Doctor Kays</div>
      </footer>
    </div>
  );
};

export default QuestionDetail;
