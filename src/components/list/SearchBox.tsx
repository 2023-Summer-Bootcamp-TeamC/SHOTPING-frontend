import React from "react";
import { FaSearch } from "react-icons/fa";

export function SearchBox() {
  return (
    <div className="flex items-center text-center">
      <input
        type="text"
        placeholder="상품명을 입력하세요"
        className="w-80 h-14 text-xl px-2 py-2 border-b border-gray-300 focus:outline-none focus:none"
      />
      <button type="button" className="mr-2 mt-1">
        <FaSearch className="w-7 h-7 text-gray-300" />
      </button>
    </div>
  );
}
