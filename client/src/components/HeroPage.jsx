import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Button from "./Button";
import FeatureBlocks from "./FeatureBlocks";
import InfoBlock from "./InfoBlock";
import Overview from "./Overview";
import Accordion from "./Accordion";
import Footer from "./Footer";

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
    <main className="bg-black min-h-screen w-full flex flex-col gap-5 pb-32 md:pb-[300px]">
      <div
        ref={pointerRef}
        className="fixed hidden md:block w-[20px] h-[20px] rounded-full bg-white pointer-events-none z-50 opacity-0 mix-blend-difference"
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

      <Overview />
      <FeatureBlocks />
      <InfoBlock />
      <section className="flex flex-col gap-5 p-5 items-center">
        <div className="w-[95%] max-w-[1000px]">
          <h2 className="text-center text-white text-4xl mb-10 font-bold">
            Your questions, <span className="text-blue-500">answered</span>
          </h2>
          <Accordion/>
        </div>
      </section>

    </main>
  );
};

export default React.memo(HeroPage);
