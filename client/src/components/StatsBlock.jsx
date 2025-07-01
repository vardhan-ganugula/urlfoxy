import React from "react";

const StatsBlock = ({
  icon, title, tagline
}) => {
  return (
    <div className="w-[270px] h-[270px] rounded-lg flex gap-5 p-5 flex-col justify-center items-center border border-zinc-800 bg-zinc-900">
      <h5 className="text-white text-xl">{title}</h5>
      <div className="relative bg-black w-[100px] h-[100px]">
        <div className="absolute w-full h-full grid grid-cols-4 gap-0.5 p-0.1">
          {Array.from({ length: 16 }).map((_, idx) => (
            <div
              key={idx}
              className="text-center my-auto bg-zinc-950 w-[20px] h-[20px]"
            ></div>
          ))}
        </div>

        <div className="absolute w-full h-full flex items-center justify-center">
          <div className="bg-white/40 w-1/2 h-1/2 rounded-full blur-xl"></div>
        </div>

        <div className="w-full h-full flex items-center justify-center absolute">
          <div className="bg-black rounded p-3 text-white">
            {
              React.createElement(icon, {
                size: 19,
                color: '#fff'
              })
            }
          </div>
        </div>
      </div>
      <p className="text-zinc-500">{tagline}</p>
    </div>
  );
};

export default StatsBlock;
