import { useSelector } from "react-redux";
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
    await handleKakaoPay();
  };
  const buttonStyles =
    productList.length === 0 || productList.every((item) => !item.selected)
      ? "bg-[#CCCCCC] font-semibold text-[1.25rem] cursor-not-allowed"
      : "bg-[#FF0099] font-semibold text-[1.25rem] hover:bg-[#D60080]";

  const buttonText =
    productList.length === 0
      ? "상품을 담아주세요"
      : productList.every((item) => !item.selected)
      ? "상품을 선택해주세요"
      : "결제하기";

  return (
    <button
      className={`2xl:h-[10%] h-[30%] text-white ${buttonStyles}`}
      onClick={
        productList.length !== 0 && !productList.every((item) => !item.selected)
          ? handlePayButtonClick
          : undefined
      }
      disabled={
        productList.length === 0 || productList.every((item) => !item.selected)
      }
      style={{
        cursor:
          productList.length === 0 ||
          productList.every((item) => !item.selected)
            ? "default"
            : "pointer",
      }}
    >
      {buttonText}
    </button>
  );
}
