import React, { Suspense, useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Navbar from "../Navbar";
import EnquiryModal from "./EnguiryModal";
import {
  BaggageClaim,
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
import RichPortableText from "../PortableComponents/portableTextComponents";
import { client } from "../../../lib/client";

const ProductDetails = () => {
  const { id } = useParams(); // product ID from URL
  const location = useLocation();

  const navigate = useNavigate();

  // In-app passed product (optional)
  const passed = location.state?.product;

  const [isFormOpen, setFormOpen] = useState(false);
  const [isSuccessOpen, setSuccessOpen] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  // const [isModalOpen, setIsModalOpen] = useState(false);
  const [enquiry, setEnquiry] = useState(""); //question
  const [product, setProduct] = useState(passed || null);
  const [loading, setLoading] = useState(!passed);
  const [error, setError] = useState("");
  const [index, setIndex] = useState(0);
  const [mainImage, setMainImage] = useState("");
  const [thumbIndex, setThumbIndex] = useState(0);

  // If we didn't get the product in location.state, fetch from Sanity:
  useEffect(() => {
    if (product || !id) return;

    setLoading(true);
    const query = `*[_type == "shop" && _id == $id][0]{
      _id,
      title,
      icon[]{ asset-> { url } },
      price,
      reviews,
      rating,
      description,
    }`;

    client
      .fetch(query, { id })
      .then((res) => {
        if (!res) {
          setError("Product not found.");
        } else {
          setProduct(res);
        }
      })
      .catch((err) => {
        console.error(err);
        setError("Error loading product.");
      })
      .finally(() => setLoading(false));
  }, [id, product]);

  // Once we have product, set main image
  useEffect(() => {
    if (product) {
      const urls = (product.icon || []).map((i) => i.asset.url);
      setMainImage(urls[0] || product.imageUrl);
    }
  }, [product]);

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
      console.error("Oops, something went wrong.", error);
    }
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-purple-500"></div>
      </div>
    );
  if (error || !product)
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600">
        {error || "Product not found."}
      </div>
    );

  // “Back” nav
  const goBack = () => navigate(-1);

  const images = (product.icon || []).map((i) => i.asset.url);
  // Flatten Portable Text into a plain string for snippet
  const rawText = Array.isArray(product.description)
    ? product.description
        .map((block) =>
          (block.children || []).map((child) => child.text).join("")
        )
        .join(" ")
    : "";
  const descriptionSnippet =
    rawText.length > 160 ? rawText.slice(0, 160) + "…" : rawText;

  const closeModal = () => {
    setSuccessOpen(false);
  };

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

  return (
    <div>
      {/* SEO & Social Previews */}
      <Helmet>
        <title>{product.title}</title>
        <meta name="description" content={descriptionSnippet} />

        <meta property="og:type" content="product" />
        <meta property="og:title" content={product.title} />
        <meta property="og:description" content={descriptionSnippet} />
        <meta property="og:image" content={mainImage} />
        <meta
          property="og:url"
          content={`${window.location.origin}/product/${product._id}`}
        />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={product.title} />
        <meta name="twitter:description" content={descriptionSnippet} />
        <meta name="twitter:image" content={mainImage} />
      </Helmet>
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <button
          onClick={goBack}
          className="flex items-center text-gray-500 bg-inherit rounded-md text-xs p-3 mb-4"
        >
          <ChevronLeft className="w-5 h-5" />
          <span className="ml-2">Back to products</span>
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
          <div>
            <div className="relative group">
              <img
                src={mainImage}
                alt={product.title}
                className="w-full h- rounded-lg transition-transform duration-300 group-hover:scale-100"
              />
            </div>
            <div className="flex gap-2 mt-4">
              {images.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt={`${product.title} thumb ${i + 1}`}
                  className={`w-20 h-20 rounded-md object-cover cursor-pointer ${
                    i === thumbIndex ? "ring-2 ring-purple-600" : ""
                  }`}
                  onMouseEnter={() => {
                    setMainImage(img);
                    setThumbIndex(i);
                  }}
                />
              ))}
            </div>
          </div>

          <div>
            <h1 className="text-3xl font-bold">{product.title}</h1>
            <h2 className="text-lg font-semibold mt-3">Product Description</h2>
            <RichPortableText value={product.description} />

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
