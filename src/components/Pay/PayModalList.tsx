import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

const PayModalList: React.FC = () => {
  const productList = useSelector((state: RootState) => {
    return state.buylist.products;
  });

  const total = useSelector((state: RootState) => {
    return state.buylist.productTotal;
  });

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
            {productList.map((item, index) => (
              <div key={item.id}>
                <div style={styles.item}>
                  <img
                    src={item.image_url}
                    alt={item.product_name}
                    style={styles.image}
                    className="w-[60px] h-[75px] overflow-hidden"
                  />
                  <div style={styles.details} className="flex items-center">
                    <span className="w-[250px] text-left mr-9 text-base">
                      {item.product_name}
                    </span>
                    <span className=" w-[20px] text-right mr-14 text-base">
                      {item.quantity}
                    </span>
                    <span className="w-[90px] text-right text-base ">
                      {(item.product_price * item.quantity).toLocaleString()}원
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
          {total.toLocaleString()}원
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
