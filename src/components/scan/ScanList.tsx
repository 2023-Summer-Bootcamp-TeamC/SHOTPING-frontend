import React from "react";

export default function ScanList() {
  return (
    <div className="flex flex-col">
      <div className=" flex items-center space-x-9 place-content-center p-4 pr-1">
        <div className="relative w-20 h-24 bg-white flex justify-center items-center">
          <img
            src="https://i.postimg.cc/HLC973gD/2023-07-06-224526.png"
            className="absolute "
          />
        </div>
        <span className="truncate text-lg w-2/4">
          지금까지 이런맛은 없었다 이건 갈비인가 치킨인가
        </span>
        <span className="text-lg"> 1 </span>
        <span className="text-xl"> 15000원 </span>
      </div>
    </div>
  );
}
