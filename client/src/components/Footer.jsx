import React from "react";
import { FaHandHoldingHeart, FaCopyright } from "react-icons/fa";
import Button from "./Button";
import { useNavigate, Link } from "react-router-dom";
import Logo from "../assets/imgs/logo-sm.webp";
import { FooterSocialLinks } from "../constants/social";

const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer className="relative min-h-[400px] w-full bg-zinc-900">
      {/* CTA Section */}
      <div className="text-white w-[90%] md:w-[80%] absolute -top-24 md:-top-32 rounded-lg p-4 md:p-8 left-1/2 text-center -translate-x-1/2 bg-blue-700 min-h-[200px] md:min-h-[300px] flex flex-col items-center justify-center">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-1 md:gap-2 flex-wrap">
          <h2 className="text-lg md:text-3xl font-bold tracking-wide">
            Get closer
          </h2>
          <span className="text-white text-lg md:text-3xl px-1 md:px-2">
            <FaHandHoldingHeart />
          </span>
          <h2 className="text-lg md:text-3xl font-bold tracking-wide">
            to your audience
          </h2>
        </div>
        <h2 className="text-lg md:text-3xl font-bold tracking-wide mt-1">
          and customers today
        </h2>
        <p className="mt-4 md:mt-6 text-zinc-300 text-xs md:text-base w-[90%] md:w-[60%] lg:w-[40%] leading-relaxed">
          Connect to your audience with branded links, QR Codes, and a
          Link-in-bio that will get their attention
        </p>
        <Button
          onClick={() => navigate("/login")}
          className="mt-4 md:mt-6 text-sm md:text-base"
        >
          Start for free
        </Button>
      </div>

      {/* Main Footer Content */}
      <div className="pt-[200px] pb-8 text-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-6">
            
            {/* Logo and Contact Section */}
            <div className="col-span-1 sm:col-span-2 lg:col-span-1">
              <div className="flex items-center mb-4">
                <img src={Logo} alt="logo" className="w-12 h-12 md:w-14 md:h-14" />
                <h3 className="font-bold text-lg md:text-xl ml-2 main-title">Uclip</h3>
              </div>
              <p className="text-zinc-400 text-sm mb-2">Have any questions?</p>
              <p className="underline underline-offset-4 text-sm break-all">
                gvardhan2727@gmail.com
              </p>
            </div>

            {/* Products Section */}
            <div className="col-span-1">
              <h4 className="text-lg font-semibold mb-3">Products</h4>
              <ul className="text-zinc-400 space-y-2 text-sm">
                <li>
                  <Link 
                    to="/create-group" 
                    className="hover:text-white transition-colors duration-200"
                  >
                    Link Management
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/custom-domain"
                    className="hover:text-white transition-colors duration-200"
                  >
                    Custom Domain
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/create-url"
                    className="hover:text-white transition-colors duration-200"
                  >
                    Shorten Links
                  </Link>
                </li>
              </ul>
            </div>

            {/* Resources Section */}
            <div className="col-span-1">
              <h4 className="text-lg font-semibold mb-3">Resources</h4>
              <ul className="text-zinc-400 space-y-2 text-sm">
                <li>
                  <Link 
                    to="/support"
                    className="hover:text-white transition-colors duration-200"
                  >
                    Support
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/login"
                    className="hover:text-white transition-colors duration-200"
                  >
                    Login
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/register"
                    className="hover:text-white transition-colors duration-200"
                  >
                    Register
                  </Link>
                </li>
              </ul>
            </div>

            {/* Legal Section */}
            <div className="col-span-1">
              <h4 className="text-lg font-semibold mb-3">Legal</h4>
              <ul className="text-zinc-400 space-y-2 text-sm">
                <li>
                  <Link 
                    to="/privacy-policy"
                    className="hover:text-white transition-colors duration-200"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/cookie-policy"
                    className="hover:text-white transition-colors duration-200"
                  >
                    Cookie Policy
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/sitemap"
                    className="hover:text-white transition-colors duration-200"
                  >
                    Sitemap
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="w-full px-4 md:px-8 pb-6">
        <div className="max-w-7xl mx-auto">
          <hr className="w-full h-[1px] bg-zinc-600 border-none mb-4" />
          
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-white">
            {/* Left Side - Copyright */}
            <div className="text-sm text-center md:text-left">
              <p className="mb-1">Made with 💖 in India</p>
              <p className="text-zinc-300 flex items-center justify-center md:justify-start gap-1">
                <FaCopyright className="w-3 h-3" />
                {new Date().getFullYear()} uclip.
              </p>
            </div>

            {/* Right Side - Social Links */}
            <div className="text-sm flex flex-col sm:flex-row items-center gap-2 md:gap-4">
              <span className="whitespace-nowrap">Keep in touch</span>
              <div className="flex gap-3">
                {FooterSocialLinks.map((social, idx) => (
                  <Link 
                    key={idx} 
                    to={social.link}
                    className="text-zinc-400 hover:text-white transition-colors duration-200"
                  >
                    {React.createElement(social.icon, {
                      size: 18
                    })}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default React.memo(Footer);