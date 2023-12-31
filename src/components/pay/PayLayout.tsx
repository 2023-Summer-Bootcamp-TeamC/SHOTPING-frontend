import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store/store";
import { persistor } from "../../index";
import PayModal from "../../components/pay/PayModal";
import axios from "axios";
import Lottie from "lottie-react";
import lottie from "../../assets/lottie/CircleCheck.json";
import { deleteUnSelectProduct } from "../../store/ProductSlice";
/* 
  결제 성공 레이아웃
  모달을 통해 결제 내역 확인 및 메인으로 돌아가기 
*/

const flexColumnCenterStyle = () => {
  return "flex flex-col items-center justify-center h-full";
};

export default function PayLayout() {
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);

  const dispatch = useDispatch();

  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const productList = useSelector((state: RootState) => {
    return state.buylist.products;
  });

  const modifiedProductList = productList
    .filter((product) => product.selected === true)
    .map((product) => ({
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
      await axios.post(`/api/v1/order`, {
        data: modifiedProductList,
      });
      await dispatch(deleteUnSelectProduct(productList));
    } catch (error) {
      console.error("재고 업데이트 에러:", error);
    }
  };

  useEffect(() => {
    updateBuyAndStock();
  }, []);

  return (
    <div className={flexColumnCenterStyle()}>
      <div className="md:w-[17.5rem] md:h-[17.5rem]  w-[11.5.5rem] h-[11.5rem] ">
        <Lottie animationData={lottie} />
      </div>
      <p className="md:text-[2.5rem] text-[1.875rem] text-black">
        주문이 완료되었습니다.
      </p>

      <div className=" md:mt-[6.25rem] mt-[2.25rem] md:w-[44.8125rem] w-[30rem] transition-all duration-700">
        <p className="text-[1.25rem] mt-[1.5rem] md:text-[1.75rem] text-[#b0b0b0]">
          결제금액
        </p>
        <div>
          <span className="md:text-[2.5rem] text-[1.875rem] text-black font-semibold">
            {total.toLocaleString()}
          </span>
          <span className="md:text-[2.5rem] text-[1.875rem] ml-[0.25rem]">
            원
          </span>
        </div>
      </div>

      <button
        onClick={handleModalOpen}
        className="w-[30rem] h-[4rem] md:w-[44.8125rem] md:h-[5.5625rem] mt-[1.5rem] 
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
        className="w-[30rem] h-[4rem] md:w-[44.8125rem] md:h-[5.5625rem] mt-[1.5rem] 
        text-lg md:text-2xl font-bold text-[#565656] bg-white hover:bg-[#EAEAEA] border-[0.04375rem] border-[#a6a6a6]"
      >
        메인으로 돌아가기
      </button>
    </div>
  );
}
