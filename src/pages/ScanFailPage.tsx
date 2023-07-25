import { useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import WarningLottie from "../assets/lottie/WarningLottie.json";

/* 상품 인식 실패 페이지 */

export default function ScanFailPage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <div className="md:w-[17.5rem] md:h-[17.5rem] w-[11.5.5rem] h-[11.5rem] flex flex-col items-center justify-center">
        <Lottie
          className="md:max-w-full max-w-[10rem]"
          animationData={WarningLottie}
        />
      </div>

      <p className="md:text-[2.5rem] text-[1.8rem] text-black">
        상품 인식에 실패했습니다.
      </p>

      <div className=" md:mt-[6.25rem] mt-[2.25rem] transition-all duration-300" />

      <button
        onClick={() => {
          navigate("/scan");
        }}
        className="w-[30rem] h-[4rem] md:w-[44.8125rem] md:h-[5.5625rem] mt-6  
        text-lg md:text-2xl font-bold text-white bg-[#FF0099] hover:bg-[#D60080]"
      >
        다시 인식하기
      </button>
    </div>
  );
}
