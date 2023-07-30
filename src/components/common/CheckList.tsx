import { useEffect } from "react";
import { motion } from "framer-motion";
import { IoClose } from "react-icons/io5";
import { CgMathMinus, CgMathPlus } from "react-icons/cg";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import {
  deleteProduct,
  plusProduct,
  minusProduct,
  totalProductPrice,
} from "../../store/ProductSlice";

interface CheckListProps {
  onClose: any;
  isOpen: boolean;
}

export default function CheckList({ onClose, isOpen }: CheckListProps) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const productList = useSelector((state: RootState) => {
    return state.buylist.products;
  });

  const total = useSelector((state: RootState) => {
    return state.buylist.productTotal;
  });

  const modifiedProductList = productList.filter(
    (product) => product.selected === true,
  );

  useEffect(() => {
    dispatch(
      totalProductPrice(
        productList
          .map((item) => item.product_price * item.quantity)
          .reduce((acc, price) => acc + price, 0),
      ),
    );
  }, [productList]);

  return (
    <motion.div
      className="flex justify-end items-center fixed z-50 w-full h-full top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.7 }}
    >
      <motion.div
        className="absolute right-0 xl:w-[40rem] h-full w-[40rem] transition-all duration-700
        -translate-y-1/2 rounded-l-[1.4rem] bg-white p-10"
        initial={{ opacity: 0, x: "100%" }}
        animate={{ opacity: 1, x: 0 }}
        transition={{
          type: "tween",
          duration: 0.1,
        }}
      >
        <div className="flex flex-col">
          <div className="flex flex-row items-center text-center align-middle">
            <h2 className="text-4xl font-semibold text-left ml-5 transition-all duration-700">
              what's in your cart
            </h2>
            <motion.button
              className="ml-[12.4rem] mt-[0.5rem]"
              onClick={onClose}
            >
              <IoClose className="text-[2.3rem]" />
            </motion.button>
          </div>
          <hr className="border-t-black mt-[1.5rem] mb-[1rem]" />
        </div>
        <div className="flex flex-col h-[38rem] overflow-y-auto scrollbar-hide">
          {modifiedProductList.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-[100%] text-gray-400 text-[1.25rem]">
              <span>상품이 없습니다.</span>
              <span>상품을 추가해 보세요!</span>
            </div>
          ) : (
            modifiedProductList.map((item, index) => (
              <div className="flex flex-col">
                <div className="flex flex-row  w-full mt-[1rem] h-[7rem]">
                  <img
                    className="w-[6rem] h-full"
                    src={item.image_url}
                    alt="flight"
                  ></img>
                  <div>
                    <p className=" text-xl w-[25rem] h-[4rem] ml-[1.5rem]">
                      {item.product_name}
                    </p>
                    <div className="flex flex-row ml-[1.5rem] items-center">
                      <div className="flex flex-row border rounded-md w-[6rem] h-[1.8rem] mt-[1rem] items-center justify-center ">
                        <CgMathMinus
                          className="ml-[0.5rem]"
                          style={{
                            color: item.quantity === 1 ? "#D0D0D0" : "inherit",
                          }}
                          onClick={() => dispatch(minusProduct(item.id))}
                        />
                        <span className="w-[1rem] ml-[1rem] mr-[1rem] text-center">
                          {item.quantity}
                        </span>
                        <CgMathPlus
                          className="mr-[0.5rem]"
                          onClick={() => dispatch(plusProduct(item.id))}
                        />
                      </div>
                      <div className="mt-[1rem] text-lg text-right items-end justify-end ml-auto mr-[2.3rem]">
                        {(item.product_price * item.quantity).toLocaleString()}
                        원
                      </div>
                    </div>
                  </div>
                  <motion.button className="mb-auto ml-auto mr-[0.3rem]">
                    <IoClose
                      className="text-[2.3rem] text-[#b9b9b9]"
                      onClick={() => dispatch(deleteProduct(item.id))}
                    />
                  </motion.button>
                </div>

                <hr className="border-t-gray mt-[2rem]" />
              </div>
            ))
          )}
        </div>
        <hr className="border-t-black mt-[1rem]" />
        <div className="flex flex-row mt-[1.3rem] mb-[1.5rem]">
          <span className="text-2xl font-semibold ml-[1rem]">
            최종 결제 금액
          </span>
          <span className="text-2xl font-semibold ml-auto mr-[1rem]">
            {total.toLocaleString()}원
          </span>
        </div>
        <button
          className="w-[35rem] h-[4rem] bg-[#ff0099] hover:bg-[#D60080] text-white text-[1.5rem] font-semibold"
          onClick={() => {
            onClose();
            navigate("/buy");
          }}
        >
          구매하기
        </button>
      </motion.div>
    </motion.div>
  );
}
