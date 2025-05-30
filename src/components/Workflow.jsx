import { CheckCircle2 } from "lucide-react";
import { checklistItems } from "../constants";
import { doctor010, doctor018, mos } from "../assets";

const Workflow = () => {
  return (
    <div className="mt-20">
      <h2 className="text-3xl sm:text-5xl lg:text-6xl text-center mt-6 tracking-wide">
        Why Should You{" "}
        <span className="bg-gradient-to-r from-purple-500 to-purple-800 text-transparent bg-clip-text">
          Trust Us?
        </span>
      </h2>

      <div className="flex flex-wrap justify-center items-center">
        <div className="p-2 w-full lg:w-1/2 h-fit">
          <img src={doctor018} alt="Medicine on the street" className="mt-5 rounded-lg" />
        </div>
        <div className="pt-12 w-full lg:w-1/2">
          {checklistItems.map((item, index) => (
            <div key={index} className="flex mb-12">
              <div className="text-purple-400 mx-6 bg-neutral-900 h-10 w-10 p-2 justify-center items-center rounded-full">
                <CheckCircle2 />
              </div>
              <div>
                <h5 className="mt-1 mb-2 text-xl">{item.title}</h5>
                <p className="text-md text-neutral-500">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Workflow;
