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
    </div>
  );
}
