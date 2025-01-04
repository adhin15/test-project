"use client";

import Loader from "../Loader";
import { ButtonProps } from "./type";

const Button = ({
  className = "",
  children = "",
  color = "primary",
  disabled = false,
  endIcon = "",
  startIcon = "",
  isFullWidth = false,
  isLoading = false,
  onClick = () => {},
  style = {},
  textSize = "14px",
  textWeight = 400,
  textVariant = "button",
  variant = "regular",
  textColor = "#fff",
  type = "",
  ...rest
}: ButtonProps) => {
  let bgcolor;

  switch (color) {
    case "primary":
      bgcolor = "#ffc300";
  }

  return (
    <div className={`flex h-full ${isFullWidth ? "w-full" : "w-fit"} `}>
      <button
        className={`
                px-6 py-2 rounded-lg font-semibold h-fit w-full active:scale-100 hover:scale-110 transition ease-in-out delay-50
                ${
                  variant === "regular"
                    ? `bg-[${bgcolor}] text-[#000]`
                    : variant === "outlined"
                    ? `bg-transparent border-solid border-2 border-[${bgcolor}] text-[${bgcolor}]`
                    : variant === "text"
                    ? `bg-transparent`
                    : ""
                }
                ${className}`}
        style={{
          fontSize: textSize,
          minHeight: "38px",
          ...style,
        }}
        onClick={onClick}
        {...rest}
      >
        {isLoading ? <Loader size={textSize} /> : children}
      </button>
    </div>
  );
};

export default Button;
