import React, { Dispatch, SetStateAction } from "react";
import { motion } from "framer-motion";

interface MainModalProps {
  setIsModalOpen: () => void;
}

export default function Modal({ setIsModalOpen }: MainModalProps) {
  return (
    <div
      className="modal flex justify-center items-center fixed z-50 w-full h-full top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50"
      style={{ cursor: "default" }}
      onClick={setIsModalOpen}
    >
      <div className="modalContent w-[40rem] h-[27rem] mt-16 bg-white rounded-xl flex flex-col justify-center items-center">
        <div className="text mb-2">지금 인기있는 상품들이에요!</div>
        <div className="flex mt-4">
          <div className="chart w-72 h-80">
            <img
              className="image w-full h-full"
              src="https://i.postimg.cc/3R1n82kk/image.png"
            ></img>
          </div>
          <div className="ranking w-72 h-80">
            <motion.div
              className="1st justify-center items-center flex w-72 h-20 mt-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              <div className="w-[3rem] ml-4">1위</div>
              <img
                className="img w-14 h-16 ml-4 mr-4"
                src="https://i.postimg.cc/KvD3BXk6/2023-07-11-111349.png"
              />
              <span className="truncate">
                [Shotping's] 마시는 플레인 요거트 750mL
              </span>
            </motion.div>
            <motion.div
              className="2nd justify-center items-center flex w-72 h-20 mt-4 mb-2 text-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1 }}
            >
              <div className="w-[3rem] ml-4 text-base">2위</div>
              <img
                className="img flex flex-col justify-center items-center w-12 h-14 ml-5 mr-4"
                src="https://i.postimg.cc/mgqdfFLN/2023-07-11-112702.png"
              />
              <span className="truncate">
                [어니스트] 그릭요거트 플레인 오리지널 100g
              </span>
            </motion.div>
            <motion.div
              className="3rd justify-center items-center flex w-72 h-20 mb-6 text-xs"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.5 }}
            >
              <div className="w-[3rem] ml-4 text-base">3위</div>
              <img
                className="img flex flex-col justify-center items-center w-10 h-12 ml-2.5 mr-4"
                src="https://i.postimg.cc/Kj3GHkxW/2023-07-11-113951.png"
              />
              <span className="truncate">
                [치즈] 프로바이오요거트 딸기 900mL
              </span>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
