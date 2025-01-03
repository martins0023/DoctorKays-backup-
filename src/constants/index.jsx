import { ActivityIcon, BotMessageSquare, Briefcase, HeartPulse, MessageCircleQuestion, Notebook, NotebookPen, Pill, Podcast, Ribbon, ShieldPlus, ShoppingCart, Syringe, TableIcon, Waypoints } from "lucide-react";


import user1 from "../assets/profile-pictures/user1.jpg";
import user2 from "../assets/profile-pictures/user2.jpg";
import user3 from "../assets/profile-pictures/user3.jpg";
import user4 from "../assets/profile-pictures/user4.jpg";
import user5 from "../assets/profile-pictures/user5.jpg";
import user6 from "../assets/profile-pictures/user6.jpg";
import SatisfiedClients from "../components/SatisfiedClients";
import { clinic1, clinic3, clinicseries1, clinicseries2, clinicseries3, doc1 } from "../assets";

export const navItems = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Doctor Kay's AI", href: "/doctorkaysai" },
  { label: "Contact", href: "/contact" },
  { label: "FAQs", href: "/faqs" },
];

export const clinicSeries = [
  {
    id: 1,
    category: "HIV STATUS",
    title: "Get Tested and Know Your HIV Status",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt",
    author: "Doctor Kays",
    readTime: "2min watch",
    date: "1st of January, 2024",
    videoId: "p2eG7OM_0_Y",
    imageUrl: clinicseries3, // Replace with actual image paths
  },
  {
    id: 2,
    category: "HIV",
    title: "How is HIV Transmitted",
    description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt",
    author: "Doctor Kays",
    readTime: "3min watch",
    date: "2nd of January, 2024",
    videoId: "p2eG7OM_0_Y",
    imageUrl: clinicseries2, // Replace with actual image paths
  },
  {
    id: 3,
    category: "Breast Cancer",
    title: "Breast Cancer Risk Factor",
    description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt",
    author: "Doctor Kays",
    readTime: "1min watch",
    date: "3rd of January, 2024",
    videoId: "p2eG7OM_0_Y",
    imageUrl: clinicseries1, // Replace with actual image paths
  },
];

export const posts = [
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
    text: "I have learnt so much about personal health and got to know a lot on health matters generally. Thank you so much Dr. Kays for alawys giving prompt response to my questions.",
  },
  {
    user: "Ezekiel",
    company: "Nigeria",
    image: user6,
    text: "Great teams and the app is easy to use.",
  },
];

export const features = [
  {
    icon: <Pill />,
    text: "Medicine on the Street (MOS)",
    description:
      "Learn how street medicine is transforming lives and bringing heathcare awareness to communities.",
  },
  {
    icon: <MessageCircleQuestion />,
    text: "Chat with your AI Doctor",
    description:
      "Meet Doctor Kay's AI, your 24/7 virtual health assistant. Get instant answers to your medical questions and personalized health advice anytime, anywhere.",
  },
  {
    icon: <Syringe />,
    text: "Clinic Series",
    description:
      "Get valuable health tips and advice from our clinic series. Wtch our clinic series videos to stay informaed about various health topis and prventive care.",
  },
  {
    icon: <ShoppingCart />,
    text: "Merch and Shops",
    description:
      "Explore our exclusive range of heath products in Doctor Kay's shop. From supplements to wellness kits, find everything you need to support your health journey.",
  },
  {
    icon: <ActivityIcon />,
    text: "Health Nuggets",
    description:
      "Get your weekly dose of health tips with our Health Nuggets series. Simple, actionableadvice to help you lead a healthier lifestyle.",
  },
  {
    icon: <NotebookPen />,
    text: "Book an Appointment",
    description:
      "Ready to take charge of your health? Book an appointment with Doctor Kay's today and get personalized care you deserve.",
  },
];

export const mission = [
  {
    icon: <TableIcon />,
    text: "Implement Comprehensive Content Strategy",
    description:
      "Provide valuable and engaging content for visitors through various media content such as videos, blogs, graphics, comis, podcasts...",
  },
  {
    icon: <Notebook />,
    text: "Facilitate Easy Appointment",
    description:
      "Enable users to book appointments with Doctor Kays easily and efficienly.",
  },
  {
    icon: <Waypoints />,
    text: "Connect Users With Healthcare Services",
    description:
      "Creating a system to connect users with pharmicies, specialists, and labs based on reviews and refferals.",
  },
  {
    icon: <Podcast />,
    text: "Expert Talks: Health Tips and From Professionals",
    description:
      "Ensure clients are satisfied with the services provided by expert indutry leaders with medical content.",
  },
];

export const faqsCard = [
  {
    id: 1,
    question: "Pellentesque tristique elit orci 1 ?",
    answer:
      "Morbi mattis nisi id orci finibus egestas Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi mattis nisi id orci finibus egestas Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    id: 2,
    question: "Pellentesque tristique elit orci 2 ?",
    answer:
      "Morbi mattis nisi id orci finibus egestas Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi mattis nisi id orci finibus egestas Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi mattis nisi id orci finibus egestas Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    id: 3,
    question: "Pellentesque tristique elit orci 3 ?",
    answer:
      "Morbi mattis nisi id orci finibus egestas Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi mattis nisi id orci finibus egestas Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi mattis nisi id orci finibus egestas Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    id: 4,
    question: "Pellentesque tristique elit orci 4 ?",
    answer:
      "Morbi mattis nisi id orci finibus egestas Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi mattis nisi id orci finibus egestas Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi mattis nisi id orci finibus egestas Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
];

export const checklistItems = [
  {
    title: "Licensed Professional Doctor",
    description:
      "At Doctor's Kay's, your health is in expert hands. Our licensed professional doctor provide top-quality medical care tailored to your needs.",
  },
  {
    title: "We Operate Across the Globe",
    description:
      "No matter where you are, Doctor Kay's services are available.",
  },
  {
    title: "CAC Registered",
    description:
      "Doctor Kay's is proud to be a CAC registered entity, ensuring our operations meet the highest legal and professional standards.",
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
      "Follow closely as doctor kay's takes you to the street of Nigeria.",
  },
  {
    icon: <HeartPulse />,
    title: "Clinic Series",
    description:
      "Doctor kay's powerful vision on keeping people updated on self-preventive medical measures.",
  },
  {
    icon: <ShieldPlus />,
    title: "Health Nuggets",
    description:
      "Astonishing quotes and designs that engages people on how to get along with thier health.",
  },
  {
    icon: <NotebookPen />,
    title: "Appointment Booking",
    description:
      "Book an appointment with Doctor kay's concerning any mediacal related issues you are facing.",
  },
];
export const pricingOptions = [
  {
    title: "Free",
    price: "$0",
    features: [
      "Join the Community",
      "Newsletter Subscription",
      "Weekly Health Content",
      "Private Mode",
    ],
    link: "",
  },
  {
    title: "One Time",
    price: "$20",
    features: [
      "Private Call and Chat",
      "Personalized Treatment",
      "Choose Your Available Date and Time",
      "Regular Checkup",
    ],
    link: "https://calendly.com/martinsmiracle45/one_time_appointment",
  },
  {
    title: "Enterprise",
    price: "$200",
    features: [
      "Entitled to Daily Treatment for a Week",
      "Prescribed Treatmets",
      "Chat and Call at Your Conviniency",
      "Request for More Personalized Treatment",
    ],
  },
];

export const resourcesLinks = [
  { href: "/blog", text: "Blog" },
  { href: "/faqs", text: "FAQs" },
  { href: "#", text: "MOS" },
  { href: "#", text: "Clinic Series" },
  { href: "#", text: "Community Forums" },
];

export const platformLinks = [
  { href: "/doctorkaysai", text: "Doctor Kay's AI" },
  { href: "#", text: "Shops and Merch" },
  { href: "#", text: "Online Clinic (coming soon)" },
];

export const communityLinks = [
  { href: "/about", text: "About us" },
  { href: "/contact", text: "Contact Us" },
  { href: "#", text: "Become a Sponsor/Collaborate" },
  { href: "#", text: "Upcoming Projects" },
  { href: "/volunteer", text: "Become a volunteer" },
];
