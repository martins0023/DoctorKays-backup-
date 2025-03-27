import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { ThumbsUp, ThumbsDown } from "lucide-react";

const QuestionDetail = () => {
  const location = useLocation();
  const { question } = location.state || {};
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState(question ? question.comments : []);

  if (!question) return <p>Question not found.</p>;

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        // Use the appropriate environment-based URL
        `https://doctorkays-backend-1.onrender.com/api/questions/${question._id}/comments`
      );
      setComments(res.data.comments);
      setComment("");
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  // Example: If you want interactive likes/dislikes on detail page, you'd do something like:
  // const handleLike = async () => {
  //   // ...call your patch endpoint
  // };
  // const handleDislike = async () => {
  //   // ...call your patch endpoint
  // };

  return (
    <div>
      <Navbar />
      <div className="max-w-3xl mx-auto p-6">
        {/* Question Header */}
        <div className="bg-white p-4 rounded shadow mb-4">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-2xl font-bold text-gray-800">{question.user}</h2>
            <span className="text-sm text-gray-500">
              {new Date(question.date).toLocaleDateString("en-CA")}
            </span>
          </div>
          <p className="text-lg text-gray-700 mb-3">{question.question}</p>

          {/* Likes / Dislikes Section */}
          <div className="flex items-center gap-4 text-sm text-gray-500">
            {/* Enhanced Like Button */}
            <div className="flex items-center gap-1 bg-gray-100 px-3 py-1 rounded-full">
              <ThumbsUp className="w-4 h-4 text-green-600" />
              <span className="font-medium text-gray-600">{question.likes}</span>
            </div>
            {/* Enhanced Dislike Button */}
            <div className="flex items-center gap-1 bg-gray-100 px-3 py-1 rounded-full">
              <ThumbsDown className="w-4 h-4 text-red-600" />
              <span className="font-medium text-gray-600">{question.dislikes}</span>
            </div>
          </div>

          {/* Doctor Replied Status */}
          <div className="mt-3">
            {question.hasDoctorReplied ? (
              <span className="bg-green-100 text-green-700 px-3 py-1 rounded-md text-xs sm:text-sm font-semibold">
                Doctor Kays has replied
              </span>
            ) : (
              <span className="bg-red-100 text-red-700 px-3 py-1 rounded-md text-xs sm:text-sm font-semibold">
                Doctor Kays hasn't replied
              </span>
            )}
          </div>
        </div>

        {/* Comments Section */}
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">Comments</h3>
          {comments.length > 0 ? (
            comments.map((c, idx) => (
              <div key={idx} className="border-b last:border-b-0 pb-3 mb-3 last:mb-0 last:pb-0">
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
            <p className="text-sm text-gray-500">No comments yet. Be the first to comment!</p>
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
              type="submit"
              className="mt-2 bg-primary text-white py-2 px-4 rounded hover:opacity-90 transition"
            >
              Submit Comment
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
