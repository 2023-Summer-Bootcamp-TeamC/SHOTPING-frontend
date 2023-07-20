import React, { useState, ChangeEvent, KeyboardEvent, MouseEvent } from "react";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export function SearchBox() {
  const [searchInput, setSearchInput] = useState("");
  const navigate = useNavigate();

  const searchOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };
  const searchClick = (e: MouseEvent<HTMLButtonElement>) => {
    if (searchInput === "") {
      e.preventDefault();
      alert("검색어를 입력해 주세요.");
    } else {
      navigate("/searchresult", { state: searchInput });
    }
  };

  const enterSearch = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (searchInput === "") {
        e.preventDefault();
        alert("검색어를 입력해 주세요.");
      } else {
        navigate("/searchresult", { state: searchInput });
      }
    }
  };

  return (
    <div className="flex items-center text-center">
      <input
        type="text"
        placeholder="상품명을 입력하세요"
        onChange={searchOnChange}
        onKeyPress={enterSearch}
        className="md:w-[25rem] w-[20rem] h-[3rem] md:ml-0 ml-10 text-xl px-2 py-2 border-b border-gray-300 focus:outline-none focus:none"
      />
      <button type="button" className="mr-2 mt-1" onClick={searchClick}>
        <FaSearch className="w-7 h-7 text-gray-300" />
      </button>
    </div>
  );
}
