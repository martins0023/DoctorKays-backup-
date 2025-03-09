import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Stayintouch from "../components/Stayintouch";
import { motion } from "framer-motion";
import { staggerContainer } from "../constants/animations";
import {
  Bell,
  FileQuestionIcon,
  HomeIcon,
  LucideBarChartBig,
  MessageCircle,
  ThumbsDown,
  ThumbsUp,
} from "lucide-react";

// Example question data structure for demonstration
// In production, you'd fetch these from your MongoDB backend
const initialQuestions = [
  {
    _id: "1",
    user: "John Doe",
    question: "How do I handle migraines effectively?",
    hasDoctorReplied: true,
    likes: 10,
    dislikes: 2,
    comments: 4,
    date: "2025-03-10",
  },
  {
    _id: "2",
    user: "Jane Smith",
    question: "What are the best supplements for daily health?",
    hasDoctorReplied: false,
    likes: 3,
    dislikes: 0,
    comments: 1,
    date: "2025-03-09",
  },
];

const Community = () => {
  const [questions, setQuestions] = useState(initialQuestions);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Sort questions in reverse chronological order if date is a real date
  // If your date is a string like "2025-03-10", you can parse it or store a timestamp
  // For demonstration, we'll assume the data is already in order, or you can do:
  // const sortedQuestions = [...questions].sort((a,b) => new Date(b.date) - new Date(a.date))

  // Toggle the modal for asking a question
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // Handle question submission from the modal
  const handleQuestionSubmit = (formData) => {
    // Typically you'd POST to your backend here. For now, just add to local state.
    const newQuestion = {
      _id: Date.now().toString(),
      user: formData.name,
      question: formData.question,
      hasDoctorReplied: false,
      likes: 0,
      dislikes: 0,
      comments: 0,
      date: new Date().toISOString().slice(0, 10), // e.g., "2025-03-10"
    };
    setQuestions((prev) => [newQuestion, ...prev]); // Prepend to keep newest on top
    closeModal();
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
          <h1 className="text-3xl font-bold">Community Forum</h1>
          <button
            onClick={openModal}
            className="bg-primary text-white py-2 px-4 rounded hover:opacity-90 transition"
          >
            Ask a Question
          </button>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Left Sidebar */}
          <aside className="hidden md:block md:w-1/4 bg-gray-50 opacity-100 p-4 rounded ">
            <p className="mb-3 opacity-50">main menu</p>
            <nav className="space-y-5 ">
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
            {questions.map((q) => (
              <div key={q._id} className="border bg-white p-4 mb-4 rounded-lg">
                <div className="flex justify-between items-center">
                  <h2 className="text-lg text-black font-semibold">{q.user}</h2>
                  <span className="text-sm text-gray-400">{q.date}</span>
                </div>
                <p className="text-black mt-2">{q.question}</p>

                {/* 
         flex-wrap on small screens ensures items wrap to a new line if there's not enough space 
         gap-2 on mobile, gap-5 on larger screens for better spacing 
      */}
                <div className="mt-2 flex flex-wrap md:flex-nowrap items-center justify-between md:gap-5 text-sm text-gray-500">
                  {/* Likes */}
                  <div className="flex items-center gap-1">
                    <ThumbsUp className="w-4 h-4" />
                    {/* 
            Hide the label text on extra small screens, only show the number
            On bigger screens, show "Likes: 12" 
          */}
                    <span className="hidden sm:inline">Likes: {q.likes}</span>
                    <span className="inline sm:hidden">{q.likes}</span>
                  </div>

                  {/* Dislikes */}
                  <div className="flex items-center gap-1">
                    <ThumbsDown className="w-4 h-4" />
                    <span className="hidden sm:inline">
                      Dislikes: {q.dislikes}
                    </span>
                    <span className="inline sm:hidden">{q.dislikes}</span>
                  </div>

                  {/* Comments */}
                  <div className="flex items-center gap-1">
                    <MessageCircle className="w-4 h-4" />
                    <span className="hidden sm:inline">
                      Comments: {q.comments}
                    </span>
                    <span className="inline sm:hidden">{q.comments}</span>
                  </div>

                  {/* Doctor Kays Replied Status */}
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
            ))}
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
          onClose={closeModal}
          onSubmit={handleQuestionSubmit}
        />
      )}
    </div>
  );
};

export default Community;

/** Modal for Asking a Question */
const AskQuestionModal = ({ onClose, onSubmit }) => {
  const [name, setName] = useState("");
  const [question, setQuestion] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name, question });
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
          <div>
            <label className="block text-black text-sm font-medium">
              Your Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border p-2 rounded text-black"
              required
            />
          </div>
          <div>
            <label className="block text-black text-sm font-medium">
              Question
            </label>
            <textarea
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              className="w-full border p-2 rounded text-black"
              rows="4"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-primary text-white py-2 px-4 rounded hover:opacity-90 transition"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};
