import React from "react";
import { IoExtensionPuzzle, IoQrCode } from "react-icons/io5";
import { IoMdLink } from "react-icons/io";
import { TfiStatsUp } from "react-icons/tfi";
import analyticsImage from "../assets/imgs/stats.webp";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
const Overview = () => {
  const navigate = useNavigate();
  return (
    <section className="flex justify-center p-9 w-full">
      <div className="w-full md:w-[1000px] flex p-5 text-white flex-col items-center bg-zinc-900 rounded">
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
              <IoQrCode size={12} />
            </span>
            <span className="md:inline-block hidden text-xs">short links</span>
            <span className="inline-block md:hidden text-xs">share</span>
          </div>

          <div className="flex p-1 gap-1 pr-3 items-center bg-transparent border border-amber-500 rounded-full capitalize">
            <span className="p-1 rounded-full bg-white text-amber-500">
              <TfiStatsUp size={12} />
            </span>
            <span className="md:inline-block hidden text-xs">
              manage your links
            </span>
            <span className="inline-block md:hidden text-xs">analyze</span>
          </div>
        </div>

        <div className="mt-18 w-[80%] flex justify-between">
          <div className="mx-auto">
            <div className="my-auto">
              <div className="text-lg md:text-3xl space-x-2">
                <span className="text-primary">Campaign</span>
                <span className="text-amber-500">Monitoring</span> &
                <span className="text-violet-500"> Analytics</span>
              </div>
              <p className="text-sm text-zinc-400 mt-5 mb-9">
                Learn from your links and build better digital campaigns
              </p>
              <Button onClick={()=>{
                navigate('/register')
              }}>Start for free</Button>
            </div>
          </div>
          <div className="items-center w-[300px] ">
            <img
              src={analyticsImage}
              className="w-full h-full object-cover rounded hidden md:block"
              alt=""
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default React.memo(Overview);
