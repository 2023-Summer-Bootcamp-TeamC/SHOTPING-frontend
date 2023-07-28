import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router";
import { persistor } from "../../index";
import CheckList from "../common/CheckList";
import React, { useState } from "react";

/**
 * 헤더 (상단바)
 */

export function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const purge = async () => {
    await persistor.purge();
  };
  const [modalOpen, setModalOpen] = useState(false);
  const [showImage, setShowImage] = useState(false);

  const addCart = () => {
    setShowImage(true);
  };
  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };
  return (
    <div className="sticky top-0 left-0 right-0 z-50 w-full h-20">
      {/* 하얀 긴 부분 + 회색 선*/}
      <div className="flex flex-col px-5 pt-5 bg-white h-full">
        {/*헤더 하얀색 긴 부분 */}
        <div className="grow flex items-center w-[100%] justify-between ">
          <div className="w-[80%] flex flex-row">
            {/* 샷핑 로고 */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
              onClick={() => {
                if (location.pathname === "/pay") {
                  purge();
                  navigate("/");
                } else {
                  navigate("/");
                }
              }}
            >
              <span className="text-[#ff0099] text-2xl font-sans font-bold">
                SHOTPING
              </span>
            </motion.button>
            {/* 상품인식, 상품리스트, 결제 */}
            <div className="flex pl-10 space-x-10">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => {
                  if (location.pathname === "/pay") {
                    purge();
                    navigate("/scan");
                  } else {
                    navigate("/scan");
                  }
                }}
              >
                <div
                  className={`hover:font-semibold text-lg ${
                    location.pathname === "/scan" ||
                    location.pathname === "/scanfail"
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
                onClick={() => {
                  if (location.pathname === "/pay") {
                    purge();
                    navigate("/list");
                  } else {
                    navigate("/list");
                  }
                }}
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
                onClick={() => {
                  if (location.pathname === "/pay") {
                    purge();
                    navigate("/buy");
                  } else {
                    navigate("/buy");
                  }
                }}
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
          <div className="flex pl-20 space-x-4 justify-end items-center ">
            <img
              className=" mt-[0.2rem] w-[1.8rem] h-[1.5rem] mr-[0.5rem]"
              src="https://i.postimg.cc/jdz8PjgY/2023-07-28-204112.png"
              style={{ position: "absolute", zIndex: 1 }}
              onClick={handleModalOpen}
            />
            {/* {showImage && (
       
  )} */}
            <span
              className=" w-[1rem] h-[1rem] rounded-full bg-[#ff0099] top-1 mt-[1.2rem] ml-[1rem]"
              style={{ position: "absolute", zIndex: 2 }}
            />
          </div>
        </div>
        {/*헤더 밑 회색 선 */}
        <div className="flex px-4 py-2 w-full border-b-2" />
      </div>
    </div>
  );
}
