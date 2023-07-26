import { CgMathMinus, CgMathPlus } from "react-icons/cg";
import { AiFillCheckCircle, AiOutlineCheckCircle } from "react-icons/ai";
import { RiCloseLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import {
  deleteProduct,
  plusProduct,
  minusProduct,
  checkedProduct,
  unCheckedProduct,
} from "../../store/ProductSlice";

/* 결제 페이지 왼쪽 레이아웃 리스트 */

export default function LeftList() {
  const productList = useSelector((state: RootState) => {
    return state.buylist.products;
  });

  const total = useSelector((state: RootState) => {
    return state.buylist.productTotal;
  });

  console.log(productList);
  const dispatch = useDispatch();

  return (
    <div className="2xl:h-[39rem] h-[31rem] overflow-y-auto scrollbar-hide">
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
                      color: item.quantity === 1 ? "#D0D0D0" : "inherit",
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
                  {(item.product_price * item.quantity).toLocaleString()}원
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
  );
}
