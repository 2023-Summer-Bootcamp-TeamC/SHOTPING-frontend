import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { persistor } from "../index";
import pay_image from "../components/images/pay_image.png";
import PayModal from "../components/Pay/PayModal";

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
