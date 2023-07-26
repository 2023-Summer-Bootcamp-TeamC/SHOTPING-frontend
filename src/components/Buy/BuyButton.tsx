import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";

import axios from "axios";
import { useNavigate } from "react-router-dom";

/* 결제 페이지 오른쪽 레이아웃 결제 버튼 */

export default function BuyButton() {
  const productList = useSelector((state: RootState) => {
    return state.buylist.products;
  });

  const total = useSelector((state: RootState) => {
    return state.buylist.productTotal;
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleKakaoPay = async () => {
    try {
      const paymentData = {
        total_amount: total,
      };
      const response = await axios.post("/api/v1/payment", paymentData);
      if (response.data && response.data.next_redirect_pc_url) {
        const nextUrl = response.data.next_redirect_pc_url;
        navigate("/nowpaying");
        window.location.replace(nextUrl);
      } else {
        console.error("카카오 API 응답 오류:", response.data);
      }
    } catch (error) {
      console.error("카카오 API 결제 요청 오류:", error);
    }
  };

  const handlePayButtonClick = async () => {
    if (productList.length === 0) {
      alert("상품을 담은 후에 시도해주세요.");
    } else {
      const allUnselected = productList.every((item) => !item.selected);

      if (allUnselected) {
        alert("선택된 상품이 없습니다.");
      } else {
        await handleKakaoPay();
      }
    }
  };

  return (
    <button
      className="bg-[FF0099] font-semibold text-[1.25rem] hover:bg-[D60080] text-white  2xl:h-[10%] h-[30%] "
      onClick={handlePayButtonClick}
    >
      결제하기
    </button>
  );
}
