import { useRef, useEffect } from "react";
import Chart from "./chart";
import Ranking from "./Ranking";
import { motion } from "framer-motion";

/* 메인 지금 인기있는 상품 눌렀을 때 나오는 모달 */

interface MainModalProps {
  onClose: () => any;
}

export default function Modal({ onClose }: MainModalProps) {
  // const modalRef = useRef<HTMLDivElement>(null);

  // const handleOutsideClick = (e: MouseEvent) => {
  //   if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
  //     onClose();
  //   }
  // };

  // useEffect(() => {
  //   // 컴포넌트가 마운트될 때 이벤트 리스너 등록
  //   document.addEventListener("click", handleOutsideClick);

  //   // 컴포넌트가 언마운트될 때 이벤트 리스너 제거
  //   return () => {
  //     document.removeEventListener("click", handleOutsideClick);
  //   };
  // }, []);

  const stopPropagation = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
  };

  return (
    <div
      // ref={modalRef}
      className="lg modal flex justify-center items-center fixed z-50 w-full h-full top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50"
      style={{ cursor: "default" }}
      onClick={onClose}
    >
      <motion.div
        className="w-[35rem] lg:w-[60rem] lg:h-[40rem] lg:mt-16 bg-white rounded-[1.25rem] flex flex-col justify-center items-center"
        initial={{ opacity: 0, y: "-50%" }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          type: "tween",
          duration: 0.5,
        }}
        onClick={stopPropagation}
      >
        <div className="mt-12 mb-[1rem] text-2xl font-semibold lg:mb-2 lg:mt-4 transition-all duration-700">
          지금 인기있는 상품들이에요!
        </div>
        <div className="flex">
          <div className="mobile mb-4 mr-2 lg:ranking lg:w-[27rem] lg:h-[32rem] lg:ml-4">
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
