import { ArrowRight, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import { slideInFromRight, staggerContainer, textVariants } from "../constants/animations";
import { checklistItems } from "../constants";
import { calendarmockup, east, mockup1, mockup2, mockup3 } from "../assets";
import Button from "./Button";
import { useNavigate } from "react-router-dom";

const Booking = () => {
  const navigate = useNavigate();
  const handleBooking = () => {
    navigate("/consultation");
  };
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={staggerContainer}
      className="mt-20"
    >
      <motion.h2
        initial="hidden"
        animate="visible"
        variants={textVariants}
        className="text-3xl sm:text-5xl lg:text-6xl text-center my-8 tracking-wide"
      >
        Appointment Booking
      </motion.h2>

      <div className="flex flex-wrap justify-center">
        <div className=" w-full lg:w-1/2">
          <div className="flex mb-12">
            <div className="md:pt-5">
              <p className="text-md tracking-wider leading-relaxed gap-auto text-neutral-400">
                Booking with Doctor Kays is easy and convenient. You can book an
                appointment through the booking section of their website by
                selecting any service. You can either have a virtual
                consultation for convenience or meet him in person if you want
                it more personal; both options are available. 
                
                The platform
                offers an easy-to-use interface that ensures a smooth booking
                process. You can see available time slots and book an
                appointment immediately after selecting the service you want.
                Doctor Kays's online booking system puts accessibility and
                efficiency at the core for all users.
              </p>

              <div className="flex justify-center">
                <Button
                  img={<ArrowRight />}
                  onClick={handleBooking}
                  text="Book an Appointment"
                  className="mt-5 hover:bg-white  rounded-full px-6 py-3 bg-gradient-to-r from-purple-500 text-white to-purple-950"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="p-2 w-full lg:w-1/2 h-fit">
          <motion.img
            variants={slideInFromRight}
            src={mockup1}
            alt="calendar-mockup"
            className="rounded-xl"
          />
        </div>
      </div>
    </motion.div>
  );
};

export default Booking;
