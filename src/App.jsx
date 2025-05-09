import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import FAQs from "./pages/FAQs";
import Blog from "./pages/Blog";
import BlogDetail from "./pages/BlogDetail";
import NotFound from "./components/NotFound";
import ProductDetails from "./components/Ecommerce/ProductDetails";
import Contact from "./pages/Contact";
import Consultation from "./pages/Consultation";
import Projects from "./pages/Projects";
import Shop from "./pages/Shop";
import Gallery from "./pages/Gallery";
import AllPosts from "./pages/AllPosts";
import NearestPharmacy from "./pages/NearestPharmacy";
import Policy from "./pages/Policy";
import Partnership from "./pages/Partnership";
import Community from "./pages/Community";
import Volunteer from "./pages/Volunteer";
import QuestionDetail from "./pages/QuestionDetail";
// import NewConsultation from "./pages/NewConsultation";
// import ScanReport from "./components/Consultation/ScanReport";
// import PhotoPage from "./components/Consultation/PhotoPage";
// import UploadPage from "./components/Consultation/UploadPage";
// import AIAnalysis from "./components/Consultation/AIAnalysis";
// import Subscribe from "./components/Consultation/Booking/Subscribe";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/faqs" element={<FAQs />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:id" element={<BlogDetail />} />
        <Route path="/community/:id" element={<QuestionDetail />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/consultation" element={<Consultation />} />
        <Route path="/nearestpharmacy" element={<NearestPharmacy />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/policy" element={<Policy />} />
        <Route path="/partnership" element={<Partnership />} />
        <Route path="/volunteer" element={<Volunteer />} />
        <Route path="/all-posts" element={<AllPosts />} />
        <Route path="/community" element={<Community />} />

        {/* <Route path="/ScanReport" element={<ScanReport />} /> */}
        {/* <Route path="/upgrade-consultation" element={<NewConsultation />} />
        <Route path="/ai-analysis/:id" element={<AIAnalysis />} />
        <Route path="/subscribe" element={<Subscribe />} />
        
        <Route path="/consultation" element={<ScanReport />} />
        <Route path="/consultation/upload" element={<UploadPage />} />
        <Route path="/consultation/photo" element={<PhotoPage />} /> */}
        {/* 
        
        <Route path="/services" element={<Services />} />

        {/* Catch-all route for 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
