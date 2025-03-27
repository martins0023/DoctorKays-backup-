// src/pages/QuestionDetail.jsx
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const QuestionDetail = () => {
  const location = useLocation();
  const { question } = location.state || {}; // Ensure you pass the question state from Community
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState(question ? question.comments : []);

  if (!question) return <p>Question not found.</p>;

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `https://doctorkays-backend-1.onrender.com/api/questions/${question._id}/comments` || `http://localhost:5000/api/questions/${question._id}/comments`,
        { user: "Anonymous", content: comment }
      );
      setComments(res.data.comments);
      setComment("");
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="max-w-3xl mx-auto p-6">
        <h2 className="text-3xl font-bold mb-2">{question.user}</h2>
        <p className="text-gray-600 mb-4">
          {new Date(question.date).toLocaleDateString('en-CA')}
        </p>
        <p className="text-xl mb-4">{question.question}</p>
        <div className="mb-4">
          <p>
            <strong>Likes:</strong> {question.likes} |{" "}
            <strong>Dislikes:</strong> {question.dislikes}
          </p>
          <p className="mt-2">
            {question.hasDoctorReplied ? (
              <span className="bg-green-100 text-green-700 px-2 py-1 rounded">
                Doctor Kays has replied
              </span>
            ) : (
              <span className="bg-red-100 text-red-700 px-2 py-1 rounded">
                Doctor Kays hasn't replied
              </span>
            )}
          </p>
        </div>

        <hr className="my-4" />

        <div>
          <h3 className="text-2xl font-semibold mb-3">Comments</h3>
          {comments.map((c, idx) => (
            <div key={idx} className="border p-3 rounded mb-2">
              <p>
                <strong>{c.user}</strong> on{" "}
                {new Date(c.date).toLocaleDateString('en-CA')}
              </p>
              <p>{c.content}</p>
            </div>
          ))}
          <form onSubmit={handleCommentSubmit} className="mt-4">
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full border p-2 rounded"
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
