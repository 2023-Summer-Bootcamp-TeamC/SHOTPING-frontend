import React from "react";
import { predictResultProps } from "./ScanResult";

export default function ScanList({
  id,
  product_name,
  product_price,
  image_url,
}: predictResultProps) {
  console.log("imgUrl(ScanList)", image_url);
  return (
    <div className="flex flex-col">
      <div className=" flex items-center space-x-9 place-content-center p-4 pr-1">
        <div className="relative w-20 h-24 bg-white flex justify-center items-center">
          <img src={image_url} className="absolute" />
        </div>
        <span className="truncate text-lg w-2/4">{product_name}</span>
        <span className="text-lg"> 1 </span>
        <span className="text-xl"> {product_price.toLocaleString()}원 </span>
      </div>
    </div>
  );
}
