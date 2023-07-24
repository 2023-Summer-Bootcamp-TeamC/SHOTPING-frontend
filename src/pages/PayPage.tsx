import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import pay_image from "../components/images/pay_image.png";
import PayModal from "../components/Pay/PayModal";
import axios from "axios";

const flexColumnCenterStyle = () => {
  return "flex flex-col items-center justify-center h-full";
};
interface Product {
  product_id: number;
  product_buy: number;
  product_stock: number;
}

const products: Product[] = [
  {
    product_id: 1,
    product_buy: 100,
    product_stock: 100,
  },
  {
    product_id: 2,
    product_buy: 100,
    product_stock: 100,
  },
  {
    product_id: 3,
    product_buy: 100,
    product_stock: 100,
  },
  {
    product_id: 4,
    product_buy: 100,
    product_stock: 100,
  },
  {
    product_id: 5,
    product_buy: 100,
    product_stock: 100,
  },
  {
    product_id: 6,
    product_buy: 100,
    product_stock: 100,
  },
  {
    product_id: 7,
    product_buy: 100,
    product_stock: 100,
  },
  {
    product_id: 8,
    product_buy: 100,
    product_stock: 100,
  },
];

const PayPage: React.FC = () => {
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  // const [selectedProducts, setSelectedProducts] = useState<Product[]>(products);
  const [product_id, setProductproduct_id] = useState<number>(1); // 실제 상품 product_id로 변경하세요
  const [quantity, setQuantity] = useState<number>(0);
  const [remainingStock, setRemainingStock] = useState<number>(0);

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  /*const totalOrderAmount = products.reduce(
    (total, product) => total + product.price * product.product_buy,
    0,
  );*/
  console.log(products);
  // API 호출하여 구매 및 재고 값을 업데이트합니다.
  const updateBuyAndStock = async () => {
    try {
      // 상품 재고를 서버로 업데이트하기 위한 POST 요청
      await axios
        .post(`/api/v1/order`, {
          data: products,
        })
        .then((response) => {
          console.log("상품 재고 업데이트 성공:", response.data);
          // 업데이트된 재고를 로컬 상태로 업데이트합니다
        })
        .catch((error) => {
          console.error("상품 재고 업데이트 에러:", error);
        });
    } catch (error) {
      console.error("재고 업데이트 에러:", error);
    }
  };

  // 컴포넌트가 마운트될 때 API 호출을 수행합니다.
  updateBuyAndStock(); // 빈 종속성 배열은 컴포넌트가 마운트될 때 한 번만 API 호출되도록 합니다.

  return (
    <div className={flexColumnCenterStyle()}>
      <div>
        {/* 결제 완료 페이지 내용 */}
        <p>상품: {product_id}</p>
        <p>수량: {quantity}</p>
        <p>남은 재고: {remainingStock}</p>

        {/* 결제 완료 버튼 */}
        <button onClick={updateBuyAndStock}>결제 완료</button>
      </div>
      <img
        src={pay_image}
        alt="Payment"
        className="md:w-[7.5rem] md:h-[7.5rem] md:mb-[1.875rem] w-[5.5rem] h-[5.5rem] mb-[2.875rem]"
      />
      <p className="md:text-[40px] text-[30px] text-black">
        주문이 완료되었습니다.
      </p>

      <div className=" md:mt-[6.25rem] mt-[2.25rem] md:w-[44.8125rem] w-[30rem] transition-all duration-300">
        <p className="text-[20px] mt-6 md:text-[28px] text-[#b0b0b0]">
          결제금액
        </p>
        <div>
          <span className="md:text-[40px] text-[30px] text-black font-semibold">
            {/* {totalOrderAmount.toLocaleString()} */}
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
