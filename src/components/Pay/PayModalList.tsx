import React from "react";

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

const products: Product[] = [
  {
    id: 1,
    name: "[그릭데이] 그릭요거트 시그니처그 ",
    price: 17100,
    image: "src/components/images/image001.png",
    quantity: 1,
  },
  {
    id: 2,
    name: "에어팟 키링",
    price: 3000,
    image: "src/components/images/image001.png",
    quantity: 1,
  },
  {
    id: 3,
    name: "폴리폴리 무릎 담요",
    price: 7000,
    image: "src/components/images/image001.png",
    quantity: 1,
  },
  {
    id: 4,
    name: "아이폰 스티커 팩",
    price: 1900,
    image: "src/components/images/image001.png",
    quantity: 1,
  },
  {
    id: 5,
    name: "개발자 키보드",
    price: 99000,
    image: "src/components/images/image001.png",
    quantity: 1,
  },
  {
    id: 6,
    name: "개발자 커스텀 케이블",
    price: 69000,
    image: "src/components/images/image001.png",
    quantity: 1,
  },
  {
    id: 7,
    name: "문 긁는 고양이",
    price: 1000000,
    image: "src/components/images/image001.png",
    quantity: 1,
  },
  {
    id: 8,
    name: "우당탕탕 인테리어 책",
    price: 5900,
    image: "src/components/images/image001.png",
    quantity: 200,
  },
];

const PayModalList: React.FC = () => {
  // Calculate the total order amount
  const totalOrderAmount = products.reduce(
    (total, product) => total + product.price * product.quantity,
    0,
  );

  return (
    <div className="border border-gray-300  h-[550px] rounded-[40px]  ">
      <div className=" flex items-center border border-b-gray-300  h-[57px] rounded-t-[39px]">
        <span className="text-lg font-semibold flex items-center justify-center  w-[360px]">
          상품명
        </span>
        <span className="text-lg font-semibold flex items-center justify-center w-[90px]">
          수량
        </span>
        <span className=" text-lg font-semibold flex items-center justify-center w-[150px]">
          가격
        </span>
      </div>
      <div>
        <div style={styles.container} className="scrollbar-hide">
          <div style={styles.list}>
            {products.map((item, index) => (
              <div key={item.id}>
                <div style={styles.item}>
                  <img
                    src={item.image}
                    alt={item.name}
                    style={styles.image}
                    className="w-[60px] h-[75px] overflow-hidden"
                  />
                  <div style={styles.details} className="flex items-center">
                    <span className="w-[250px] text-left mr-9 text-base">
                      {item.name}
                    </span>
                    <span className=" w-[20px] text-right mr-14 text-base">
                      {item.quantity}
                    </span>
                    <span className="w-[90px] text-right text-base ">
                      {(item.price * item.quantity).toLocaleString()}원
                    </span>
                  </div>
                </div>
                <hr style={styles.separator} />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="text-lg font-semibold flex items-center justify-center  border border-t-gray-300  h-[82px] rounded-b-[39px] bg-[EDEDED]">
        총 주문 금액
        <span className="font-bold text-lg ml-3 tracking-wide">
          {totalOrderAmount.toLocaleString()}원
        </span>
      </div>
    </div>
  );
};

const styles = {
  container: {
    height: 410,
    overflowY: "auto",
  },
  list: {
    width: "100%",
  },
  item: {
    display: "flex",
    margin: "5px",
    padding: "8.5px",
    fontSize: "13px",
  },
  image: {
    marginRight: "20px",
  },
  details: {
    flex: 1,
  },
  separator: {
    margin: "2px 10px",
    borderTop: "1px solid #ccc",
  },
} as const;

export default PayModalList;
