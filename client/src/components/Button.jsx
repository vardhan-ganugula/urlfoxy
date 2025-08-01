import React from "react";

const baseStyles = {
  default: "bg-primary text-black rounded-full",
  outline: "bg-black border-2 border-primary text-primary rounded-full",
  glowy: "rounded-full glowy",
  squared: "bg-primary text-black rounded",
};

const Button = ({
  variant = "default",
  children,
  bolded = false,
  onClick,
  className = "",
  disabled = false,
}) => {
  const variantClass = baseStyles[variant] || "";

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        cursor-pointer p-[2px] hover:bg-primary/80 md:text-md text-xs
        disabled:bg-primary/80 disabled:cursor-not-allowed
        ${bolded ? "font-bold" : ""}
        ${variantClass} ${className}
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