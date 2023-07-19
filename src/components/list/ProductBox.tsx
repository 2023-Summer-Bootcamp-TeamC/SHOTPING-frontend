import React, { useState, useCallback } from "react";
import { TfiPlus } from "react-icons/tfi";
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
  const [isSoldOut, setIsSoldOut] = useState(stock === 0);
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const { lockScroll, openScroll } = useBodyScrollLock();

  const openModal = () => {
    if (stock === 0) {
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
    }, 1200);
  };

  return (
    <div className="flex flex-col items-center justify-center mb-10">
      <div
        className={`goods w-[20rem] ml-1 mr-1 overflow:hidden cursor-pointer`}
        onClick={openModal}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative flex items-center justify-center">
          <img
            src={image}
            alt="image"
            className={`w-[20rem] h-[25rem] mb-1 ${
              isHovered ? "brightness-50" : ""
            } ${isSoldOut ? "brightness-50" : ""} ${
              isAddedToCart ? "brightness-50" : ""
            }`}
          />
          {isSoldOut && (
            <div className="absolute text-center text-2xl font-semibold text-white">
              SOLD OUT
            </div>
          )}
          {isAddedToCart && (
            <div className="absolute text-xl text-center text-white">
              상품이 장바구니에 담겼습니다
              <br />
              결제 탭에서 확인해주세요!
            </div>
          )}
          {isHovered && !isSoldOut && !isAddedToCart && (
            <div className="absolute">
              <TfiPlus size="80" color="#FFF" />
            </div>
          )}
        </div>
        <div className="flex flex-col h-20">
          <div className="goodsName text-left pt-1 text-xl">{productName}</div>
          <div className="flex pt-2">
            <div className="inventory text-left mr-auto text-xl">
              {stock}개 남음
            </div>
            <div className="price font-semibold text-right ml-auto text-xl">
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
    </div>
  );
}
