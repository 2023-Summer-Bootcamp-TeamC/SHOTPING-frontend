<<<<<<< HEAD
import React, { useState, useCallback } from "react";
import Modal from "./Modal";

function useBodyScrollLock() {
  const lockScroll = useCallback(() => {
    document.body.style.overflow = "hidden";
  }, []);

  const openScroll = useCallback(() => {
    document.body.style.removeProperty("overflow");
  }, []);

  return { lockScroll, openScroll };
}

export default function ProductBox({
  id,
  image,
  productName,
  price,
  stock,
}: {
  id: string;
  image: string;
  productName: string;
  price: string;
  stock: any;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSoldOut, setIsSoldOut] = useState(stock == 0);
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const { lockScroll, openScroll } = useBodyScrollLock();

  const openModal = () => {
    if (stock == 0) {
      alert("품절된 상품입니다.");
    } else {
      setIsModalOpen(true);
      lockScroll();
    }
  };

  const addToCart = () => {
    setIsAddedToCart(true);
    setIsModalOpen(false);
    setTimeout(() => {
      setIsAddedToCart(false);
    }, 1000);
  };

  return (
    <div>
      <div
        className={`goods w-52 overflow:hidden cursor-pointer ml-5`}
        onClick={openModal}
      >
        <div className="relative flex items-center justify-center">
          <img
            src={image}
            alt="image"
            className={`w-full h-64 hover:brightness-50 ${
              isSoldOut ? "brightness-50" : ""
            } ${isAddedToCart ? "brightness-50" : ""}`}
          />
          {isSoldOut && (
            <div className="absolute text-center font-semibold text-white">
              SOLD OUT
            </div>
          )}
          {isAddedToCart && (
            <div className="absolute text-sm text-center text-white">
              상품이 장바구니에 담겼습니다
              <br />
              결제 탭에서 확인해주세요!
            </div>
          )}
        </div>
        <div className="flex flex-col">
          <div className="goodsName text-left pt-1">{productName}</div>
          <div className="flex pt-2">
            <div className="inventory text-left mr-auto">{stock}개 남음</div>
            <div className="price font-semibold text-right ml-auto">
              {price}원
            </div>
          </div>
        </div>
      </div>
      {isSoldOut && !isModalOpen && isAddedToCart && (
        <div className="absolute text-white pl-10 pt-24"></div>
      )}
      {isModalOpen && (
        <Modal
          setIsModalOpen={setIsModalOpen}
          addToCart={addToCart}
          setIsAddedToCart={setIsAddedToCart}
          openScroll={openScroll}
          productName={productName}
          price={price}
          id={id}
          image={image}
          stock={stock}
        />
      )}
=======
import React, { useState } from "react";
import Modal from "../list/Modal";

export default function ProductBox() {
  const [isHovered, setIsHovered] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  return (
    <div onClick={openModal}>
      <div className="goods w-52 hover:brightness-50 overflow:hidden">
        <img
          src="https://i.postimg.cc/2yqhm5nD/image.png"
          alt="image"
          className="w-56 h-64"
        />
        <div className="flex flex-col">
          <div className="goodsName text-left pt-1">상품명</div>
          <div className="flex pt-2">
            <div className="inventory text-left mr-auto">재고</div>
            <div className="price font-semibold text-right ml-auto">0원</div>
          </div>
        </div>
      </div>
      {isModalOpen && <Modal setIsModalOpen={setIsModalOpen} />}
>>>>>>> #8
    </div>
  );
}
