import React from "react";
import { FaHandHoldingHeart,FaCopyright } from "react-icons/fa";
import Button from "./Button";
import { useNavigate, Link } from "react-router-dom";
import Logo from "../assets/imgs/logo-sm.webp";
import { FooterSocialLinks } from "../constants/social";
const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer className="relative min-h-[400px] w-full mt-[300px] bg-zinc-900">
      <div className="text-white w-[80%] absolute -top-1/3 rounded-lg p-5 left-1/2 text-center -translate-x-1/2 bg-blue-700 min-h-[300px] flex flex-col items-center">
        <h2 className="flex tracking-wide text-center text-xl md:text-3xl mt-10">
          Get closer{" "}
          <span className="md:px-2 md:pt-2 px-1 text-primary">
            {" "}
            <FaHandHoldingHeart />
          </span>{" "}
          to your audience
        </h2>
        <h2 className="flex tracking-wide text-center text-lg md:text-3xl mt-1">
          and customers today
        </h2>
        <p className="mt-6 text-zinc-400 md:text-md text-xs md:w-[25%] w-[70%]">
          Connect to your audience with branded links. QR Codes, and a
          Link-in-bio that will get their attention
        </p>
        <Button
          onClick={() => {
            navigate("/login");
          }}
          className="mt-5"
        >
          Start for free
        </Button>
      </div>
      <div className="mt-[200px] text-white flex justify-center">
        <div className="w-[95%] md:w-[70%] grid md:grid-cols-4 grid-cols-1 place-items-center md:place-content-start items-start">
          <div>
            <div className="flex justify-start">
              <img src={Logo} alt="logo" className="w-14 h-14" />
              <h3 className="text-bold my-auto main-title">Uclip</h3>
            </div>
            <p className="text-zinc-400 ml-3 text-sm">Have any questions?</p>
            <p className="underline underline-offset-8 text-sm ml-3 mt-2"> gvardhan2727@gmail.com</p>
          </div>
          <div>
            <h4 className="text-lg">Products</h4>
            <ul className="text-zinc-500 py-3 md:text-sm text-xs ">
              <li className="mt-1">
                <Link to="/create-group">Link Management</Link>
              </li>
              <li className="mt-1">
                <Link to="/custom-domain">Custom Domain</Link>
              </li>
              <li className="mt-1">
                <Link to="/create-url">Shorten Links</Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg">Resources</h4>
            <ul className="text-zinc-500 py-3 md:text-sm text-xs ">
              <li className="mt-1">
                <Link to="/support">Support</Link>
              </li>
              <li className="mt-1">
                <Link to="/login">Login</Link>
              </li>
              <li className="mt-1">
                <Link to="/register">Register</Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg">Legal</h4>
            <ul className="text-zinc-500 py-3 md:text-sm text-xs ">
              <li className="mt-1">
                <Link to="/create-group">Privacy Policy</Link>
              </li>
              <li className="mt-1">
                <Link to="/custom-domain">Cookie Policy</Link>
              </li>
              <li className="mt-1">
                <Link to="/create-url">Sitemap</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="w-[90%] mx-auto mt-5 flex flex-col justify-center items-center">
        <hr className="w-[90%] h-[1px] bg-zinc-600 mx-auto border-none my-2" />
        <div className="flex justify-between text-white w-[90%]">
            <div className="text-sm">
                <div><p>Made with 💖 in India</p></div>
                <div><p className="text-zinc-300 flex gap-2 mt-1 mb-2"> © {new Date().getFullYear()} uclip.</p></div>
            </div>
            <div className="text-sm my-auto flex gap-7">
    
                <span>Keep in touch</span> <span className="flex gap-2">
                    {
                        FooterSocialLinks.map((social, idx) => (<Link key={idx} to={social.link}>
                            {
                                React.createElement(social.icon, {
                                    size: 18
                                })
                            }
                        </Link>))
                    }
                </span>
            </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
