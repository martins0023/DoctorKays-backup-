import React, { useState } from "react";
import {
  FileText,
  Camera,
  Cpu,
  UserCheck,
} from "lucide-react";

const AI_OPTIONS = [
  {
    id: "upload",
    title: "Upload Report",
    description: "Upload your PDF or DOC report for instant analysis.",
    Icon: FileText,
    color: "from-blue-100 to-blue-200",
  },
  {
    id: "photo",
    title: "Snap a Photo",
    description: "Take a picture of your report using your device camera.",
    Icon: Camera,
    color: "from-purple-100 to-purple-200",
  },
  {
    id: "capabilities",
    title: "AI Capabilities",
    description: "Explore what our AI can do with your medical data.",
    Icon: Cpu,
    color: "from-green-100 to-green-200",
  },
];

export default function AIScan() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [query, setQuery] = useState("");

  return (
    <div className="flex min-h-screen bg-[#f7f9fa]">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white p-6 border-r border-gray-200 transition-transform transform lg:relative lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <button
          className="mb-6 lg:hidden p-2 rounded-md hover:bg-gray-100 focus:outline-none"
          onClick={() => setSidebarOpen(false)}
          aria-label="Close sidebar"
        >
          ✕
        </button>
        <h1 className="text-xl font-semibold text-gray-800 mb-8">HealthAI</h1>
        <nav className="space-y-4">
          <button className="w-full text-left px-4 py-2 rounded-xl bg-gray-100 text-gray-700 font-medium">
            Home
          </button>
          <button className="w-full text-left px-4 py-2 rounded-xl hover:bg-gray-100 text-gray-700">
            Agents
          </button>
          <button className="w-full text-left px-4 py-2 rounded-xl hover:bg-gray-100 text-gray-700">
            History
          </button>
        </nav>
      </aside>

      {/* Sidebar Toggle Button */}
      <button
        className="fixed top-4 left-4 z-50 lg:hidden p-2 bg-white rounded-md shadow-md"
        onClick={() => setSidebarOpen(true)}
        aria-label="Open sidebar"
      >
        ☰
      </button>

      {/* Main Content */}
      <main className="flex-1 flex flex-col lg:ml-64">
        <div className="flex-1 overflow-auto p-6 lg:p-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-1">
            Hello, Abo
          </h2>
          <p className="text-lg text-gray-500 mb-8">
            How can I help you today?
          </p>

          {/* Action Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {AI_OPTIONS.map(({ id, title, description, Icon, color }) => (
              <div
                key={id}
                className="p-6 rounded-2xl bg-white shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-100"
              >
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center mb-4`}
                >
                  <Icon className="text-gray-700 w-6 h-6" />
                </div>
                <h4 className="font-semibold text-gray-800 mb-1">{title}</h4>
                <p className="text-sm text-gray-500">{description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Prompt Area - fixed at bottom */}
        <div className="bg-white px-4 py-3 border-t border-gray-200 flex items-center space-x-3 fixed bottom-0 left-0 w-full lg:ml-64">
          <input
            type="text"
            placeholder="Ask anything from HealthAI"
            className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:outline-none"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button className="bg-teal-600 text-white px-4 py-2 rounded-full font-medium hover:bg-teal-700 transition">
            Ask
          </button>
        </div>
      </main>
    </div>
  );
}
