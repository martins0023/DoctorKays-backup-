import React from "react";
import Navbar from "../components/Navbar";
import Testimonials from "../components/Testimonials";
import Stayintouch from "../components/Stayintouch";
import Footer from "../components/Footer";
import { faqsCard } from "../constants";

const FAQs = () => {
  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto md:pt-20 px-6">
        <div className="relative mt-20 border-neutral-800 min-h-[800px]">
          <div className="text-center">
            <span className="bg-neutral-900 text-purple-500 rounded-full h-6 text-sm font-medium px-2 py-1 uppercase">
              FAQs
            </span>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl mt-10 lg:mt-20 tracking-wide">
              See Frequently{" "}
              <span className="bg-gradient-to-r from-purple-500 to-purple-800 text-transparent bg-clip-text">
                Asked Questions
              </span>
            </h2>
          </div>
          <div className="flex flex-wrap mt-10 lg:mt-20">
            {faqsCard.map((card, index) => (
              <div key={index} className="flex flex-col mt-5 mb-5">
                <div className="bg-gradient-to-r from-purple-800 to-purple-950 flex items-center justify-center justify-items-center w-[56px] h-[36px] rounded-md">
                  <p className="text-white font-semibold text-[20px]">
                    {card.id}
                  </p>
                </div>

                <div className="flex flex-col mt-3">
                  <p className=" text-2xl">
                    {card.question}
                  </p>
                  <p className="text-neutral-300 tracking-wide text-[16px]">
                    {card.answer}
                  </p>

                  <hr className="border-neutral-800 w-full h-[1px] mt-3" />
                </div>
              </div>
            ))}
          </div>
        </div>
        <Testimonials />
        <Stayintouch />
        <Footer />
      </div>
      <footer className="bg-primary text-white p-4 text-center">
        <div>© 2025 Drkays</div>
      </footer>
    </div>
  );
};

export default FAQs;
