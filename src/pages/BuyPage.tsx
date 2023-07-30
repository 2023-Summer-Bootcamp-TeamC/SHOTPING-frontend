import LeftList from "../components/buy/LeftList";
import LeftTab from "../components/buy/LeftTab";
import BuyInfo from "../components/buy/BuyInfo";
import BuyButton from "../components/buy/BuyButton";

/* 결제 페이지 */
/* 왼쪽 상단 탭, 왼쪽 리스트, 오른쪽 결제 정보, 오른쪽 결제 버튼 컴포넌트 포함 */

export default function BuyPage() {
  return (
    <div className="flex flex-col items-center justify-center h-full overflow-y-auto scrollbar-hide">
      <div className="flex 2xl:flex-row flex-col  w-[85%] h-[90%] ">
        <div className="flex flex-col 2xl:w-[75%] w-[100%] 2xl:h-[100%] h-[80%] mt-[1rem]">
          <LeftTab />
          <LeftList />
        </div>
        <div className="flex flex-col 2xl:mt-[5.625rem] mt-[0rem] ml-[2%] 2xl:w-[23%] w-[100%] 2xl:h-[80%] h-[20%] ">
          <BuyInfo />
          <BuyButton />
        </div>
      </div>
    </div>
  );
}
