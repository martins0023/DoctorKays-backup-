import { resourcesLinks, platformLinks, communityLinks } from "../constants";
import logo from "../assets/logo.png";
const Footer = () => {
  return (
    <footer className="mt-20 border-t py-10 border-neutral-700">
      <div className="mb-10">
        <img src={logo} alt="doctorkays" className="h-8 w-auto" />
        <p className=" font-semibold text-[16px]">Doctorkays</p>
        <p className="mt-1 text-[16px] font-montserrat">
          Doctor Kays, a dedicated medical professional passionate about
          enhancing community health through education and preventive care.
        </p>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        <div>
          <h3 className="text-md font-semibold mb-4">Resources</h3>
          <ul className="space-y-2">
            {resourcesLinks.map((link, index) => (
              <li key={index}>
                <a href={link.href} className=" hover:text-neutral-300">
                  {link.text}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-md font-semibold mb-4">Platform</h3>
          <ul className="space-y-2">
            {platformLinks.map((link, index) => (
              <li key={index}>
                <a href={link.href} className=" hover:text-neutral-300">
                  {link.text}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-md font-semibold mb-4">Community</h3>
          <ul className="space-y-2">
            {communityLinks.map((link, index) => (
              <li key={index}>
                <a href={link.href} className=" hover:text-neutral-300">
                  {link.text}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="mt-8 text-center text-sm text-gray-500">
        <a href="/policy" className="hover:underline">
          Terms Policy
        </a>
        <span className="mx-2">•</span>
        <span href="" className="">
          Designed by <a href="https://www.linkedin.com/in/miracle-oladapo/" className="text-blue-500 hover:underline">Miracle</a>
        </span>
      </div>
    </footer>
  );
};

export default Footer;
