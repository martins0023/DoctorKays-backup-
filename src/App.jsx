import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import FAQs from "./pages/FAQs";
import Blog from "./pages/Blog";
import BlogDetail from "./pages/BlogDetail";
import NotFound from "./components/NotFound";
import Contact from "./pages/Contact";
import Consultation from "./pages/Consultation";
import Projects from "./pages/Projects";
import Shop from "./pages/Shop";
import Gallery from "./pages/Gallery";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/faqs" element={<FAQs />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:id" element={<BlogDetail />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/consultation" element={<Consultation />} />
        {/* <Route path="/shop" element={<Shop />} /> */}
        <Route path="/gallery" element={<Gallery />} />
        {/* 
        <Route path="/dr-ai" element={<DrAi />} />
        <Route path="/services" element={<Services />} />

        {/* Catch-all route for 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
