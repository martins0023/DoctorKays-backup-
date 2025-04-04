// src/pages/Community.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { staggerContainer } from "../constants/animations";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Stayintouch from "../components/Stayintouch";
import {
  Bell,
  FileQuestionIcon,
  HomeIcon,
  LucideBarChartBig,
  MessageCircle,
  ThumbsDown,
  ThumbsUp,
} from "lucide-react";
import Modal from "../components/Modal";
import { useNavigate } from "react-router-dom";

const Community = () => {
  const [questions, setQuestions] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch questions from the backend on mount
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await axios.get(
          "https://doctorkays-backend-1.onrender.com/api/questions" ||
            "http://localhost:5000/api/questions"
        );
        setQuestions(res.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };
    fetchQuestions();
  }, []);

  // Handle new question submission
  const handleQuestionSubmit = async (formData) => {
    try {
      const res = await axios.post(
        "https://doctorkays-backend-1.onrender.com/api/questions" ||
          "http://localhost:5000/api/questions",
        formData
      );
      // Prepend new question to the list
      setQuestions((prev) => [res.data, ...prev]);
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error submitting question:", error);
    }
  };

  const handleReaction = async (questionId, type) => {
    try {
      // Call the backend endpoint to update the reaction count
      const res = await axios.patch(
        `https://doctorkays-backend-1.onrender.com/api/questions/${questionId}/reactions` ||
          `http://localhost:5000/api/questions/${questionId}/reactions`,
        { type }
      );
      // Update local state (assuming you have setQuestions in your component)
      setQuestions((prevQuestions) =>
        prevQuestions.map((q) => (q._id === questionId ? res.data : q))
      );
    } catch (err) {
      console.error(`Error updating ${type}:`, err);
    }
  };

  // Navigate to question detail page when a question is clicked
  const goToQuestionDetail = (question) => {
    navigate(`/community/${question._id}`, { state: { question } });
    window. scrollTo({ top: 0, left: 0})
  };

  return (
    <div>
      <Navbar />
      <motion.div
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
        className="max-w-7xl mx-auto md:pt-20 pt-10 px-6"
      >
        <div className="flex justify-between items-center mb-6">
          <h1 className="sm:text-3xl text-xl font-bold">Community Forum</h1>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-primary text-white py-2 px-4 rounded hover:opacity-90 transition"
          >
            Ask a Question
          </button>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Left Sidebar */}
          <aside className="hidden md:block md:w-1/4 bg-gray-50 p-4 rounded">
            <p className="mb-3 opacity-50">Main Menu</p>
            <nav className="space-y-5">
              <div className="flex items-center gap-2">
                <HomeIcon className="text-black" />
                <a
                  href="#"
                  className="block text-gray-600 font-semibold hover:text-black"
                >
                  Home
                </a>
              </div>
              <div className="flex items-center gap-2">
                <LucideBarChartBig className="text-black" />
                <a
                  href="#"
                  className="block font-semibold text-gray-600 hover:text-black"
                >
                  Categories
                </a>
              </div>
              <div className="flex items-center gap-2">
                <FileQuestionIcon className="text-black" />
                <a
                  href="#"
                  className="block font-semibold text-gray-600 hover:text-black"
                >
                  My Questions
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Bell className="text-black" />
                <a
                  href="#"
                  className="block font-semibold text-gray-600 hover:text-black"
                >
                  Notifications
                </a>
              </div>
            </nav>
          </aside>

          {/* Main Feed */}
          <main className="md:w-2/4 w-full">
            {loading ? (
              <div className="flex justify-center items-center py-10">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-purple-500"></div>
              </div>
            ) : (
              questions.map((q) => (
                <div
                  key={q._id}
                  className="border bg-white p-4 mb-4 rounded-lg cursor-pointer hover:shadow-lg transition"
                >
                  <div className="flex justify-between items-center">
                    <h2 className="text-base text-black font-semibold">
                      {q.user}
                    </h2>
                    <span className="text-sm text-gray-400">
                      {new Date(q.date).toLocaleDateString("en-CA")}
                    </span>
                  </div>
                  <p className="font-semibold text-black mt-2">{q.title}</p>
                  <div
                    onClick={() => goToQuestionDetail(q)}
                    className="text-black mt- cursor-pointer"
                  >
                    {q.question}
                  </div>
                  <div className="mt-2 flex flex-wrap md:flex-nowrap items-center justify-between md:gap-5 text-sm text-gray-500">
                    {/* Like Button with continuous pulse */}
                    <motion.div
                      className="flex items-center gap-1 cursor-pointer"
                      onClick={() => handleReaction(q._id, "like")}
                      whileHover={{ scale: 1.2 }}
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      <ThumbsUp className="w-4 h-4 text-green-600" />
                      <span className="hidden sm:inline">Likes: {q.likes}</span>
                      <span className="inline sm:hidden">{q.likes}</span>
                    </motion.div>

                    {/* Dislike Button with continuous pulse */}
                    <motion.div
                      className="flex items-center gap-1 cursor-pointer"
                      onClick={() => handleReaction(q._id, "dislike")}
                      whileHover={{ scale: 1.2 }}
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      <ThumbsDown className="w-4 h-4 text-red-600" />
                      <span className="hidden sm:inline">
                        Dislikes: {q.dislikes}
                      </span>
                      <span className="inline sm:hidden">{q.dislikes}</span>
                    </motion.div>

                    {/* Comment Button with a slight rotation effect */}
                    <motion.div
                      className="flex items-center gap-1 cursor-pointer"
                      onClick={() => goToQuestionDetail(q)}
                      whileHover={{ scale: 1.2 }}
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      <MessageCircle className="w-4 h-4 text-blue-600" />
                      <span className="hidden sm:inline">
                        Comments: {q.comments.length}
                      </span>
                      <span className="inline sm:hidden">
                        {q.comments.length}
                      </span>
                    </motion.div>

                    {/* Doctor Replied Status (static) */}
                    {q.hasDoctorReplied ? (
                      <span className="bg-green-100 text-green-700 px-2 py-1 rounded-xl text-xs sm:text-sm">
                        Doctor Kays has replied
                      </span>
                    ) : (
                      <span className="bg-red-100 text-red-700 px-2 py-1 rounded-xl text-xs sm:text-sm">
                        Doctor Kays hasn't replied
                      </span>
                    )}
                  </div>
                </div>
              ))
            )}
          </main>

          {/* Right Sidebar */}
          <aside className="hidden md:block md:w-1/4 bg-gray-50 p-4 rounded shadow">
            <h3 className="font-bold mb-2">Search</h3>
            <input
              type="text"
              placeholder="Search questions..."
              className="w-full border p-2 rounded text-sm"
            />
          </aside>
        </div>

        <Stayintouch />
        <Footer />
      </motion.div>
      <footer className="bg-primary text-white p-4 text-center">
        <div>© 2025 Doctor Kays</div>
      </footer>

      {/* Ask Question Modal */}
      {isModalOpen && (
        <AskQuestionModal
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleQuestionSubmit}
        />
      )}
    </div>
  );
};

export default Community;

/** AskQuestionModal Component */
const AskQuestionModal = ({ onClose, onSubmit }) => {
  const [name, setName] = useState(""); //name
  const [title, setTitle] = useState(""); //title
  const [question, setQuestion] = useState(""); //question
  const [submitting, setSubmitting] = useState(false);

  // Compute validity: both name and question must be non-empty
  const isFormValid = name.trim() !== "" && title.trim() !== "" && question.trim() !== "";

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid) return;
    setSubmitting(true);
    try {
      // Await onSubmit in case it returns a Promise
      await onSubmit({ user: name, title, question });
    } catch (error) {
      console.error("Error during submission:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded shadow w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-xl"
        >
          &times;
        </button>
        <h2 className="text-2xl text-black font-bold mb-4">Ask a Question</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-black text-sm font-medium">
              Your Name
            </label>
            <input
              placeholder="John Doe"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border p-2 rounded text-black"
              required
            />
          </div>

          {/* title */}
          <div>
            <label className="block text-black text-sm font-medium">
              Title
            </label>
            <input
              placeholder="A nice title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border p-2 rounded text-black"
              required
            />
          </div>

          {/* Question */}
          <div>
            <label className="block text-black text-sm font-medium">
              Question
            </label>
            <textarea
              placeholder="Ask a question that is bothering you"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              className="w-full border p-2 rounded text-black"
              rows="4"
              required
            />
          </div>
          {/* <div>
            <p className="text-gray-700">Terms and policy</p>
          </div> */}
          <button
            type="submit"
            disabled={!isFormValid || submitting}
            className={`bg-primary text-white py-2 px-4 rounded hover:opacity-90 transition ${
              !isFormValid || submitting ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {submitting ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
};
