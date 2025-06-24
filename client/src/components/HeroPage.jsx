import React, { useRef } from "react";
import { FaFire, FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const HeroPage = () => {
  gsap.registerPlugin(useGSAP);
  const mainRef = useRef();
  const pointerRef = useRef();

  const animatePointer = (e) => {
    gsap.to(pointerRef.current, {
      left: e.clientX - 10,
      top: e.clientY - 10,
      duration: 0.8,
      opacity: 1,
      ease: "power2.out",
    });
  };
  const hidePointer = (e) => {
    gsap.to(pointerRef.current, {
      x: -10,
      y: -50,
      opacity: 0,
      duration: 1,
    });
  };
  useGSAP(() => {
    const mainElement = mainRef.current;
    mainElement.addEventListener("mousemove", animatePointer);
    mainElement.addEventListener("mouseenter", animatePointer);
    mainElement.addEventListener("mouseleave", hidePointer);
    return () => {
      mainElement.removeEventListener("mousemove", animatePointer);
      mainElement.removeEventListener("mouseenter", animatePointer);
      mainElement.removeEventListener("mouseleave", hidePointer);
    };
  }, []);

  return (
    <main className="bg-black min-h-screen" ref={mainRef}>
      <div
        ref={pointerRef}
        className="fixed w-5 h-5 rounded-full bg-amber-500 pointer-events-none z-50 opacity-0"
      ></div>
      <section className="before:absolute relative before:content-[''] before:w-52 before:h-52 before:rounded-full before:bg-amber-500/25 before:top-18  before:left-1/2 before:-translate-x-1/2 before:z-0 before:blur-[80px]">
        <div className="w-full relative z-10 h-[70vh] flex items-center justify-center flex-col">
          <span className="text-yellow-500 mb-9 flex gap-2 items-center border-amber-500 border rounded-3xl px-3 p-1 ">
            {" "}
            <span className="pr-2 mr-2 border-r border-amber-500">
              <FaFire />
            </span>{" "}
            Lightning Fast URL Shortening{" "}
            <span>
              <FaArrowRight />{" "}
            </span>{" "}
          </span>
          <h1 className="uppercase text-8xl font-lato text-center leading-25 inline-block bg-gradient-to-br from-slate-100 to bg-slate-500 text-transparent bg-clip-text">
            Just short it <br /> with uclip
          </h1>
          <h4 className="text-zinc-400 mt-5">
            Simplify Links. Amplify Impact.
          </h4>
          <Link to="/login" className="bg-slate-100 p-2 mt-8 rounded-2xl">
            Get Started
          </Link>
        </div>
      </section>
      <section className="flex justify-center w-full">
        <div className="w-[50%]">
          <img
            className="object-cover w-full "
            src="https://blog.usermaven.com/wp-content/uploads/2025/04/analytics-dashboard-2.png"
            alt=""
          />
        </div>
      </section>
      <section></section>
    </main>
  );
};

export default HeroPage;
