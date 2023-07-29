import { predictResultProps } from "./ScanResult";

/* 상품 인식 결과 리스트의 제품 컴포넌트 */

export default function ScanList({
  product_name,
  product_price,
  image_url,
  quantity,
}: predictResultProps) {
  const totalPrice = product_price * quantity;

  return (
    <div className="flex flex-col">
      <div className=" flex items-center space-x-9 place-content-center p-4 pr-1">
        <div className="relative w-20 h-24 bg-white flex justify-center items-center">
          <img src={image_url} className="absolute" />
        </div>
        <span className="truncate text-lg w-2/4">{product_name}</span>
        <span className="text-lg"> {quantity} </span>
        <span className="text-xl"> {totalPrice.toLocaleString()}원 </span>
      </div>
    </div>
  );
}
