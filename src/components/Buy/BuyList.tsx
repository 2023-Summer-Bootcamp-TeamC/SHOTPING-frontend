import React, { useState, useEffect } from "react";
import { CgMathMinus, CgMathPlus } from "react-icons/cg";
import { AiFillCheckCircle, AiOutlineCheckCircle } from "react-icons/ai";
import { RiCloseLine } from "react-icons/ri";
import BuyModal from "./BuyModal";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import {
  deleteProduct,
  deleteSelectProduct,
  plusProduct,
  minusProduct,
  checkedProduct,
  unCheckedProduct,
  checkWholeProduct,
  unCheckWholeProduct,
  totalProductPrice,
} from "../../store/productSlice";
import axios from "axios";

/* 결제 페이지 리스트 */

export interface BuyProduct {
  id: number;
  product_name: string;
  product_price: number;
  image_url: string;
  quantity: number;
  selected: boolean;
}

export default function BuyList() {
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

  const isAllSelected = productList.every((product) => product.selected);
  const isAnySelected = productList.some((product) => product.selected);

  const handleSelectAllItems = () => {
    dispatch(checkWholeProduct(productList));
  };

  const handleUnSelectAllItems = () => {
    dispatch(unCheckWholeProduct(productList));
  };

  const handleDeleteSelectedItems = () => {
    dispatch(deleteSelectProduct(productList));
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center h-full overflow-y-auto scrollbar-hide">
        {/* 전체 감싸는 부분 */}
        <div className="flex 2xl:flex-row flex-col  w-[85%] h-[90%] ">
          {/* 왼쪽 감싸는 부분- 탭, 리스트 */}
          <div className="flex flex-col 2xl:w-[75%] w-[100%] 2xl:h-[100%] h-[80%]">
            {/* 왼쪽- 탭 */}
            <div className="flex flex-row justify-between mt-10 items-center  2xl:h-[6%] h-[8%] ">
              <div className="flex flex-row items-center">
                {productList.length === 0 ? (
                  <AiOutlineCheckCircle size="30" color="#BDBDBD" />
                ) : (
                  <>
                    {isAllSelected ? (
                      <AiFillCheckCircle
                        onClick={handleUnSelectAllItems}
                        size="30"
                        color="#FF0099"
                      />
                    ) : (
                      <AiOutlineCheckCircle
                        onClick={handleSelectAllItems}
                        size="30"
                        color="#BDBDBD"
                      />
                    )}
                  </>
                )}

                <h3 className="font-semibold text-[1rem] text-gray-600  mx-4">
                  전체선택 (
                  {productList.filter((product) => product.selected).length}/
                  {productList.length})
                </h3>
                <div className="border h-5 border-l-[#A5A5A5] " />
                <button
                  className="font-semibold text-[1rem] ml-2 text-gray-600 w-[5rem] "
                  onClick={handleDeleteSelectedItems}
                  disabled={!isAnySelected}
                >
                  선택삭제
                </button>
              </div>
              <button
                className="bg-[FF0099] hover:bg-[D60080] text-white text-[1rem] font-medium  w-[6rem] h-[2rem] flex items-center justify-center"
                onClick={handleModalOpen}
              >
                추가하기
              </button>
              {modalOpen && <BuyModal onClose={handleModalClose} />}
            </div>
            <hr className="border-[#BDBDBD]" />
            {/* 리스트 */}
            <div className=" h-[76%] overflow-y-auto scrollbar-hide">
              {productList.length === 0 ? (
                <span className="flex items-center justify-center h-[100%] text-gray-400 text-[1.25rem]">
                  담긴 상품이 없습니다.
                </span>
              ) : (
                productList.map((item, index) => (
                  <div key={item.id}>
                    <div className="flex my-4">
                      <div className="flex w-[70%]">
                        <div>
                          {item.selected ? (
                            <AiFillCheckCircle
                              size="1.875rem"
                              color="#FF0099 "
                              className="mt-12 mr-5"
                              onClick={() => {
                                dispatch(unCheckedProduct(item.id));
                              }}
                            />
                          ) : (
                            <AiOutlineCheckCircle
                              size="1.875rem"
                              color="#BDBDBD "
                              className="mt-12 mr-5"
                              onClick={() => {
                                dispatch(checkedProduct(item.id));
                              }}
                            />
                          )}
                        </div>

                        <img
                          className="2xl:w-[6.25rem] 2xl:h-[7.8125rem] w-[4.25rem] h-[5.8125rem] mr-5"
                          src={item.image_url}
                          alt="이미지"
                        />
                        <span className="2xl:text-[1.0625rem] text-[0.9rem] flex items-center font-semibold w-[40rem] mr-4">
                          {item.product_name}
                        </span>
                      </div>
                      <div className="flex md:flex-row items-end justify-end w-[30%] ">
                        <div className="flex justify-center items-center xl:w-[6.5rem] w-[5rem] border rounded-[0.3125rem]">
                          <CgMathMinus
                            className="mx-3 xl:text-[1rem] text-[0.7rem]"
                            style={{
                              color:
                                item.quantity === 1 ? "#D0D0D0" : "inherit",
                            }}
                            onClick={() => dispatch(minusProduct(item.id))}
                          />

                          <input
                            className="text-center xl:w-[2rem] w-[1rem] xl:text-[1rem] text-[0.7rem] font-medium"
                            value={item.quantity}
                          />

                          <CgMathPlus
                            className="mx-3 md:text-[1rem] text-[0.7rem]"
                            onClick={() => dispatch(plusProduct(item.id))}
                          />
                        </div>
                        <span className="text-right md:w-[10rem] w-[12rem] font-bold xl:text-[1.25rem] text-[1rem] ">
                          {(
                            item.product_price * item.quantity
                          ).toLocaleString()}
                          원
                        </span>
                        <div>
                          <RiCloseLine
                            className="xl:w-[5rem] w-[2rem] md:text-[1.5625rem] text-[1rem] text-[#A4A4A4]"
                            onClick={() => dispatch(deleteProduct(item.id))}
                          />
                        </div>
                      </div>
                    </div>

                    {index !== productList.length - 1 && (
                      <hr className="border-t-[#D9D9D9]" />
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
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
        </div>
      </div>
    </>
  );
}
