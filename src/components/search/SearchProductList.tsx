import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductBox from "../list/ProductBox";
import { motion } from "framer-motion";

interface ProductCardProps {
  id: string;
  image_url: string;
  product_name: string;
  product_price: string;
  product_stock: any;
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
        console.log(response.data);
      } catch (error) {
        console.log("서치에러", error);
      }
    }

    fetchData();
  }, [keyWord]);

  return (
    <div className="grid grid-cols-4 gap-10 mt-10">
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
