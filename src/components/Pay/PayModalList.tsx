import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

/* PayModal 내부 리스트 */

export default function PayModalList() {
  const productList = useSelector((state: RootState) => {
    return state.buylist.products;
  });

  const total = useSelector((state: RootState) => {
    return state.buylist.productTotal;
  });

  return (
    <div className="border border-gray-300  h-[34.375rem] rounded-[2.5rem]  ">
      <div className=" flex items-center border border-b-gray-300  h-[3.5625rem] rounded-t-[2.4375rem]">
        <span className="text-lg font-semibold flex items-center justify-center  w-[22.5rem]">
          상품명
        </span>
        <span className="text-lg font-semibold flex items-center justify-center w-[90px]">
          수량
        </span>
        <span className=" text-lg font-semibold flex items-center justify-center w-[150px]">
          가격
        </span>
      </div>
      <div>
        <div className=" h-[25.625rem] overflow-y-auto scrollbar-hide">
          <div className="w-[100%]">
            {productList.map((item, index) => (
              <div key={item.id}>
                <div className="flex m-[0.3125rem] p-[0.53125rem] text-[0.8125rem]">
                  <img
                    src={item.image_url}
                    alt={item.product_name}
                    className="w-[3.75rem] h-[4.6875rem] overflow-hidden mr-[1.25rem]"
                  />
                  <div className="flex items-center">
                    <span className="w-[15.625rem] text-left mr-[2.25rem] text-base">
                      {item.product_name}
                    </span>
                    <span className=" w-[1.25rem] text-right mr-[3.5rem] text-base">
                      {item.quantity}
                    </span>
                    <span className="w-[5.625rem] text-right text-base ">
                      {(item.product_price * item.quantity).toLocaleString()}원
                    </span>
                  </div>
                </div>
                <hr className="mx-[0.625rem] my-[0.125rem] border-t-1 border-solid border-gray-300" />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="text-lg font-semibold flex items-center justify-center  border border-t-gray-300  h-[5.125rem] rounded-b-[2.4375rem] bg-[EDEDED]">
        총 주문 금액
        <span className="font-bold text-lg ml-[0.75rem] tracking-wide">
          {total.toLocaleString()}원
        </span>
      </div>
    </div>
  );
}
