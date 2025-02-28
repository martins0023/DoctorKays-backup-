import { CircleUser, Quote } from "lucide-react";
import { testimonials } from "../constants";

const Testimonials = () => {
  return (
    <div className="mt-20 tracking-wide">
      <h2 className="text-3xl sm:text-5xl lg:text-6xl text-center my-10 lg:my-20">
        What People are saying.
      </h2>
      <div className="flex flex-wrap justify-center">
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className="w-full sm:w-1/2 lg:w-1/3 px-4 py-2 transform transition-transform duration-300 hover:scale-105"
          >
            <div className="relative bg-gradient-to-r from-purple-500 to-indigo-500 bg-opacity-90 rounded-xl p-6 shadow-lg overflow-hidden">
              {/* Enlarged, faint background quote icon with pulse animation */}
              <Quote className="absolute top-0 left-0 w-32 h-32 text-white opacity-20 -translate-x-10 -translate-y-10 animate-pulse" />
              <p className="relative text-white z-10">{testimonial.text}</p>
              <div className="relative flex mt-8 items-start z-10">
                <CircleUser className="text-white w-10 h-10 mr-6 rounded-full" />
                <div>
                  <h6 className="text-white">{testimonial.user}</h6>
                  <span className="text-sm font-normal italic text-white">
                    {testimonial.company}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
