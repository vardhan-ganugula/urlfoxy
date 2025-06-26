import React from "react";
import { TfiStatsUp } from "react-icons/tfi";

const StatsBlock = () => {
  return (
    <div className="w-[300px] h-[300px] rounded-lg flex gap-5 p-5 flex-col justify-center items-center border border-zinc-800 bg-zinc-900">
      <div className="relative bg-black w-[100px] h-[100px]">
        <div className="absolute w-full h-full grid grid-cols-4 gap-0.5 p-0.1">
          {Array.from({ length: 16 }).map((_, idx) => (
            <div className="text-center my-auto bg-zinc-950 w-[22px] h-[22px]"></div>
          ))}
        </div>

        <div className="absolute w-full h-full flex items-center justify-center">
          <div className="bg-white/40 w-1/2 h-1/2 rounded-full blur-xl"></div>
        </div>

        <div className="w-full h-full flex items-center justify-center absolute">
          <div className="bg-black rounded p-3 text-white">
            <TfiStatsUp /> 
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsBlock;
