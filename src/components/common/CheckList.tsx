import { motion } from "framer-motion";
import { IoClose } from "react-icons/io5";
import { CgMathMinus, CgMathPlus } from "react-icons/cg";
import { useNavigate } from "react-router-dom";

interface CheckListProps {
  onClose: any;
  isOpen: boolean;
}

export default function CheckList({ onClose, isOpen }: CheckListProps) {
  const navigate = useNavigate();

  const variants = {
    open: { opacity: 1, x: 0 },
    closed: { opacity: 0, x: 0 },
  };

  return (
    <motion.div
      className="flex justify-end items-center fixed z-50 w-full h-full top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <motion.div
        className="absolute right-0 xl:w-[40rem] h-full w-[40rem] transition-all duration-700
        -translate-y-1/2 rounded-l-[1.4rem] bg-white p-10"
        animate={isOpen ? "open" : "closed"}
        variants={variants}
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
          <div className="flex flex-row  w-full mt-[1rem] h-[7rem]">
            <img
              className="w-[6rem] h-full"
              src="https://i.postimg.cc/Nfb5HTHH/image.png"
              alt="flight"
            ></img>
            <div>
              <p className=" text-xl w-[25rem] h-[4rem] ml-[1.5rem]">
                [탄단지] 단백질 닭가슴살 100g 단백질 파우더 프로틴
              </p>
              <div className="flex flex-row ml-[1.5rem] items-center">
                <div className="flex flex-row border rounded-md w-[6rem] h-[1.8rem] mr-[13rem] mt-[1rem] items-center justify-center ">
                  <CgMathMinus className="ml-[0.5rem]"></CgMathMinus>
                  <div className="ml-[1.3rem] mr-[1.3rem]">1</div>
                  <CgMathPlus className="mr-[0.5rem]"></CgMathPlus>
                </div>
                <div className="mt-[1rem] text-lg">100,000원</div>
              </div>
            </div>
            <motion.button className="mb-auto ml-auto">
              <IoClose className="text-[2.3rem] text-[#b9b9b9]" />
            </motion.button>
          </div>

          <hr className="border-t-gray mt-[2rem]" />
        </div>
        <hr className="border-t-black mt-[1rem]" />
        <div className="flex flex-row mt-[1.3rem] mb-[1.5rem]">
          <span className="text-2xl font-semibold ml-[1rem]">
            최종 결제 금액
          </span>
          <span className="text-2xl font-semibold ml-auto mr-[1rem]">
            100,000원
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
