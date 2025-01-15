import { CheckCircle2 } from "lucide-react";
import { pricingOptions } from "../constants";
import { motion } from "framer-motion";
import { staggerContainer, textVariants } from "../constants/animations";
import { checklistItems } from "../constants";
import { calendarmockup } from "../assets";

const Booking = () => {
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
        <div className="p-2 w-full lg:w-1/2 h-fit">
          <img src={calendarmockup} alt="Appointment Booking" className="mt-5" />
        </div>
        <div className="pt-12 w-full lg:w-1/2">
          
            <div key={index} className="flex mb-12">
              {/* <div className="text-purple-400 mx-6 bg-neutral-900 h-10 w-10 p-2 justify-center items-center rounded-full">
                <CheckCircle2 />
              </div> */}
              <div>
                <p className="text-md text-neutral-500">Booking with Doctor Kays is easy and convenient. You can book an appointment through the booking section of their website by selecting any service. You can either have a virtual consultation for convenience or meet him in person if you want it more personal; both options are available. The platform offers an easy-to-use interface that ensures a smooth booking process. You can see available time slots and book an appointment immediately after selecting the service you want. Doctor Kays's online booking system puts accessibility and efficiency at the core for all users.</p>
              </div>
            </div>
          
        </div>
      </div>
    </motion.div>
  )
}

export default Booking