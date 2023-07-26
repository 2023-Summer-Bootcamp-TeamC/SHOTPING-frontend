import { useState } from "react";
import Chart from "./Chart";
import Ranking from "./Ranking";

/* 메인 지금 인기있는 상품 눌렀을 때 나오는 모달 */

interface MainModalProps {
  setIsModalOpen: () => void;
}

export default function Modal({ setIsModalOpen }: MainModalProps) {
  const [isMobile, setIsMobile] = useState(false);

  return (
    <div
      className="xl modal flex justify-center items-center fixed z-50 w-full h-full top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50"
      style={{ cursor: "default" }}
      onClick={setIsModalOpen}
    >
      <div className="w-[35rem] xl:w-[60rem] xl:h-[40rem] xl:mt-16 bg-white rounded-xl flex flex-col justify-center items-center">
        <div className="mt-12 mb-[1rem] text-2xl font-semibold 2xl:mb-2 xl:mt-4 transition-all duration-700">
          지금 인기있는 상품들이에요!
        </div>
        <div className="flex">
          <div className="xl:chartContainer">
            <div className="hidden xl:chart xl:w-[27rem] xl:h-[32rem] xl:mr-4 xl:flex justify-center items-center h-full">
              <Chart />
            </div>
          </div>
          <div className="mobile mb-4 xl:ranking xl:w-[27rem] xl:h-[32rem] xl:ml-4">
            <Ranking />
          </div>
        </div>
      </div>
    </div>
  );
}
