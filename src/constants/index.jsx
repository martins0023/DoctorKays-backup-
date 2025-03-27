import { ActivityIcon, BotMessageSquare, Briefcase, HeartPulse, Locate, LocateFixedIcon, MessageCircleQuestion, Notebook, NotebookPen, Pill, Podcast, Ribbon, ShieldPlus, ShoppingCart, Syringe, TableIcon, Waypoints } from "lucide-react";


import user1 from "../assets/profile-pictures/user1.jpg";
import user2 from "../assets/profile-pictures/user2.jpg";
import user3 from "../assets/profile-pictures/user3.jpg";
import user4 from "../assets/profile-pictures/user4.jpg";
import user5 from "../assets/profile-pictures/user5.jpg";
import user6 from "../assets/profile-pictures/user6.jpg";
import SatisfiedClients from "../components/SatisfiedClients";
import { clinic1, clinic3, clinicseries1, clinicseries2, clinicseries3, clinicseries4, doc1 } from "../assets";

export const navItems = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Shop", href: "/shop" },
  { label: "Contact", href: "/contact" },
  { label: "FAQs", href: "/faqs" },
];

export const clinicSeries = [
  {
    id: 1,
    category: "HPV",
    title: "Foul Smells During Sex",
    description:
      "Do you know there's an enemy known as HPV that causes cancer of the throat, cervix, anus and penis? People don't really know about this. You need to watch this video.",
    author: "Doctor Kays",
    readTime: "2min",
    date: "1st of January, 2024",
    videoId: "p2eG7OM_0_Y",
    imageUrl: clinicseries3, // Replace with actual image paths
  },
  {
    id: 2,
    category: "Human Papilloma Virus",
    title: "How is HPV Transmitted",
    description:
    "Last week, we talked about the mysterious enemy called Human Papolloma Virus. A virus that causes cancer of the cervix, penis, throat and anus.",
    author: "Doctor Kays",
    readTime: "3min",
    date: "2nd of January, 2024",
    videoId: "p2eG7OM_0_Y",
    imageUrl: clinicseries4, // Replace with actual image paths
  },
  {
    id: 3,
    category: "HPV",
    title: "The Mysterious Enemy - HPV",
    description:
    "It will be impossible for me to talk about cervical cancer without raising awareness about the mysterious enemy - Human Papilloma Virus",
    author: "Doctor Kays",
    readTime: "1min",
    date: "3rd of January, 2024",
    videoId: "p2eG7OM_0_Y",
    imageUrl: clinicseries1, // Replace with actual image paths
  },
];

export const mosSeries = [
  {
    id: 1,
    category: "Cervical Cancer",
    title: "Dsiccovering Cervical Cancer",
    description:
      "if you notice anyone with cervical cancer, would you allow the person to be treated in Nigeria? Listen to what Nigerians are saying on Medicine on the street with Dr Kays",
    author: "Doctor Kays",
    readTime: "1min watch",
    date: "1st of January, 2024",
    videoId: "p2eG7OM_0_Y",
    imageUrl: clinicseries3, // Replace with actual image paths
  },
  {
    id: 2,
    category: "HIV",
    title: "How is HIV Transmitted",
    description:
    "Do you know that you can be HIV positive and still build a family? Testing, Regular Clinic visits and Drug compliance are all you NEED!",
    author: "Doctor Kays",
    readTime: "3min watch",
    date: "2nd of January, 2024",
    videoId: "p2eG7OM_0_Y",
    imageUrl: clinicseries2, // Replace with actual image paths
  },
  {
    id: 3,
    category: "Cervical Cancer",
    title: "Nigeria Healthcare and Cervical Cancer",
    description:
    "Do you believe in the Nigeria Healthcare system? Listen to what the street has to say on Medicine on the street with Doctor Kays concerning cervical cancer.",
    author: "Doctor Kays",
    readTime: "1min watch",
    date: "3rd of January, 2024",
    videoId: "p2eG7OM_0_Y",
    imageUrl: clinicseries1, // Replace with actual image paths
  },
];

export const Blogposts = [
  {
    id: 1,
    category: "postrate cancer",
    title: "Dealing with Postrate Cancer",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt",
    author: "Doctor Kays",
    readTime: "5min read",
    date: "1st of January, 2024",
    imageUrl: clinic1, // Replace with actual image paths
  },
  {
    id: 2,
    category: "Diarrhea",
    title: "How to deal with Diarrhea",
    description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt",
    author: "Doctor Kays",
    readTime: "5min read",
    date: "2nd of January, 2024",
    imageUrl: clinic3, // Replace with actual image paths
  },
  {
    id: 3,
    category: "Liver Cancer",
    title: "Surviving Liver Cancer",
    description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt",
    author: "Doctor Kays",
    readTime: "5min read",
    date: "3rd of January, 2024",
    imageUrl: doc1, // Replace with actual image paths
  },
];

export const testimonials = [
  {
    user: "MLS Abimbola",
    company: "United Kingdom",
    image: user1,
    text: "Service is very satisfying.",
  },
  {
    user: "Philadolar",
    company: "Nigeria",
    image: user2,
    text: "Your product or content has been really educative and also fun to watch. Keep it up",
  },
  {
    user: "Oluitan Olumide",
    company: "Nigeria",
    image: user3,
    text: "Doctor kays has been an amazing Doctor since I got to know him.",
  },
  {
    user: "Jeremiah Robert",
    company: "Nigeria",
    image: user4,
    text: "Dr Kays is now a household name in social media space. The people on my space are loving it, to the extent of asking: this Doctor kay's you are always posting is doing very good with the health education. Those tips and reminders are very helpul.",
  },
  {
    user: "Commy-Constance Oko",
    company: "Nigeria",
    image: user5,
    text: "I have learnt so much about personal health and got to know a lot on health matters generally. Thank you so much Dr. Kays for always giving prompt response to my questions.",
  },
  {
    user: "Ezekiel",
    company: "London",
    image: user6,
    text: "Great team and the app is easy to use.",
  },
];

export const features = [
  {
    icon: <Pill />,
    text: "Medicine on the Street (MOS)",
    description:
      "Learn how street medicine is transforming lives and bringing heathcare awareness to communities.",
    url: "https://www.youtube.com/@Doctorkays"
  },
  {
    icon: <LocateFixedIcon />,
    text: "Pharmacies near me",
    description:
      "Doctor Kays website makes it effortless to locate nearest pharmacies, clinics, and laboratories closest to you. Instantly find verified health facilities near you.",
    url: "/nearestpharmacy"
  },
  {
    icon: <Syringe />,
    text: "Clinic Series",
    description:
      "Get valuable health tips and advice from our clinic series. Watch our clinic series videos to stay informed about various health topics and preventive care.",
    url: "https://www.youtube.com/@Doctorkays"
  },
  {
    icon: <ShoppingCart />,
    text: "Merch and Shops",
    description:
      "Explore our exclusive range of health products in Doctor Kays shop. From supplements to wellness kits, find everything you need to support your health journey.",
    url: "/shop"
  },
  {
    icon: <ActivityIcon />,
    text: "Health Nuggets",
    description:
      "Get your weekly dose of health tips with our Health Nuggets series. Simple, actionable advice to help you lead a healthier lifestyle.",
    url: "https://www.instagram.com/doctor_kays"
  },
  {
    icon: <NotebookPen />,
    text: "Book an Appointment",
    description:
      "Ready to take charge of your health? Book an appointment with Doctor Kays today and get personalized care you deserve.",
    url: "/consultation"
  },
];

export const mission = [
  {
    icon: <TableIcon />,
    text: "Mission Statement",
    description:
      "To turn medicine from a head- scratcher into your friendly companion.",
  },
  {
    icon: <Notebook />,
    text: "Core Value",
    description:
      "Excellence, Professionalism, Integrity, Compassion, and Trust.",
  },
  {
    icon: <Waypoints />,
    text: "Connect Users With Healthcare Services",
    description:
      "Creating a system to connect users with pharmacies, specialists, and laboratory based on reviews and refferals.",
  },
  {
    icon: <Podcast />,
    text: "Expert Talks: Health Tips and From Professionals",
    description:
      "Ensure clients are satisfied with the services provided by leaders and experts in the industry with medical content.",
  },
];

export const faqsCard = [
  {
    id: 1,
    question: "Who is Doctor Kays?",
    answer:
      "Doctor Kays, whose full name is Doctor Olayiwola Babatunde Emmanuel, is a medical professional with a strong commitment to preventive health care and community wellness. He shares his knowledge to empower people to make informed health choices that translate into healthier, fulfilling lives.",
  },
  {
    id: 2,
    question: "What is the mission of Doctor Kays?",
    answer:
      "Doctor Kays is on a quest to make health care more approachable and understandable for everybody. He turns complex medical explanations into interesting stories with a pinch of humor. Doctor Kays ensures that health education is not only informative but also enjoyable.",
  },
  {
    id: 3,
    question: "What services are offered?",
    answer:
      "Doctor Kays provides a wide range of services aimed at increasing health awareness. These include Health Nuggets, which are weekly small tips for wellness; Clinic Series, which is an in-depth exploration of certain health topics; Medicine on the Street, which is an interactive street segment to answer real-life health questions; and personal consultations that offer individualized health advice and counseling.",
  },
  {
    id: 4,
    question: "How is the content presented?",
    answer:
      "Content is provided on YouTube, blogs, podcasts, and social media through creative storytelling, humor, and interactivity. It simplifies complex health topics into ones that are relatable, engaging, and easy to understand. The visuals, creative narration, and interactive formats ensure that audiences can apply the information in their daily lives while being entertained. Through diverse platforms, Doctor Kays effectively reaches a wide audience, creating a very interactive community for health awareness and wellness.",
  },
  {
    id: 5,
    question: "How do I make an appointment?",
    answer:
      "To book an appointment with Doctor Kays, consider visiting the booking section on the website. Full guidelines are provided therein to help you make the appointment regarding your needs and what you would want covered.",
  },
  {
    id: 6,
    question: "What topics are covered?",
    answer:
      "Doctor Kays covers general health, disease prevention, lifestyle changes, and wellness, among many other health-related topics. His content covers areas related to day-to-day living health and other particular medical topics.",
  },
  {
    id: 7,
    question: "How is Doctor Kays unique?",
    answer:
      "What sets Doctor Kays apart is his ability to combine professional medical expertise with humor and storytelling. Such an approach makes learning about health more engaging and helps them remember and apply key health concepts in their daily lives.",
  },
];

export const checklistItems = [
  {
    title: "Licensed Professional Doctor",
    description:
      "At Doctor Kays, your health is in expert hands. Our licensed professional doctor provide top-quality medical care tailored to your needs.",
  },
  {
    title: "We Operate Across the Globe",
    description:
      "No matter where you are, Doctor Kay's services are available.",
  },
  {
    title: "CAC Registered",
    description:
      "Doctor Kays is proud to be a CAC registered entity, ensuring our operations meet the highest legal and professional standards.",
  },
  {
    title: "Clients are Satisfied with our service",
    description:
      <SatisfiedClients />,
  },
];

export const checkaboutlists = [
  {
    icon: <Ribbon />,
    title: "Medicine on the street",
    description:
      "Follow closely as doctor kays takes you to the streets of Nigeria.",
  },
  {
    icon: <HeartPulse />,
    title: "Clinic Series",
    description:
      "Doctor kays powerful vision: To keep everyone updated on self-preventive medical measures.",
  },
  {
    icon: <ShieldPlus />,
    title: "Health Nuggets",
    description:
      "Astonishing quotes and designs that engages people on how to get along with their health.",
  },
  {
    icon: <NotebookPen />,
    title: "Appointment Booking",
    description:
      "Book an appointment with Doctor kays concerning any medical related issues you are facing.",
  },
];
export const pricingOptions = [
  {
    title: "Blood Tests and Scan Report",
    originalPrice: "$4",
    price: "$0",
    type: "once",
    features: [
      "Join the Community",
      "Newsletter Subscription",
      "Weekly Health Nugget",
      "Laboratory Interpretation",
      "Free Referral suggestions to nearest pharmacies and diagnostic centers",
    ],
    link: "https://calendly.com/martinsmiracle45/one_time_appointment",
  },
  {
    title: "Silver Package",
    originalPrice: "$9",
    price: "$0",
    type: "10 minutes",
    features: [
      "Consultation is scheduled only on available dates",
      "Join the Community",
      "Newsletter Subscription",
      "Weekly Health Nugget",
      "Consultation Chat, Audio and Video Calls",
      "Free Referral suggestions to nearest pharmacies and diagnostic centers",
      
    ],
    link: "https://calendly.com/martinsmiracle45/one_time_appointment",
  },
  {
    title: "Gold Package",
    originalPrice: "$19",
    price: "$9.5",
    type: "10 minutes",
    features: [
      "Swift consultation within 24hrs",
      "Join the Community",
      "Newsletter Subscription",
      "Weekly Health Nugget",
      "Consultation Chat and Calls",
      "Free Referral suggestions to nearest pharmacies and diagnostic centers",
      
    ],
    link: "https://calendly.com/martinsmiracle45/one_time_appointment",
  },
  
];

export const resourcesLinks = [
  { href: "/blog", text: "Blog" },
  { href: "/faqs", text: "FAQs" },
  { href: "https://www.youtube.com/@Doctorkays", text: "MOS" },
  { href: "https://www.youtube.com/@Doctorkays", text: "Clinic Series" },
  { href: "/community", text: "Community Forums" },
];

export const platformLinks = [
  { href: "/consultation", text: "Consultation" },
  { href: "/shops", text: "Shops and Merch" },
  // { href: "#", text: "Clinic Online (coming soon)" },
];

export const communityLinks = [
  { href: "/about", text: "About us" },
  { href: "/contact", text: "Contact Us" },
  { href: "/partnership", text: "Become a Sponsor/Collaborate" },
  { href: "/projects", text: "Projects" },
  { href: "/volunteer", text: "Become a volunteer" },
];
