import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Button from "./Button";
import { IoExtensionPuzzle,IoQrCode  } from "react-icons/io5";
import { IoMdLink } from "react-icons/io";
import { TfiStatsUp } from "react-icons/tfi";
import analyticsImage from '../assets/imgs/analytics.jpg'
import StatsBlock from "./StatsBlock";

const HeroPage = () => {
  gsap.registerPlugin(useGSAP);
  const pointerRef = useRef();
  const mainTitleRef = useRef();

  const animatePointer = (e) => {
    gsap.to(pointerRef.current, {
      left: e.clientX - 10,
      top: e.clientY - 10,
      duration: 0.8,
      opacity: 1,
      ease: "power2.out",
    });
  };

  const handleMainTitle = () => {
    gsap.to(pointerRef.current, {
      scale: 6,
      duration: 0.3,
      color: "#fff",
    });
  };

  const resetPointer = () => {
    gsap.to(pointerRef.current, {
      scale: 1,
      duration: 0.3,
      color: "#fff",
    });
  };

  useGSAP(() => {
    const mainTitle = mainTitleRef.current;

    window.addEventListener("mousemove", animatePointer);

    if (mainTitle) {
      mainTitle.addEventListener("mouseenter", handleMainTitle);
      mainTitle.addEventListener("mouseleave", resetPointer);
    }

    return () => {
      window.removeEventListener("mousemove", animatePointer);

      if (mainTitle) {
        mainTitle.removeEventListener("mouseenter", handleMainTitle);
        mainTitle.removeEventListener("mouseleave", resetPointer);
      }
    };
  }, []);

  return (
    <main className="bg-black min-h-screen">
      <div
        ref={pointerRef}
        className="fixed w-[20px] h-[20px] rounded-full bg-white pointer-events-none z-50 opacity-0 mix-blend-difference"
      ></div>
      <section className="before:absolute relative before:content-[''] before:w-52 before:h-52 before:rounded-full before:bg-amber-500/25 before:top-18 before:left-1/2 before:-translate-x-1/2 before:z-0 before:blur-[80px]">
        <div className="w-full relative z-10 h-[70vh] flex items-center justify-center flex-col">
          <span className="text-yellow-500 mb-18 flex gap-2 items-center glowy-shadow duration-300 border-amber-500 border rounded-3xl px-3 p-1 md:text-lg text-xs ">
            <span className="pr-2 mr-2 border-r border-amber-500">🔥</span>
            Lightning Fast URL Shortening
            <span>→</span>
          </span>
          <h1
            ref={mainTitleRef}
            className="main-title uppercase text-5xl lg:text-8xl text-center leading-tight inline-block bg-gradient-to-br from-slate-100 to-slate-500 text-transparent bg-clip-text cursor-pointer font-lato font-[900]"
          >
            Just short it <br /> with uclip
          </h1>
          <h4 className="text-zinc-400 mt-9 mb-18 md:mb-9 text-xs md:text-md">
            Simplify Links. Amplify Impact.
          </h4>
          <Button>Get Started</Button>
        </div>
      </section>
      <section className="flex justify-center p-9 w-full">
        <div className="lg:w-[50%] md:w-[80%] w-full flex p-5 text-white flex-col items-center bg-zinc-800 rounded">
          <h2 className="flex flex-col w-full items-center text-2xl md:text-4xl font-bold mt-9">
            <span>Explore features</span>
            <span className="inline-flex gap-2 text-nowrap">
              for more <IoExtensionPuzzle color="#a1e231" /> efficiency
            </span>
          </h2>
          <p className="text-md mt-2 text-zinc-400">
            Use uclip to save your work
          </p>

          <div className="flex items-center justify-center mt-5 gap-2">
            <div className="flex p-1 gap-1 pr-3 items-center bg-amber-500 rounded-full capitalize">
              <span className="p-1 rounded-full bg-white text-amber-500">
                <IoMdLink size={12} />
              </span>
              <span className="md:inline-block hidden text-xs">short links</span>
              <span className="inline-block md:hidden text-xs">create</span>
            </div>

            <div className="flex p-1 gap-1 pr-3 items-center bg-transparent border border-amber-500 rounded-full capitalize">
              <span className="p-1 rounded-full bg-white text-amber-500">
                <IoQrCode  size={12} />
              </span>
              <span className="md:inline-block hidden text-xs">short links</span>
              <span className="inline-block md:hidden text-xs">share</span>
            </div>

            <div className="flex p-1 gap-1 pr-3 items-center bg-transparent border border-amber-500 rounded-full capitalize">
              <span className="p-1 rounded-full bg-white text-amber-500">
                <TfiStatsUp size={12} />
              </span>
              <span className="md:inline-block hidden text-xs">manage your links</span>
              <span className="inline-block md:hidden text-xs">analyze</span>
            </div>

          </div>


          <div className="mt-18 grid grid-cols-2 w-full">
            <div className="my-auto text-center text-2xl">
              <span className="text-primary">Campaign</span> <span className="text-amber-500">Monitoring</span> <br /> & <span className="text-violet-500">Analytics</span>
            </div>
            <div className="w-[300px] h-[250px] items-center">
              <img src={analyticsImage} className="w-full h-full object-cover rounded" alt="" />
            </div>
          </div>


        </div>
      </section>

      <section className="flex justify-center gap-3 h-[500px]">
        <StatsBlock />
      </section>
    </main>
  );
};

export default HeroPage;
