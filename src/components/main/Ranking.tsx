import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

/* 메인모달 오른쪽에 뜨는 랭킹 */

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
    if (rank === 2) return "w-[6rem] h-[7rem]";
    if (rank === 3) return "w-[6rem] h-[7rem]";
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
      className={`ranking-item border-b-2 flex items-center w-[30rem] h-[8rem] mt-9`}
    >
      <div className={`text-xl w-[4rem] ${getRankingClassName(rank)}`}>
        {rank === 1 ? (
          <img
            className="w-[3rem] h-[3.5rem] mb-6"
            src="https://i.postimg.cc/hvV1bsCL/2023-07-17-211032.png"
            alt={`${rank}위`}
          />
        ) : (
          ``
        )}
        {rank === 2 ? (
          <img
            className="w-[3rem] h-[3.5rem] mb-8"
            src="https://i.postimg.cc/wv8shGv0/2023-07-17-211100.png"
          />
        ) : (
          ``
        )}
        {rank === 3 ? (
          <img
            className="w-[3rem] h-[3.5rem] mb-8"
            src="https://i.postimg.cc/PrQW4Ts9/2023-07-17-211112.png"
          />
        ) : (
          ``
        )}
      </div>
      <motion.img
        className={`img ${getImageSizeClassName(rank)} ml-3 mr-6 mb-8`}
        src={product.image_url}
        alt={`${rank}위 이미지`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: rank * 0.5 }}
      />
      <motion.span
        className={`truncate text-xl mb-7 w-[17rem] ${getTextSizeClassName(
          rank,
        )}`}
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
        setRankingData(response.data.slice(0, 3));
      })
      .catch((error) => {});
  }, []);

  return (
    <div className="ranking w-[32rem] h-[32rem] ">
      {rankingData.map((product, index) => (
        <RankingItem key={product.id} product={product} rank={index + 1} />
      ))}
    </div>
  );
}
