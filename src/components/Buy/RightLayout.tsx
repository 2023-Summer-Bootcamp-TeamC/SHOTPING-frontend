import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { totalProductPrice } from "../../store/productSlice";
import axios from "axios";

/* 결제 페이지 오른쪽 - 결제 금액 및 결제 버튼 레이아웃 */

export interface BuyProduct {
  id: number;
  product_name: string;
  product_price: number;
  image_url: string;
  quantity: number;
  selected: boolean;
}

export default function RightLayout() {
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
    <>
      {/* 오른쪽 총 감싸는 부분 - 상품 금액, 총 결제금액, 결제하기 버튼 */}
      <div className="flex flex-col 2xl:mt-[90px] mt-[0px] 2xl:ml-10  w-[100%] 2xl:w-[25%] 2xl:h-[80%] h-[20%] ">
        {/* 상품금액, 총결제금액 부분 */}
        <div className="mb-5 2xl:h-[80%] h-[60%]  ">
          <div className="flex justify-between p-5 border 2xl:h-[85%] h-[62%]  border-x-[#D0D0D0] border-t-[#D0D0D0] font-semibold text-[1.125rem]">
            <span className="2xl:mt-3">상품금액</span>
            <span className="2xl:mt-3">{total.toLocaleString()}원</span>
          </div>
          <div className="flex justify-between items-center border 2xl:h-[15%] h-[38%] p-5 border-x-[#D0D0D0] border-b-[#D0D0D0] bg-[#F9F9F9] font-semibold text-[1.125rem]">
            <span className="mt-1">총 결제금액</span>
            <span className="mt-1">{total.toLocaleString()}원</span>
          </div>
        </div>
        {/* 결제하기버튼 */}
        <button
          className="bg-[FF0099] font-semibold text-[1.25rem] hover:bg-[D60080] text-white  2xl:h-[10%] h-[30%] "
          onClick={handlePayButtonClick}
        >
          결제하기
        </button>
      </div>
    </>
  );
}
