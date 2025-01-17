import { CircleUser } from "lucide-react";
import { testimonials } from "../constants";

const Testimonials = () => {
  return (
    <div className="mt-20 tracking-wide">
      <h2 className="text-3xl sm:text-5xl lg:text-6xl text-center my-10 lg:my-20">
        What People are saying.
      </h2>
      <div className="flex flex-wrap justify-center">
        {testimonials.map((testimonial, index) => (
          <div key={index} className="w-full sm:w-1/2 lg:w-1/3 px-4 py-2 transform transition-transform duration-300 hover:scale-105">
            <div className="bg-white rounded-xl p-6 text-gray-900 shadow-lg font-thin">
              <p className="text-black">{testimonial.text}</p>
              <div className="flex mt-8 items-start">
                {/* <img
                  className="w-12 h-12 mr-6 rounded-full border border-neutral-300"
                  src={testimonial.image}
                  alt=""
                /> */}
                <CircleUser className="w-10 h-10 mr-6 rounded-full" />
                <div>
                  <h6 className="text-black">{testimonial.user}</h6>
                  <span className="text-sm font-normal italic text-neutral-600">
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
