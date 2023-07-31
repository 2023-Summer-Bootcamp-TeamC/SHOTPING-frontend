import Chart from "./Chart";
import Ranking from "./Ranking";
import { motion } from "framer-motion";

/* 메인 지금 인기있는 상품 눌렀을 때 나오는 모달 */

interface MainModalProps {
  onClose: () => any;
}

export default function Modal({ onClose }: MainModalProps) {
  const stopPropagation = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
  };

  return (
    <div
      className="lg modal flex justify-center items-center fixed z-50 w-full h-full top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50"
      style={{ cursor: "default" }}
      onClick={onClose}
    >
      <motion.div
        className="w-[35rem] lg:w-[70rem] lg:h-[44rem] lg:mt-10 bg-white rounded-[1.25rem] flex flex-col justify-center items-center"
        initial={{ opacity: 0, y: "-50%" }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          type: "tween",
          duration: 0.5,
        }}
        onClick={stopPropagation}
      >
        <div className="mt-12 mb-[1rem] text-2xl font-semibold lg:mb-5 lg:mt-2 transition-all duration-700">
          지금 인기있는 상품들이에요!
        </div>
        <div className="flex">
          <div className="mobile ml-9 mb-4 mr-2 lg:ranking lg:w-[30rem] lg:h-[32rem] lg:ml-4">
            <Ranking />
          </div>
          <div className="lg:chartContainer">
            <div className="hidden ml-4 mr-6 lg:chart lg:w-[27rem] lg:h-[32rem] lg:flex justify-center items-center h-full">
              <Chart />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
