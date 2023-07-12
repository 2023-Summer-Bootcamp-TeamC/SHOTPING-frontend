import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import the useHistory hook from React Router
import PayButton from "../components/Pay/PayButton";
import PayText from "../components/Pay/PayText";
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
  const navigate = useNavigate(); // Get the history object from React Router
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
        style={{
          width: "7.5rem",
          height: "7.5rem",
          marginBottom: "1.875rem",
        }}
      />
      <PayText name="주문이 완료되었습니다." />

      <div
        style={{
          marginTop: "6.25rem",
          marginBottom: "0.625rem",
          width: "44.8125rem",
        }}
      >
        <p className="text-[28px] mt-6 text-[#b0b0b0]">결제금액</p>
        <div>
          <span className="text-[40px]  text-black font-semibold">
            {totalOrderAmount.toLocaleString()}
          </span>
          <span className="text-[40px] ml-1">원</span>
        </div>
      </div>

      <PayButton
        variant="continue"
        name="주문내역 상세보기"
        onClick={handleModalOpen}
      />
      {modalOpen && <PayModal onClose={handleModalClose} />}
      <PayButton
        variant="detail"
        name="메인으로 돌아가기"
        onClick={() => {
          navigate("/");
        }}
      />
    </div>
  );
};

export default PayPage;
