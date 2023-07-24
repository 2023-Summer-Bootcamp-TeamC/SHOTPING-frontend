import React, { useState } from "react";
import { CgMathMinus, CgMathPlus } from "react-icons/cg";
import { AiFillCheckCircle, AiOutlineCheckCircle } from "react-icons/ai";
import { RiCloseLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
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
} from "../../store/productSlice";

export interface BuyProduct {
  id: number;
  product_name: string;
  product_price: number;
  image_url: string;
  quantity: number;
  selected: boolean;
}

const BuyList: React.FC = () => {
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

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handlePayButtonClick = () => {
    if (productList.length === 0) {
      alert("상품을 담은 후에 시도해주세요.");
    } else {
      navigate("/pay");
    }
  };

  // const [productList, setProductList] = useState<Product[]>(products);

  // Check if all items are selected
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
    <div className="flex flex-col items-center justify-center h-full">
      {/* 전체 감싸는 부분 */}
      <div className="flex flex-row justify-center w-[85%]">
        {/* 왼쪽- 탭, 리스트 */}
        <div className="flex flex-col w-[75rem] h-[50rem]">
          {/* 왼쪽- 탭 */}
          <div className="flex flex-row justify-between mt-10 items-center  h-[3rem]">
            <div className="flex flex-row items-center">
              {productList.length === 0 ? (
                <AiOutlineCheckCircle size="30" color="#BDBDBD" />
              ) : (
                <>
                  {isAllSelected ? (
                    <AiFillCheckCircle
                      onClick={handleSelectAllItems}
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

              <h3 className="font-semibold text-[16px] text-gray-600 w-[7rem] mx-2">
                전체선택 (
                {productList.filter((product) => product.selected).length}/
                {productList.length})
              </h3>
              <div className="border h-5 border-l-[#A5A5A5] " />
              <button
                className="font-semibold text-[16px] ml-2 text-gray-600 w-[5rem] "
                onClick={handleDeleteSelectedItems}
                disabled={!isAnySelected}
              >
                선택삭제
              </button>
            </div>
            <button
              className="bg-[FF0099] hover:bg-[D60080] text-white text-[16px] font-medium  w-[6rem] h-[2rem] flex items-center justify-center"
              onClick={handleModalOpen}
            >
              추가하기
            </button>
            {modalOpen && <BuyModal onClose={handleModalClose} />}
          </div>
          <hr className="border-[#BDBDBD]" />
          {/* 리스트 */}
          <div className="h-[39.5rem] overflow-y-auto scrollbar-hide">
            {productList.length === 0 ? (
              <div className="flex items-center justify-center h-[40rem]">
                <span className="text-gray-400 text-xl">
                  담긴 상품이 없습니다.
                </span>
              </div>
            ) : (
              productList.map((item, index) => (
                <div key={item.id}>
                  <div className="flex my-4">
                    <div className="flex w-[60rem]">
                      {item.selected ? (
                        <AiFillCheckCircle
                          size="30"
                          color="#FF0099 "
                          className="mt-12 mr-5"
                          onClick={() => {
                            dispatch(unCheckedProduct(item.id));
                          }}
                        />
                      ) : (
                        <AiOutlineCheckCircle
                          size="30"
                          color="#BDBDBD "
                          className="mt-12 mr-5"
                          onClick={() => {
                            dispatch(checkedProduct(item.id));
                          }}
                        />
                      )}
                      <img
                        className="w-[100px] h-[125px] mr-5"
                        src={item.image_url}
                        alt="이미지"
                      />
                      <span className="text-[17px] flex items-center font-semibold w-[40rem] mr-4">
                        {item.product_name}
                      </span>
                    </div>
                    <div className="flex items-end justify-end w-[30rem] ">
                      <div className="flex justify-center items-center w-[7rem] border rounded-[5px]">
                        <CgMathMinus
                          size="17px"
                          className="mx-3"
                          style={{
                            color: item.quantity === 1 ? "#D0D0D0" : "inherit",
                          }} // 이 부분이 색상을 제어하는 부분입니다.
                          onClick={() => dispatch(minusProduct(item.id))}
                        />

                        <input
                          className="text-center w-8 text-[17px] font-medium"
                          value={item.quantity}
                          readOnly
                        />

                        <CgMathPlus
                          size="17px"
                          className="mx-3"
                          onClick={() => dispatch(plusProduct(item.id))}
                        />
                      </div>
                      <span className="text-right w-[10rem] font-bold text-[20px] mr-10">
                        {(item.product_price * item.quantity).toLocaleString()}
                        원
                      </span>
                      <RiCloseLine
                        className="mr-10"
                        size="25px"
                        color="#A4A4A4"
                        onClick={() => dispatch(deleteProduct(item.id))}
                      />
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
        <div className="flex flex-col mt-[90px] ml-10 w-[23rem]">
          {/* 상품금액, 총결제금액 부분 */}
          <div className="h-[31rem]">
            <div className="flex justify-between p-5 border h-[25rem]  border-x-[#D0D0D0] border-t-[#D0D0D0] font-semibold text-[18px]">
              <span className="mt-3">상품금액</span>
              <span className="mt-3">{total.toLocaleString()}원</span>
            </div>
            <div className="flex justify-between border h-[5rem] p-5 border-x-[#D0D0D0] border-b-[#D0D0D0] bg-[#F9F9F9] font-semibold text-[18px]">
              <span className="mt-1">총 결제금액</span>
              <span className="mt-1">{total.toLocaleString()}원</span>
            </div>
          </div>
          {/* 결제하기버튼 */}
          <button
            className="bg-[FF0099] font-semibold text-[20px] hover:bg-[D60080] text-white h-[4rem]"
            onClick={handlePayButtonClick}
          >
            결제하기
          </button>
        </div>
      </div>
    </div>
  );
};
export default BuyList;
