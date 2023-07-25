import { useEffect, useState } from "react";
import axios from "axios";
import ProductBox from "../list/ProductBox";

/* 검색 시 나오는 결과 제품 리스트 */

interface ProductCardProps {
  id: number;
  image_url: string;
  product_name: string;
  product_price: number;
  product_stock: number;
}

export default function SearchProductList({
  keyWord,
}: {
  keyWord: string | null;
}) {
  const [data, setData] = useState<ProductCardProps[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get("/api/v1/search", {
          params: {
            kw: keyWord,
          },
        });

        setData(response.data);
      } catch (error) {
        console.log("서치에러", error);
      }
    }

    fetchData();
  }, [keyWord]);

  return (
    <div
      className="grid grid-cols-4  lg:gap-10 gap-x-20  md:ml-0 ml-12  mt-10 transition-all duration-700 "
      style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}
    >
      {data &&
        data.map((v, index) => (
          <ProductBox
            key={index}
            id={v.id}
            image={v.image_url}
            productName={v.product_name}
            price={v.product_price}
            stock={v.product_stock}
          />
        ))}
    </div>
  );
}
