import React from "react";

const Button = ({
  variant = "default",
  children,
  bolded = "false",
  onClick,
  className,
  disabled = false
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
         cursor-pointer p-[2px] hover:bg-primary/80 md:text-md text-xs disabled:bg-primary/80 disabled:cursor-not-allowed ${
           variant === "default"
             ? "bg-primary text-black rounded-full"
             : variant === "outline"
             ? "bg-black border-2 border-primary text-primary rounded-full"
             : variant === "glowy"
             ? "rounded-full glowy "
             : variant == "squared"
             ? "bg-primary text-black rounded"
             : ""
         }
        ${bolded && "font-bold"} ${className}
    `}
    >
      <span
        className={`px-5 py-2 inline-flex w-full h-full ${
          variant === "glowy"
            ? "bg-gradient-to-bl from-slate-700 to-30% to-slate-800 text-white rounded-[inherit] blur-none z-[1]"
            : ""
        }`}
      >
        {children}
      </span>
    </button>
  );
};

export default React.memo(Button);
