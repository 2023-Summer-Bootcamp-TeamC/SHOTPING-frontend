import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { totalProductPrice } from "../../store/ProductSlice";
import axios from "axios";

/* 결제 페이지 오른쪽 레이아웃 결제 버튼 */

export default function BuyButton() {
  const productList = useSelector((state: RootState) => {
    return state.buylist.products;
  });

  const total = useSelector((state: RootState) => {
    return state.buylist.productTotal;
  });

  useEffect(() => {
    dispatch(
      totalProductPrice(
        productList
          .map((item) => item.product_price * item.quantity)
          .reduce((acc, price) => acc + price, 0),
      ),
    );
  }, [productList]);

  const dispatch = useDispatch();

  const handleKakaoPay = async () => {
    try {
      const paymentData = {
        total_amount: total,
      };
      const response = await axios.post("/api/v1/payment", paymentData);
      if (response.data && response.data.next_redirect_pc_url) {
        const nextUrl = response.data.next_redirect_pc_url;
        window.open(nextUrl, "_parent");
      } else {
        console.error("카카오 API 응답 오류:", response.data);
      }
    } catch (error) {
      console.error("카카오 API 결제 요청 오류:", error);
    }
  };

  const handlePayButtonClick = () => {
    if (productList.length === 0) {
      alert("상품을 담은 후에 시도해주세요.");
    } else {
      handleKakaoPay();
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
