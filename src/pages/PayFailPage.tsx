import React from "react";
import payfail_image from "../components/images/payfail_image.png";
import { useNavigate } from "react-router-dom";

const flexColumnCenterStyle = () => {
  return "flex flex-col items-center justify-center h-full";
};

const PayFailPage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className={flexColumnCenterStyle()}>
      <img
        src={payfail_image}
        alt="Payment"
        className="md:w-[7.5rem] md:h-[7.5rem] md:mb-[1.875rem] w-[5.5rem] h-[5.5rem] mb-[2.875rem]"
      />
      <p className="md:text-[40px] text-[30px] text-black">
        결제가 완료되지 않았습니다.
      </p>

      <div className=" md:mt-[6.25rem] mt-[2.25rem] transition-all d uration-300" />

      <button
        onClick={() => {
          navigate("/buy");
        }}
        className="w-[30rem] h-[4rem] md:w-[44.8125rem] md:h-[5.5625rem] mt-6 
        text-lg md:text-2xl font-bold text-white bg-[#FF0099] hover:bg-[#D60080]"
      >
        다시 시도하기
      </button>

      <button
        onClick={() => {
          navigate("/");
        }}
        className="w-[30rem] h-[4rem] md:w-[44.8125rem] md:h-[5.5625rem] mt-6 
        text-lg md:text-2xl font-bold text-[#565656] bg-white hover:bg-[#EAEAEA] border-[0.7px] border-[#a6a6a6]"
      >
        메인으로 돌아가기
      </button>
    </div>
  );
};

export default PayFailPage;
