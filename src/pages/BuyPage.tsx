import LeftLayout from "../components/buy/LeftLayout";
import RightLayout from "../components/buy/RightLayout";

/* 결제 페이지 */

export default function BuyPage() {
  return (
    <div className="flex flex-col items-center justify-center h-full overflow-y-auto scrollbar-hide">
      <div className="flex 2xl:flex-row flex-col  w-[85%] h-[90%] ">
        <LeftLayout />
        <RightLayout />
      </div>
    </div>
  );
}
