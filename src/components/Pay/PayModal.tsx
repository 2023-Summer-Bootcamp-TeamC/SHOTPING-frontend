import React from "react";
import PayModalList from "./PayModalList";
import { RiCheckboxBlankCircleFill } from "react-icons/ri";

interface PayModalProps {
  onClose: () => void; // 모달을 닫을 때 호출할 함수
}

const PayModal: React.FC<PayModalProps> = ({ onClose }) => {
  return (
    <div className=" fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="absolute w-[665px] h-[846px] left-1/2 top-1/2  -translate-x-1/2 -translate-y-1/2 rounded-[20px] bg-white p-10">
        <h2 className="text-[28px] text-[#f09] font-semibold mb-4">
          주문 상세보기
        </h2>
        <hr className="border-gray-300 mb-4" />
        <div className="flex items-center ">
          <RiCheckboxBlankCircleFill
            size="16"
            color="#FF0099 "
            className="mb-4 mr-3"
          />
          <p className="font-medium text-[26px] text-black mb-4">
            주문상품 내역
          </p>
        </div>
        {/* 위는 고정 */}

        <PayModalList />

        <button
          className="bg-[#f09] text-white text-lg rounded-lg h-[50px] w-[150px] mt-8 hover:bg-[#D60080] absolute left-[250px] font-semibold"
          onClick={onClose}
        >
          확인
        </button>
      </div>
    </div>
  );
};

export default PayModal;
