import { useState, useEffect } from "react";
import { AiFillCheckCircle, AiOutlineCheckCircle } from "react-icons/ai";
import BuyModal from "./BuyModal";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import {
  deleteSelectProduct,
  checkWholeProduct,
  unCheckWholeProduct,
  totalProductPrice,
} from "../../store/ProductSlice";

/* 결제 페이지 왼쪽 레이아웃 탭 */

export default function LeftTab() {
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
      <div>
        <div className="flex flex-row justify-between mt-[2.5rem] items-center 2xl:h-[6%] h-[8%] ">
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

            <h3 className="font-semibold text-[1rem] text-gray-600  mx-[1rem]">
              전체선택 (
              {productList.filter((product) => product.selected).length}/
              {productList.length})
            </h3>
            <div className="border h-[1.25rem] border-l-[#A5A5A5] " />
            <button
              className="font-semibold text-[1rem] ml-[0.5rem
              ] text-gray-600 w-[5rem] "
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
      </div>
      <hr className="border-[#BDBDBD]  " />
    </>
  );
}
