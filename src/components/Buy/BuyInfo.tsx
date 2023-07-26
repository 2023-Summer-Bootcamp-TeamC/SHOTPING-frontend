import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { totalProductPrice } from "../../store/ProductSlice";

/* 결제 페이지 오른쪽 레이아웃 결제 정보 */

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

  return (
    <div className="mb-5 2xl:h-[80%] h-[60%] transition-all duration-700 ">
      <div className="flex justify-between p-5 border 2xl:h-[85%] h-[62%]  border-x-[#D0D0D0] border-t-[#D0D0D0] font-semibold text-[1.125rem] ">
        <span className="2xl:mt-3">상품금액</span>
        <span className="2xl:mt-3">{total.toLocaleString()}원</span>
      </div>
      <div className="flex justify-between items-center border 2xl:h-[15%] h-[38%] p-5 border-x-[#D0D0D0] border-b-[#D0D0D0] bg-[#F9F9F9] font-semibold text-[1.125rem]">
        <span className="mt-1">총 결제금액</span>
        <span className="mt-1">{total.toLocaleString()}원</span>
      </div>
    </div>
  );
}
