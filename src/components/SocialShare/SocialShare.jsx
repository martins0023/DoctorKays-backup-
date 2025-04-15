import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaWhatsapp,
} from "react-icons/fa";

const SocialShare = ({ post }) => {
  const currentUrl = window.location.href;
  const shareText = encodeURIComponent(post.title);
  const shareUrl = encodeURIComponent(currentUrl);

  const socialPlatforms = [
    {
      name: "Facebook",
      icon: <FaFacebookF />,
      url: `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`,
    },
    {
      name: "Twitter",
      icon: <FaTwitter />,
      url: `https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareText}`,
    },
    {
      name: "LinkedIn",
      icon: <FaLinkedinIn />,
      url: `https://www.linkedin.com/shareArticle?mini=true&url=${shareUrl}&title=${shareText}`,
    },
    {
      name: "WhatsApp",
      icon: <FaWhatsapp />,
      url: `https://api.whatsapp.com/send?text=${shareText}%20${shareUrl}`,
    },
  ];

  return (
    <div className="flex justify-center gap-4 mt-4">
      {socialPlatforms.map((platform) => (
        <a
          key={platform.name}
          href={platform.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Share on ${platform.name}`}
          className="text-white bg-gradient-to-l from-blue-500 to-blue-950 text-transparent hover:bg-blue-700 p-2 rounded-full transition"
        >
          {platform.icon}
        </a>
      ))}
    </div>
  );
};

export default SocialShare;
