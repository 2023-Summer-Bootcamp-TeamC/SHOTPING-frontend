import React from "react";

/**
 * 헤더 (상단바)
 */

export function Header() {
  return (
    <div className="flex flex-col px-5 pt-5">
      <div className="flex items-center">
        <span className="text-[#ff0099] text-2xl font-sans font-bold">
          SHOTPING
        </span>
        <div className="flex pl-10 space-x-10">
          <div className="hover:underline-offset-4 text-lg">상품인식</div>
          <div className="hover:underline-offset-4 text-lg">상품리스트 </div>
          <div className="hover:underline-offset-4 text-lg">결제 </div>
        </div>
      </div>
      <div className="flex px-4 py-2 w-full border-b-2" />
    </div>
  );
}
