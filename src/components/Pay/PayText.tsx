import React, { FC } from "react";

interface PayTextProps {
  name: string;
}

const PayText: FC<PayTextProps> = ({ name }) => {
  return (
    <div>
      <p className="text-[40px]  text-black">{name}</p>
    </div>
  );
};

export default PayText;
