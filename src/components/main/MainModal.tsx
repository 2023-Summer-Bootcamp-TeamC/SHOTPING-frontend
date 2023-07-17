import React, { Dispatch, SetStateAction, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import Chart from "./chart";

interface MainModalProps {
  setIsModalOpen: () => void;
}

export default function Modal({ setIsModalOpen }: MainModalProps) {
  axios;

  return (
    <div
      className="modal flex justify-center items-center fixed z-50 w-full h-full top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50"
      style={{ cursor: "default" }}
      onClick={setIsModalOpen}
    >
      <div className="modalContent w-[60rem] h-[40rem] mt-16 bg-white rounded-xl flex flex-col justify-center items-center">
        <div className="text-2xl font-semibold mb-2">
          지금 인기있는 상품들이에요!
        </div>
        <div className="flex mt-4">
          <div className="chart w-[27rem] h-[32rem] mr-4 flex justify-center items-center">
            <Chart />
          </div>
          <div className="ranking w-[27rem] h-[32rem] ml-4">
            <motion.div
              className="1st justify-center items-center flex w-[27rem] h-[8rem] mt-16"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              <div className="text-xl w-[4rem] ml-6">1위</div>
              <img
                className="img w-[6rem] h-[7rem] ml-4 mr-5"
                src="https://i.postimg.cc/KvD3BXk6/2023-07-11-111349.png"
              />
              <span className="truncate text-lg">
                [Shotping's] 마시는 플레인 요거트 750mL
              </span>
            </motion.div>
            <motion.div
              className="2nd justify-center items-center flex w-[27rem] h-[8rem] text-sm mt-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1 }}
            >
              <div className="text-xl w-[4rem] ml-6">2위</div>
              <img
                className="img flex flex-col justify-center items-center w-[5rem] h-[6rem] ml-5 mr-6"
                src="https://i.postimg.cc/mgqdfFLN/2023-07-11-112702.png"
              />
              <span className="truncate text-base">
                [어니스트] 그릭요거트 플레인 오리지널 100g
              </span>
            </motion.div>
            <motion.div
              className="3rd justify-left items-center flex w-[27rem] h-[8rem] ml-7"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.5 }}
            >
              <div className="text-xl w-[3rem] ">3위</div>
              <img
                className="img flex flex-col justify-center items-center w-[4rem] h-[5rem] ml-5 mr-6"
                src="https://i.postimg.cc/Kj3GHkxW/2023-07-11-113951.png"
              />
              <span className="truncate text-sm">
                [치즈] 프로바이오요거트 딸기 900mL
              </span>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
