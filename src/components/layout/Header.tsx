import React from "react";
import { motion } from "framer-motion";
/**
 * 헤더 (상단바)
 */

export function Header() {
  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      <div className="flex flex-col px-5 pt-5">
        <div className="flex items-center ">
          <span className="text-[#ff0099] text-2xl font-sans font-bold">
            SHOTPING
          </span>
          <div className="flex pl-10 space-x-10">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <div className="hover:font-semibold text-lg">상품인식</div>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <div className="hover:font-semibold text-lg">상품리스트</div>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <div className="hover:font-semibold text-lg">결제</div>
            </motion.button>
          </div>
        </div>
        <div className="flex px-4 py-2 w-full border-b-2" />
      </div>
    </div>
  );
}
