import React from "react";

export function SearchBox() {
  return (
    <div className="flex items-center text-center">
      <input
        type="text"
        placeholder="상품명을 입력하세요"
        className="w-64 px-4 py-2 border-b border-gray-300 focus:outline-none focus:none"
      />
      <button type="button" className="mr-2 ml-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="h-6 w-6"
        >
          <path
            fillRule="evenodd"
            d="M9.25 1.75a7.5 7.5 0 1 1 0 15 7.5 7.5 0 0 1 0-15zM15.561 14.44l3.689 3.69a1 1 0 1 1-1.42 1.42l-3.69-3.688A8 8 0 1 1 15.56 14.44z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    </div>
  );
}
