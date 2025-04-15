// src/pages/Community.jsx
import React, { useState, useEffect, lazy, Suspense } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { staggerContainer } from "../constants/animations";
// import Navbar from "../components/Navbar";
// import Footer from "../components/Footer";
// import Stayintouch from "../components/Stayintouch";
import {
  Bell,
  BotMessageSquare,
  FileQuestion,
  FileQuestionIcon,
  HomeIcon,
  LucideBarChartBig,
  MessageCircle,
  MessageCircleQuestion,
  MessagesSquare,
  ThumbsDown,
  ThumbsUp,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

// Lazy‑load these components (with preload/prefetch hints)
const Navbar = lazy(() =>
  import(/* webpackPreload: true */ "../components/Navbar")
);
const Footer = lazy(() =>
  import(/* webpackPreload: true */ "../components/Footer")
);
const Stayintouch = lazy(() =>
  import(/* webpackPrefetch: true */ "../components/Stayintouch")
);
const AskQuestionModal = lazy(() =>
  import(/* webpackPrefetch: true */ "../components/AskQuestionModal")
);

const Community = () => {
  const [questions, setQuestions] = useState([]);
  // track which questions this browser has liked
  const [likedIds, setLikedIds] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("likedQuestions") || "[]");
    } catch {
      return [];
    }
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch questions from the backend on mount
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await axios.get(
          "https://doctorkays-backend-1.onrender.com/api/questions" ??
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
        "https://doctorkays-backend-1.onrender.com/api/questions" ??
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

  // const handleReaction = async (questionId, type) => {
  //   try {
  //     // Call the backend endpoint to update the reaction count
  //     const res = await axios.patch(
  //       `https://doctorkays-backend-1.onrender.com/api/questions/${questionId}/reactions` ||
  //         `http://localhost:5000/api/questions/${questionId}/reactions`,
  //       { type }
  //     );
  //     // Update local state (assuming you have setQuestions in your component)
  //     setQuestions((prevQuestions) =>
  //       prevQuestions.map((q) => (q._id === questionId ? res.data : q))
  //     );
  //   } catch (err) {
  //     console.error(`Error updating ${type}:`, err);
  //   }
  // };

  // Like once per browser
  const handleLike = (questionId) => {
    if (likedIds.includes(questionId)) return;

    // 1) Optimistically update UI
    setQuestions((prev) =>
      prev.map((q) => (q._id === questionId ? { ...q, likes: q.likes + 1 } : q))
    );
    const nextLiked = [...likedIds, questionId];
    setLikedIds(nextLiked);
    localStorage.setItem("likedQuestions", JSON.stringify(nextLiked));

    // 2) Fire the request (no await)
    axios
      .patch(
        `https://doctorkays-backend-1.onrender.com/api/questions/${questionId}/reactions`,
        { type: "like" }
      )
      .then((res) => {
        // Optionally reconcile with server response
        setQuestions((prev) =>
          prev.map((q) => (q._id === questionId ? res.data : q))
        );
      })
      .catch((err) => {
        console.error("Like failed:", err);
        // Roll back on error
        setQuestions((prev) =>
          prev.map((q) =>
            q._id === questionId ? { ...q, likes: q.likes - 1 } : q
          )
        );
        const rolledBack = likedIds.filter((id) => id !== questionId);
        setLikedIds(rolledBack);
        localStorage.setItem("likedQuestions", JSON.stringify(rolledBack));
      });
  };

  // Navigate to question detail page when a question is clicked
  const goToQuestionDetail = (question) => {
    navigate(`/community/${question._id}`, { state: { question } });
    window.scrollTo({ top: 0, left: 0 });
  };

  return (
    <div>
      <Suspense fallback={null}>
        <Navbar />
      </Suspense>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
        className="max-w-7xl mx-auto md:pt-20 pt-10 px-6"
      >
        <div className="flex justify-between items-left mb-6">
          <h1 className="sm:text-2xl text-lg font-bold border-b-2 border-primary">
            Community Forum
          </h1>
        </div>

        <div className="flex items-center justify-center mb-2">
          <BotMessageSquare className="bg-gradient-to-r from-purple-500 to-purple-950 text-transparent rounded-full p-2 text-white w-14 h-14" />
        </div>

        <div className="flex flex-col justify-items-center justify-center mb-5">
          <p className="leading-snug text-center sm:text-3xl text-2xl mb-2 font-normal">
            Welcome to the{" "}
            <span className="bg-gradient-to-r from-purple-500 to-purple-950 text-transparent bg-clip-text">
              Doctor Kays Community
            </span>{" "}
            Central Help Forum
          </p>
        </div>
        <div className="flex items-center justify-center mb-6">
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex justify-center items-center gap-1 bg-gradient-to-l from-purple-500 to-purple-950 text-transparent text-white py-3 px-4 rounded hover:opacity-90 transition"
          >
            Ask a Question
            <MessageCircleQuestion />
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
                  className=" p-4 mb-4 border-t cursor-pointer hover:shadow-lg transition"
                >
                  <div className="flex justify-between items-center">
                    <h2 className="text-base font-semibold">{q.user}</h2>
                    <span className="text-sm text-gray-400">
                      {new Date(q.date).toLocaleDateString("en-CA")}
                    </span>
                  </div>

                  <p className="font-semibold mt-1">{q.title}</p>
                  <div
                    onClick={() => goToQuestionDetail(q)}
                    className="mt- cursor-pointer leading-normal"
                  >
                    {q.question}
                  </div>
                  <div className="mt-2 flex flex-wrap md:flex-nowrap items-center justify-between md:gap-5 text-sm text-gray-700">
                    {/* Like Button with continuous pulse */}
                    <motion.div
                      className={`flex items-center px-3 py-1 rounded-full gap-1 cursor-pointer transition-colors ${
                        likedIds.includes(q._id)
                          ? "bg-green-100 text-green-950 pointer-events-none"
                          : "bg-gray-100 text-gray-700 hover:bg-green-200"
                      }`}
                      onClick={() => handleLike(q._id)}
                      whileHover={{
                        scale: likedIds.includes(q._id) ? 1 : 1.05,
                      }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <ThumbsUp className="w-4 h-4" />
                      <span className="hidden sm:inline">Likes: {q.likes}</span>
                      <span className="inline sm:hidden">{q.likes}</span>
                    </motion.div>

                    {/* Comment Button with a slight rotation effect */}
                    <motion.div
                      className="flex items-center bg-gray-100 px-3 py-1 rounded-full gap-1 cursor-pointer"
                      onClick={() => goToQuestionDetail(q)}
                      whileHover={{ scale: 1.2 }}
                      // animate={{ scale: [1, 1.1, 1] }}
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
                  {q.hasDoctorReplied && q.answer && (
                    <div className="pl-4 border-l-4 mt-2 border-green-600 bg-gray-50 rounded-md p-1">
                      <p className="mt-1 text-sm text-gray-600">{q.answer}</p>
                    </div>
                  )}
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

        <Suspense fallback={null}>
          <Stayintouch />
        </Suspense>
        <Suspense fallback={null}>
          <Footer />
        </Suspense>
      </motion.div>
      <footer className="bg-primary text-white p-4 text-center">
        <div>© 2025 Doctor Kays</div>
      </footer>

      {/* Ask Question Modal */}
      {isModalOpen && (
        <Suspense
          fallback={
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <div className="loader">Loading…</div>
            </div>
          }
        >
          <AskQuestionModal
            onClose={() => setIsModalOpen(false)}
            onSubmit={handleQuestionSubmit}
          />
        </Suspense>
      )}
    </div>
  );
};

export default Community;
