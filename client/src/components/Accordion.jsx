import { useState } from "react";
import { FaArrowAltCircleDown } from "react-icons/fa";

const Accordion = ({ data = [] }) => {
  const accordionData = data.length
    ? data
    : [
        {
          title: "What is a URL shortener?",
          content:
            "A URL shortener is a tool that turns a long web link into a shorter, more manageable one.",
        },
        {
          title: "Why should I use a URL shortener?",
          content:
            "Short URLs are easier to share, look cleaner, and can be tracked for clicks and performance.",
        },
        {
          title: "Can I customize my short URL?",
          content:
            "Yes, you can create custom aliases for your shortened links if they're available.",
        },
        {
          title: "Can I track how many people clicked my link?",
          content:
            "Yes, registered users can view detailed analytics including clicks, browser types, and locations.",
        },
        {
          title: "How long does a shortened URL last?",
          content:
            "By default, links never expire unless deleted manually. Temporary links are also available with time limits.",
        },
        {
          title: "Can I use my own custom domain for shortened URLs?",
          content:
            "Yes, we support custom domains. You can connect your own domain and use it to generate branded short links. Just update your domain’s DNS settings and configure it in your dashboard.",
        },
      ];

  const [openIdx, setOpenIdx] = useState(null);
  return (
    <div className="grid grid-cols-1 md:gap-5 gap-2 items-start w-full md:px-3">
      {accordionData.map((data, idx) => {
        return (
          <div className="rounded border border-zinc-800 text-white " key={idx}>
            <div
              className="relative py-2 px-3"
              onClick={() => {
                if (openIdx === idx) {
                  setOpenIdx(null);
                } else {
                  setOpenIdx(idx);
                }
              }}
            >
              <span
                className={`absolute right-5 top-5.5 transition-transform duration-300 ${
                  openIdx === idx ? "rotate-0" : "-rotate-180"
                } `}
              >
                <FaArrowAltCircleDown size={24} />
              </span>
              <h4 className="cursor-pointer p-3">{data.title}</h4>
            </div>
            <div
              className={`bg-zinc-900 overflow-hidden transition-all duration-500 ${
                idx === openIdx ? "min-h-full p-5  " : "max-h-0 p-0"
              }`}
            >
              <p className={`duration-300 delay-300 ${openIdx === idx ? 'text-white' : 'text-transparent'}`}>
                {data.content}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default React.memo(Accordion);
