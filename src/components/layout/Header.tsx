import React from "react";
import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router";

/**
 * 헤더 (상단바)
 */

export function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  const mainNavigate = () => {
    navigate("/");
  };

  const scanNavigate = () => {
    navigate("/scan");
  };

  const listNavigate = () => {
    navigate("/list");
  };

  const payNavigate = () => {
    /*
      if(리스트에 들어있는 게 없다면){
        alert("상품을 담으신 후에 시도해 주세요.")
      } else {
        navigate('/buy')
      }
    */

    navigate("/buy");
  };

  return (
    <div className="sticky top-0 left-0 right-0 z-50 w-full h-20">
      <div className="flex flex-col px-5 pt-5 bg-white h-full">
        <div className="grow flex items-center ">
          <motion.button
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
            onClick={mainNavigate}
          >
            <span className="text-[#ff0099] text-2xl font-sans font-bold">
              SHOTPING
            </span>
          </motion.button>

          <div className="flex pl-10 space-x-10">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={scanNavigate}
            >
              <div
                className={`hover:font-semibold text-lg ${
                  location.pathname === "/scan"
                    ? "text-[#ff0099] underline underline-offset-[6px] font-semibold"
                    : "text-black"
                }`}
              >
                상품인식
              </div>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={listNavigate}
            >
              <div
                className={`hover:font-semibold text-lg ${
                  location.pathname === "/list" ||
                  location.pathname === "/searchresult"
                    ? "text-[#ff0099] underline underline-offset-[6px] font-semibold"
                    : "text-black"
                }`}
              >
                상품리스트
              </div>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={payNavigate}
            >
              <div
                className={`hover:font-semibold text-lg ${
                  location.pathname === "/buy"
                    ? "text-[#ff0099] underline underline-offset-[6px] font-semibold"
                    : "text-black"
                }`}
              >
                결제
              </div>
            </motion.button>
          </div>
        </div>
        <div className="flex px-4 py-2 w-full border-b-2" />
      </div>
    </div>
  );
}
