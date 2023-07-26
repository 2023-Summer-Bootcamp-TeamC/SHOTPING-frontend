import Loading from "../common/Loading";

export default function NowPayingLayout() {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <div className="md:w-[17.5rem] md:h-[17.5rem] w-[11.5.5rem] h-[11.5rem] flex flex-col items-center justify-center">
        <Loading />
      </div>
      <p className="md:text-[2.5rem] text-[1.8rem] text-black">
        결제가 진행 중입니다.
      </p>
    </div>
  );
}
