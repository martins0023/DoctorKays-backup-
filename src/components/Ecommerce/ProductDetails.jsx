import React, { Suspense, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { staggerContainer } from "../../constants/animations";
import { motion } from "framer-motion";
import Navbar from "../Navbar";
import EnquiryModal from "./EnguiryModal";
import {
  BaggageClaim,
  BatteryMedium,
  ChevronLeft,
  MessageCircleQuestionIcon,
  ShoppingBag,
  ShoppingCart,
  Star,
  Store,
  TruckIcon,
} from "lucide-react";
import Button from "../Button";
import Footer from "../Footer";
import axios from "axios";
import Modal from "../Modal";

const ProductDetails = () => {
  const location = useLocation();

  const [isFormOpen, setFormOpen] = useState(false);
  const [isSuccessOpen, setSuccessOpen] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  // const [isModalOpen, setIsModalOpen] = useState(false);
  const [enquiry, setEnquiry] = useState(""); //question
  const product = location.state?.product;
  const [index, setIndex] = useState(0);

  const images = product?.icon?.map((img) => img.asset?.url) || [];
  const [mainImage, setMainImage] = useState(images[0] || product?.imageUrl);

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < rating ? "text-yellow-400" : "text-gray-300"
        }`}
      />
    ));
  };

  const navigate = useNavigate();

  const handleQuestionSubmit = async (formData) => {
    try {
      const res = await axios.post(
        "https://doctorkays-backend-1.onrender.com/api/enquiry/post" ??
          "http://localhost:5000/api/enquiry/post",
        formData
      );
      // Prepend new question to the list
      setEnquiry((prev) => [res.data, ...prev]);
      setIsModalOpen(false);
      // alert("message delivered")
      setModalMessage(
        "Thank you for your message. We've received your enquiry."
      );
      setSuccessOpen(true);
      // setIsModalOpen(true);
    } catch (error) {
      console.error("Error submitting question:", error);
    }
  };

  const handleBack = () => {
    navigate(-1);
    // window.scrollTo(0, 0);
  };

  const closeModal = () => {
    setSuccessOpen(false);
  };

  if (!product) return <p>Product not found!</p>;

  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-8 p-4">
        <nav className="text-sm  mb-4 flex flex-row items-center">
          {/* <div onClick={handleBack} className="flex items-center flex-row text-base font-medium cursor-pointer "><ChevronLeft className="w-6 h-6"/> back {' '} </div>  */}
          {/* <span className="font-medium">{"  "} {product.title}</span> */}
        </nav>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
          <div>
            <div className="relative group">
              <img
                src={mainImage}
                alt={product.title}
                className="w-full h- rounded-lg transition-transform duration-300 group-hover:scale-110"
              />
            </div>
            <div className="flex gap-2 mt-4">
              {images.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt={`Thumbnail ${i + 1}`}
                  className={
                    i === index
                      ? "w-20 h-20 rounded-md cursor-pointer border-2 border-black"
                      : "w-20 h-20 rounded-md cursor-pointer border border-gray-300"
                  }
                  onMouseEnter={() => {
                    setMainImage(img);
                    setIndex(i);
                  }}
                />
              ))}
            </div>
          </div>

          <div>
            <h1 className="text-3xl font-bold">{product.title}</h1>
            <h2 className="text-lg font-semibold mt-3">Product Description</h2>
            <p className="text-gray-600 mt-1">{product.descriptionText}</p>

            <div className="flex items-center gap-1 mt-2">
              {renderStars(product.rating)}
              <span className="text-sm text-gray-600">
                ({product.reviews} reviews)
              </span>
            </div>
            <div className="flex items-center gap-2 mt-3">
              <p className="text-2xl font-semibold">${product.price}</p>
            </div>

            <div className="flex items-center gap-4 mt-4">
              <Button
                className="bg-black text-white px-6 py-2 rounded-lg border"
                text="Buy Now"
                img={<ShoppingBag className="w-5 h-5" />}
              />
              <Button
                className="border px-6 py-2 rounded-lg"
                text="Add to Cart"
                img={<ShoppingCart className="w-5 h-5" />}
              />
            </div>

            <div className="mt-6">
              <h2 className="text-lg font-semibold">Delivery Options</h2>
              <ul className="text-sm text-gray-600 mt-2 flex gap-1 flex-col ">
                <li className="flex gap-2">
                  <Store className="w-4 h-4" /> 100% Original Products
                </li>
                <li className="flex gap-2">
                  <TruckIcon className="w-4 h-4" /> Pay on delivery might be
                  available
                </li>
                <li className="flex gap-2">
                  <BaggageClaim className="w-4 h-4" /> Easy 30 days returns
                </li>
              </ul>
            </div>

            <div className="mt-6" onClick={() => setIsModalOpen(true)}>
              <label className="text-lg font-semibold ">
                Ask a question about this product
              </label>
              <Button
                className="bg-black text-white border px-6 py-2 rounded-lg mt-2"
                text="Make Enquiries"
                img={<MessageCircleQuestionIcon className="w-5 h-5" />}
              />
            </div>

            <div className="mt-6">
              <form>
                <div className="mb-4">
                  <label className="text-lg font-semibold ">
                    Enter coupon code
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    placeholder="AXKO90LP34"
                    value=""
                    onChange=""
                    className="w-full p-3 mt-2 h-[40px] rounded-lg border-gray-300 border focus:outline-none focus:border-primary"
                    required
                  />
                </div>
              </form>
            </div>

            {/* <div className="mt-6">
              <h2 className="text-lg font-semibold">Product Description</h2>
              <ul className="text-sm text-gray-600 mt-2">
                <li>• Ultra-Portable Soft Toy</li>
                <li>• Perfect Companion For Your Child</li>
                <li>• Develop Your Child's Sense Of Touch</li>
              </ul>
            </div> */}
          </div>
        </div>
        <Footer />
      </div>
      {/* Ask Question Modal */}
      {isModalOpen && (
        <Suspense
          fallback={
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <div className="loader">Loading…</div>
            </div>
          }
        >
          <EnquiryModal
            onClose={() => setIsModalOpen(false)}
            onSubmit={handleQuestionSubmit}
          />
        </Suspense>
      )}

      <Modal
        isOpen={isSuccessOpen}
        onClose={closeModal}
        message={modalMessage}
      />
    </div>
  );
};

export default ProductDetails;
