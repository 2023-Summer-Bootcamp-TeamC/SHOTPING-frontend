import React, { FC, useState } from "react";

interface PayButtonProps {
  variant: keyof typeof VARIANTS;
  name: string;
  onClick?: () => void;
}

const VARIANTS = {
  continue: "w-[717px] h-[89px] mt-6 bg-[#f09] text-white text-2xl font-bold",
  detail:
    "w-[717px] h-[89px] mt-6 bg-white border-[0.7px] border-[#a6a6a6] text-[#565656] text-2xl font-bold",
};

const PayButton: FC<PayButtonProps> = ({ variant, name, onClick }) => {
  const variantClass = VARIANTS[variant];
  const hoverVariantClass =
    variant === "continue" ? "hover:bg-[#D60080]" : "hover:bg-[#EAEAEA]";
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <button
      className={`${variantClass} ${hoverVariantClass}`}
      onClick={handleClick}
    >
      {name}
    </button>
  );
};

export default PayButton;
