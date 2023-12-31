import { useNavigate } from "react-router-dom";
import { persistor } from "../../index";
import Lottie from "lottie-react";
import lottie from "../../assets/lottie/CircleClose.json";

/* 
  결제 실패 레이아웃
  다시 시도 및 메인으로 돌아가기 
*/

const flexColumnCenterStyle = () => {
  return "flex flex-col items-center justify-center h-full";
};

export default function PayFailLayout() {
  const navigate = useNavigate();
  const purge = async () => {
    await persistor.purge();
  };

  return (
    <div className={flexColumnCenterStyle()}>
      <div className="md:w-[17.5rem] md:h-[17.5rem] w-[11.5.5rem] h-[11.5rem] ">
        <Lottie animationData={lottie} />
      </div>

      <p className="md:text-[40px] text-[1.875rem] text-black">
        결제가 완료되지 않았습니다.
      </p>

      <div className=" md:mt-[6.25rem] mt-[2.25rem] transition-all duration-700" />

      <button
        onClick={() => {
          navigate("/buy");
        }}
        className="w-[30rem] h-[4rem] md:w-[44.8125rem] md:h-[5.5625rem] mt-[1.5rem]  
        text-lg md:text-2xl font-bold text-white bg-[#FF0099] hover:bg-[#D60080]"
      >
        다시 시도하기
      </button>

      <button
        onClick={() => {
          purge();
          navigate("/");
        }}
        className="w-[30rem] h-[4rem] md:w-[44.8125rem] md:h-[5.5625rem] mt-[1.5rem]   
        text-lg md:text-2xl font-bold text-[#565656] bg-white hover:bg-[#EAEAEA] border-[0.04375rem] border-[#a6a6a6]"
      >
        메인으로 돌아가기
      </button>
    </div>
  );
}
