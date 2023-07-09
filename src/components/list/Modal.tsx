import React, { Dispatch, SetStateAction, useEffect, useState } from "react";

interface modalprops {
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
}

export default function Modal({ setIsModalOpen }: modalprops) {
  const [count, setCount] = useState(1);

  const decreaseCount = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  const increaseCount = () => {
    setCount(count + 1);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div
      className="modal absolute w-full h-full top-0 left-0 bg-black bg-opacity-50"
      style={{ cursor: "default" }}
    >
      <div
        className="modalContent w-96 h-64 bg-white rounded-3xl relative top-72 left-96 pt-7 pl-7"
        title="상품명"
        style={{
          marginTop: "-100px",
        }}
      >
        <div className="productName w-80 text-left">상품명</div>
        <br />
        <div className="flex w-16 border rounded text-right ml-auto mr-8">
          <div className="minus pl-3" onClick={decreaseCount}>
            <button>-</button>
          </div>
          <div className="number pl-2">{count}</div>
          <div className="plus pl-2" onClick={increaseCount}>
            <button>+</button>
          </div>
        </div>
        <div className="price w-80 text-right text-lg pt-4">
          <b>
            <br />0 원
          </b>
        </div>
        <br />
        <div className="flex ">
          <button
            className="w-40 border border-slate-600 rounded text-center pt-1.5 pb-1.5 mr-2"
            onClick={closeModal}
          >
            취소
          </button>
          <button className="w-40 border rounded text-center bg-[#ff0099] pt-1.7 pb-1.7 text-white">
            장바구니 담기
          </button>
        </div>
      </div>
    </div>
  );
}
