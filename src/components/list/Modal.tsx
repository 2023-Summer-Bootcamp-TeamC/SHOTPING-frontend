import React, { Dispatch, SetStateAction, useState, useCallback } from "react";
import { ProductCardProps } from "./ProductList";

interface ModalProps extends ProductCardProps {
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
  addToCart: () => void;
  setIsAddedToCart: Dispatch<SetStateAction<boolean>>;
  openScroll: () => void;
}

export default function Modal({
  setIsModalOpen,
  addToCart,
  setIsAddedToCart,
  openScroll,
  productName,
  price,
  id,
  image,
  stock,
}: ModalProps) {
  const [count, setCount] = useState(1);

  const decreaseCount = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  const increaseCount = () => {
    setCount(count + 1);
  };

  const totalPrice = Number(price.replace(/,/g, "")) * count; //가격개선

  const closeModal = () => {
    setIsModalOpen(false);
    setIsAddedToCart(false);
    openScroll();
  };

  return (
    <div
      className="modal flex justify-center items-center absolute z-10 w-full min-h-screen top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50"
      style={{ cursor: "default" }}
    >
      <div
        className="modalContent w-96 h-64 bg-white rounded-3xl pt-7 pl-7"
        title={productName}
      >
        <div className="productName w-80 text-left">{productName}</div>
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
            <br /> {totalPrice.toLocaleString()} 원
          </b>
        </div>
        <br />
        <div className="flex">
          <button
            className="w-40 border border-slate-600 rounded text-center pt-1.5 pb-1.5 mr-2"
            onClick={closeModal}
          >
            취소
          </button>
          <button
            className="w-40 border rounded text-center bg-[#ff0099] pt-1.7 pb-1.7 text-white"
            onClick={addToCart}
          >
            장바구니 담기
          </button>
        </div>
      </div>
    </div>
  );
}
