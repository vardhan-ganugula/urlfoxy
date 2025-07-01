import React from "react";

const Button = ({
  variant = "default",
  children,
  bolded = "false",
  onClick
}) => {
  return (
    <button
      onClick={onClick}
      className={`
         cursor-pointer p-[2px] hover:bg-primary/80 md:text-md text-xs ${
          variant === "default"
            ? "bg-[#A1E231] text-black rounded-full"
            : variant === "outline"
            ? "bg-black border-2 border-[#A1E231] text-[#A1E231] rounded-full"
            : variant === "glowy"
            ? "rounded-full glowy "
            : ""
        }
        ${bolded && "font-bold"}
    `}
    >
      <span
        className={`px-5 py-2 inline-flex w-full h-full ${variant === 'glowy' ? 'bg-gradient-to-bl from-slate-700 to-30% to-slate-800 text-white rounded-[inherit] blur-none z-[1]' : ''}`}>{children}</span>
    </button>
  );
};

export default Button;
