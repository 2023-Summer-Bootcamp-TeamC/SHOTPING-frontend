import PayModalList from "./PayModalList";
import { RiCheckboxBlankCircleFill } from "react-icons/ri";

/* pay페이지 주문내역 상세보기 버튼 클릭 시 모달 
  PayModalList 컴포넌트 포함
*/

interface PayModalProps {
  onClose: () => void;
}

export default function PayModal({ onClose }: PayModalProps) {
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="absolute w-[41.5625rem] h-[52.875rem] left-1/2 top-1/2  -translate-x-1/2 -translate-y-1/2 rounded-[1.25rem] bg-white p-[2.5rem]">
        <h2 className="text-[28px] text-[#f09] font-semibold mb-4">
          주문 상세보기
        </h2>
        <hr className="border-gray-300 mb-[1rem]" />
        <div className="flex items-center ">
          <RiCheckboxBlankCircleFill
            size="16"
            color="#FF0099 "
            className="mb-[1rem] mr-[0.75rem]"
          />
          <p className="font-medium text-[1.625rem] text-black mb-[1rem]">
            주문상품 내역
          </p>
        </div>

        <PayModalList />

        <button
          className="bg-[#f09] text-white text-lg rounded-lg h-[3.125rem] w-[9.375rem] mt-[2rem] hover:bg-[#D60080] absolute left-[15.625rem] font-semibold"
          onClick={onClose}
        >
          확인
        </button>
      </div>
    </div>
  );
}
