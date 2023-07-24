import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { persistor } from "../index";
import pay_image from "../components/images/pay_image.png";
import PayModal from "../components/Pay/PayModal";
import axios from "axios";
import Lottie from "lottie-react";
import lottie from "../assets/lottie/CircleCheck.json";

const flexColumnCenterStyle = () => {
  return "flex flex-col items-center justify-center h-full";
};

const PayPage: React.FC = () => {
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const productList = useSelector((state: RootState) => {
    return state.buylist.products;
  });

  //상품 결제 API에 사용할 데이터
  const modifiedProductList = productList.map((product) => ({
    product_id: product.id,
    product_buy: product.quantity,
    product_stock: product.quantity,
  }));

  console.log(modifiedProductList);

  const total = useSelector((state: RootState) => {
    return state.buylist.productTotal;
  });

  const purge = async () => {
    await persistor.purge();
  };

  console.log(modifiedProductList);
  // API 호출하여 구매 및 재고 값을 업데이트합니다.
  const updateBuyAndStock = async () => {
    try {
      // 상품 재고를 서버로 업데이트하기 위한 POST 요청
      await axios
        .post(`/api/v1/order`, {
          data: modifiedProductList,
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
      <div className="md:w-[17.5rem] md:h-[17.5rem]  w-[11.5.5rem] h-[11.5rem] ">
        <Lottie animationData={lottie} />
      </div>
      <p className="md:text-[40px] text-[30px] text-black">
        주문이 완료되었습니다.
      </p>

      <div className=" md:mt-[6.25rem] mt-[2.25rem] md:w-[44.8125rem] w-[30rem] transition-all duration-300">
        <p className="text-[20px] mt-6 md:text-[28px] text-[#b0b0b0]">
          결제금액
        </p>
        <div>
          <span className="md:text-[40px] text-[30px] text-black font-semibold">
            {total.toLocaleString()}
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
          purge();
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
