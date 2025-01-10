import React from "react";
import { Store, DollarSign, Users, Medal, LucideHeartPulse } from "lucide-react"; // Import icons from lucide-react

const milestones = [
  {
    itemNo: "1",
    title: "Accessible Healthcare",
    description:
      "Dr. Kays has achieved these milestones in ensuring healthcare is accessible and interactive. This ranges from introducing the segment Medicine on the Street, which has been providing live health insights from diverse settings, to launching an extended online presence where health tips, lifestyle guidance, and disease prevention strategies are available to inform individual choice.",
    icon: <LucideHeartPulse size={24} className="text-purple-800" />,
  },
  {
    itemNo: "2",
    title: "Content Alignment with WHO",
    description:
      "Alignment with the World Health Organization's calendar ensures relevance through timely campaigns and global health discussions. Looking forward, Doctor Kays will develop detailed digital content such as video series, expert interviews, and webinars while expanding his outreach within the community by consulting with local health professionals.",
    icon: <Medal size={24} className="text-purple-800" />,
  },
  {
    itemNo: "3",
    title: "Consultations and Appointments",
    description:
      "Doctor Kays provides personal health consultations specific to a patient's particular need. A safe, confidential environment is given to discuss specific issues and obtain expert advice on how to manage one's health.",
    icon: <Users size={24} className="text-purple-800" />,
  },
];

const Milestones = () => {
  return (
    <section className="max-w-4xl mx-auto px-4 py-8">
      <div className="text-center">
        <h2 className="text-3xl sm:text-5xl lg:text-6xl mt-10 lg:mt-10 tracking-wide">
          Milestones & {" "}
          <span className="bg-gradient-to-r from-purple-500 to-purple-800 text-transparent bg-clip-text">
            Events
          </span>
        </h2>
      </div>
      <div className="relative mt-10">
        {/* Timeline Line */}

        {/* Milestones */}
        <div className="flex flex-col md:flex-row md:items-start gap-8">
          {milestones.map((milestone, index) => (
            <div
              key={index}
              className="rounded-2xl hover:bg-slate-900 border p-4 relative flex flex-col items-center md:w-1/3 text-center"
            >
              {/* itemNo */}
              {/* <div className="bg-purple-800 text-white py-1 px-3 rounded-full mb-4 items-center w-15 h-15 border ">
                {milestone.itemNo}
              </div> */}

              {/* Icon */}
              <div className="mb-4">{milestone.icon}</div>

              {/* Title */}
              <h3 className="font-semibold text-lg mb-2">{milestone.title}</h3>

              {/* Description */}
              <p className="text-gray-300 text-sm leading-normal">
                {milestone.description}
              </p>

              {/* Connector (hidden on last milestone) */}
              {index < milestones.length - 3 && (
                <div className="absolute md:hidden h-10 w-0.5 bg-purple-500 mt-4"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Milestones;
