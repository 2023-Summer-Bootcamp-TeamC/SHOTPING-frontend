import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { persistor } from "../index";
import PayModal from "../components/pay/PayModal";
import axios from "axios";
import Lottie from "lottie-react";
import lottie from "../assets/lottie/CircleCheck.json";

/* 결제 성공 페이지 */

const flexColumnCenterStyle = () => {
  return "flex flex-col items-center justify-center h-full";
};

export default function PayPage() {
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

  const modifiedProductList = productList.map((product) => ({
    product_id: product.id,
    product_buy: product.quantity,
    product_stock: product.quantity,
  }));

  const total = useSelector((state: RootState) => {
    return state.buylist.productTotal;
  });

  const purge = async () => {
    await persistor.purge();
  };

  const updateBuyAndStock = async () => {
    try {
      const response = await axios.post(`/api/v1/order`, {
        data: modifiedProductList,
      });
    } catch (error) {
      console.error("재고 업데이트 에러:", error);
    }
  };

  updateBuyAndStock();

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
}
