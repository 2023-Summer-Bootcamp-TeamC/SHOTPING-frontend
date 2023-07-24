import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

interface Product {
  id: number;
  product_name: string;
  image_url: string;
}

interface RankingItemProps {
  product: Product;
  rank: number;
}

const RankingItem: React.FC<RankingItemProps> = ({ product, rank }) => {
  const getRankingClassName = (rank: number): string => {
    if (rank === 1) return "";
    if (rank === 2) return "";
    if (rank === 3) return "";
    return "";
  };

  const getImageSizeClassName = (rank: number): string => {
    if (rank === 1) return "w-[6rem] h-[7rem]";
    if (rank === 2) return "w-[5rem] h-[6rem] mt-1";
    if (rank === 3) return "w-[4rem] h-[5rem]";
    return "";
  };

  const getTextSizeClassName = (rank: number): string => {
    if (rank === 1) return "";
    if (rank === 2) return "";
    if (rank === 3) return "";
    return "";
  };

  return (
    <div
      className={`ranking-item border-b-2 flex items-center w-[25rem] h-[8rem] mt-7`}
    >
      <div className={`text-xl w-[4rem] ml-6 ${getRankingClassName(rank)}`}>
        {rank === 1 ? (
          <img
            className="w-[5rem] h-[5rem]"
            src="https://i.postimg.cc/hvV1bsCL/2023-07-17-211032.png"
            alt={`${rank}위`}
          />
        ) : (
          ``
        )}
        {rank === 2 ? (
          <img
            className="w-[5rem] h-[5rem]"
            src="https://i.postimg.cc/wv8shGv0/2023-07-17-211100.png"
          />
        ) : (
          ``
        )}
        {rank === 3 ? (
          <img
            className="w-[5rem] h-[5rem]"
            src="https://i.postimg.cc/PrQW4Ts9/2023-07-17-211112.png"
          />
        ) : (
          ``
        )}
      </div>
      <motion.img
        className={`img ${getImageSizeClassName(rank)} ml-10 mr-8 mb-5`}
        src={product.image_url}
        alt={`${rank}위 이미지`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: rank * 0.5 }}
      />
      <motion.span
        className={`truncate ${getTextSizeClassName(rank)}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: rank * 0.5 }}
      >
        {product.product_name}
      </motion.span>
    </div>
  );
};

export default function Ranking() {
  const [rankingData, setRankingData] = useState<Product[]>([]);

  useEffect(() => {
    axios
      .get("/api/v1/popular")
      .then((response) => {
        console.log("랭킹 데이터 가져오기 성공");
        console.log(response.data);
        setRankingData(response.data.slice(0, 3));
      })
      .catch((error) => {
        console.log("랭킹 데이터 가져오기 실패");
        console.log(error);
      });
  }, []);

  return (
    <div className="ranking w-[27rem] h-[32rem] ml-4">
      {rankingData.map((product, index) => (
        <RankingItem key={product.id} product={product} rank={index + 1} />
      ))}
    </div>
  );
}