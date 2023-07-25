import { Dispatch, SetStateAction, useState } from "react";
import { useDispatch } from "react-redux";
import { addProduct } from "../../store/productSlice";

interface ModalProps {
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
  addToCart: () => void;
  setIsAddedToCart: Dispatch<SetStateAction<boolean>>;
  openScroll: () => void;
  id: number;
  productName: string;
  price: number;
  stock: number;
  image: string;
}

export default function Modal({
  setIsModalOpen,
  addToCart,
  setIsAddedToCart,
  openScroll,
  productName,
  price,
  id,
  image,
}: ModalProps) {
  const [count, setCount] = useState(1);
  const dispatch = useDispatch();

  const decreaseCount = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  const increaseCount = () => {
    setCount(count + 1);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIsAddedToCart(false);
    openScroll();
  };

  const addCart = () => {
    dispatch(
      addProduct({
        id: id,
        image_url: image,
        product_name: productName,
        product_price: price,
        quantity: count,
        selected: false,
      }),
    );
    addToCart();
  };

  return (
    <div
      className="modal flex justify-center items-center absolute z-50 w-full min-h-screen top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50"
      style={{ cursor: "default" }}
    >
      <div
        className="modalContent w-[30rem] h-[25rem] bg-white rounded-3xl pt-7 pl-7"
        title={productName}
      >
        <div>
          <div className="productName w-[17rem] h-[6.5rem] text-left text-3xl">
            {productName}
          </div>
          <br />
          <div className="flex w-[5.5rem] h-[2rem] border rounded text-right ml-auto mr-12 mt-4">
            <div className="minus pl-[1.1rem]" onClick={decreaseCount}>
              <button className="text-xl">-</button>
            </div>
            <div className="number pl-3 pr-3 text-lg">{count}</div>
            <div className="plus" onClick={increaseCount}>
              <button className="text-xl">+</button>
            </div>
          </div>
          <div className="price w-full text-right text-3xl pt-[1.5rem] pr-12 pb-[3.3rem]">
            <b>{(price * count).toLocaleString()} 원</b>
          </div>
          <div className="flex w-[26.5rem] h-[3.5rem] text-center justify-center">
            <button
              className="w-[18rem] border border-slate-600 rounded text-center text-xl hover:bg-[#EAEAEA] pt-1.5 pb-1.5 mr-2"
              onClick={closeModal}
            >
              취소
            </button>
            <button
              className="w-[18rem] border rounded text-center text-xl bg-[#ff0099] hover:bg-[#D60080] pt-1.7 pb-1.7 text-white"
              onClick={addCart}
            >
              장바구니 담기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
