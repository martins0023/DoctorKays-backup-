import React from "react";
import { ArrowRight, ChevronRight } from "lucide-react";

const projects = [
  {
    id: 1,
    name: "Project MOS",
    status: "completed",
    description:
      "This unique, interactive segment brings health conversations to the people directly. By responding to health questions on the spot, Doctor Kays opens up free discussions about health concerns and builds a forum of community interaction.",
    cagr: "7.20%",
    duration: "1 yr +",
  },
  {
    id: 2,
    name: "Clinic Series",
    status: "ongoing",
    description:
      "This series takes an in-depth look at various specific topics in health matters, bringing clarity and action steps into view. Addressing common misconceptions and deconstructing medical concepts, the series empowers an individual with the knowledge to handle their health better.",
    cagr: "14.20%",
    duration: "1 yr +",
  },
  {
    id: 3,
    name: "Project Clinic Online",
    status: "upcoming",
    description:
      "A virtual platform that provides interactive health education, Clinic Online makes healthcare information more accessible. Such a service is designed to provide easy access for the public and medical professionals.",
    cagr: "11.20%",
    duration: "Upcoming",
  },
  {
    id: 4,
    name: "MOS Behind The Scene",
    status: "upcoming",
    description:
      "BTS entails how we perform our medicine on the street series.",
    cagr: "8.20%",
    duration: "Upcoming",
  },
];

const getStatusColor = (status) => {
  switch (status) {
    case "completed":
      return "bg-gradient-to-r from-green-200 to-purple-300";
    case "ongoing":
      return "bg-gradient-to-r from-yellow-200 to-indigo-300";
    case "upcoming":
      return "bg-gradient-to-r from-blue-200 to-indigo-300";
    default:
      return "bg-gray-200";
  }
};

const UpcomingProjects = () => {
  return (
    <div className="">
      <div className="text-center mt-10">
        <span className="bg-neutral-900 text-purple-500 rounded-full h-6 text-sm font-medium px-2 py-1 uppercase">
          PROJECTS
        </span>
      </div>
      <div className="flex justify-between items-center mb-6 mt-10">
        <h1 className="text-2xl font-bold ">Ongoing & Upcoming Projects</h1>
        <button className="text-sm text-blue-600 hover:underline">
          Explore All
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {projects.map((project) => (
          <div
            key={project.id}
            className={`rounded-3xl shadow-lg p-6 transform transition-all hover:scale-105 ${getStatusColor(
              project.status
            )}`}
          >
            <span className="text-sm font-medium uppercase text-gray-500">
              {project.status === "completed" ? "Strategy" : "Plans"}
            </span>
            <h2 className="text-lg font-bold text-gray-800 mt-2">
              {project.name}
            </h2>
            <p className="text-sm text-gray-600 mt-2">{project.description}</p>
            <div className="text-gray-800 bg-gray-800">
              <hr className="mt-5" />
            </div>
            <div className="flex justify-between items-center bottom-5 mt-4">
              <div>
                <p className="text-sm font-medium text-gray-500">
                  {project.duration}
                </p>
                <div className="mt-2 text-gray-900 cursor-pointer underline rounded-md h-6 text-sm font-medium">
                  support
                </div>
              </div>
              <button className="bg-white p-2 rounded-md hover:bg-gray-200 transition">
                <ArrowRight className="text-gray-800 w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpcomingProjects;