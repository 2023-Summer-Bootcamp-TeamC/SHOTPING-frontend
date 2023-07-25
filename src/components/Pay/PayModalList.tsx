import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

export default function PayModalList() {
  const productList = useSelector((state: RootState) => {
    return state.buylist.products;
  });

  const total = useSelector((state: RootState) => {
    return state.buylist.productTotal;
  });

  return (
    <div className="border border-gray-300  h-[550px] rounded-[40px]  ">
      <div className=" flex items-center border border-b-gray-300  h-[57px] rounded-t-[39px]">
        <span className="text-lg font-semibold flex items-center justify-center  w-[360px]">
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
        <div className=" h-[410px] overflow-y-auto scrollbar-hide">
          <div className="w-[100%]">
            {productList.map((item, index) => (
              <div key={item.id}>
                <div className="flex m-[5px] p-[8.5px] text-[13px]">
                  <img
                    src={item.image_url}
                    alt={item.product_name}
                    className="w-[60px] h-[75px] overflow-hidden mr-[20px]"
                  />
                  <div className="flex items-center">
                    <span className="w-[250px] text-left mr-9 text-base">
                      {item.product_name}
                    </span>
                    <span className=" w-[20px] text-right mr-14 text-base">
                      {item.quantity}
                    </span>
                    <span className="w-[90px] text-right text-base ">
                      {(item.product_price * item.quantity).toLocaleString()}원
                    </span>
                  </div>
                </div>
                <hr className="mx-[10px] my-[2px] border-t-1 border-solid border-gray-300" />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="text-lg font-semibold flex items-center justify-center  border border-t-gray-300  h-[82px] rounded-b-[39px] bg-[EDEDED]">
        총 주문 금액
        <span className="font-bold text-lg ml-3 tracking-wide">
          {total.toLocaleString()}원
        </span>
      </div>
    </div>
  );
}
