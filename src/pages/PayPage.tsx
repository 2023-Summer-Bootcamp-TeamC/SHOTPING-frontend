import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import pay_image from "../components/images/pay_image.png";
import PayModal from "../components/Pay/PayModal";

const flexColumnCenterStyle = () => {
  return "flex flex-col items-center justify-center h-full";
};
interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

const products: Product[] = [
  {
    id: 1,
    name: "[그릭데이] 그릭요거트 시그니처그 ",
    price: 17100,
    image: "src/components/images/image001.png",
    quantity: 1,
  },
  {
    id: 2,
    name: "에어팟 키링",
    price: 3000,
    image: "src/components/images/image001.png",
    quantity: 1,
  },
  {
    id: 3,
    name: "폴리폴리 무릎 담요",
    price: 7000,
    image: "src/components/images/image001.png",
    quantity: 1,
  },
  {
    id: 4,
    name: "아이폰 스티커 팩",
    price: 1900,
    image: "src/components/images/image001.png",
    quantity: 1,
  },
  {
    id: 5,
    name: "개발자 키보드",
    price: 99000,
    image: "src/components/images/image001.png",
    quantity: 1,
  },
  {
    id: 6,
    name: "개발자 커스텀 케이블",
    price: 69000,
    image: "src/components/images/image001.png",
    quantity: 1,
  },
  {
    id: 7,
    name: "문 긁는 고양이",
    price: 1000000,
    image: "src/components/images/image001.png",
    quantity: 1,
  },
  {
    id: 8,
    name: "우당탕탕 인테리어 책",
    price: 5900,
    image: "src/components/images/image001.png",
    quantity: 200,
  },
];

const PayPage: React.FC = () => {
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const totalOrderAmount = products.reduce(
    (total, product) => total + product.price * product.quantity,
    0,
  );
  return (
    <div className={flexColumnCenterStyle()}>
      <img
        src={pay_image}
        alt="Payment"
        className="md:w-[7.5rem] md:h-[7.5rem] md:mb-[1.875rem] w-[5.5rem] h-[5.5rem] mb-[2.875rem]"
      />
      <p className="md:text-[40px] text-[30px] text-black">
        주문이 완료되었습니다.
      </p>

      <div className=" md:mt-[6.25rem] mt-[2.25rem] md:w-[44.8125rem] w-[30rem] transition-all d uration-300">
        <p className="text-[20px] mt-6 md:text-[28px] text-[#b0b0b0]">
          결제금액
        </p>
        <div>
          <span className="md:text-[40px] text-[30px] text-black font-semibold">
            {totalOrderAmount.toLocaleString()}
          </span>
          <span className="md:text-[40px] text-[30px] ml-1">원</span>
        </div>
      </div>

      <button
        onClick={handleModalOpen}
        className="w-[30rem] h-[4rem] md:w-[44.8125rem] md:h-[5.5625rem] mt-6 
        text-lg md:text-2xl font-bold text-white bg-[#FF0099] hover:bg-[#D60080]"
      >
        주문내역 상세보기
      </button>
      {modalOpen && <PayModal onClose={handleModalClose} />}

      <button
        onClick={() => {
          navigate("/");
        }}
        className="w-[30rem] h-[4rem] md:w-[44.8125rem] md:h-[5.5625rem] mt-6 
        text-lg md:text-2xl font-bold text-[#565656] bg-white hover:bg-[#EAEAEA] border-[0.7px] border-[#a6a6a6]"
      >
        메인으로 돌아가기
      </button>
    </div>
  );
};

export default PayPage;
