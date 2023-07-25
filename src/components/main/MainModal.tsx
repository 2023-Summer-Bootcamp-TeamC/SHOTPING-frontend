import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import Chart from "./chart";
import Ranking from "./ranking";

interface MainModalProps {
  setIsModalOpen: () => void;
}

export default function Modal({ setIsModalOpen }: MainModalProps) {
  const [isMobile, setIsMobile] = useState(false);

  return (
    <div
      className="md modal flex justify-center items-center fixed z-50 w-full h-full top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50"
      style={{ cursor: "default" }}
      onClick={setIsModalOpen}
    >
      <div className="w-[35rem] md:modalContent md:w-[60rem] md:h-[40rem] md:mt-16 bg-white rounded-xl flex flex-col justify-center items-center">
        <div className="mt-2 mb-[1rem] text-2xl font-semibold md:mb-2">
          지금 인기있는 상품들이에요!
        </div>
        <div className="flex">
          <div className="md:chartContainer">
            <div className="hidden md:chart md:w-[27rem] md:h-[32rem] md:mr-4 md:flex justify-center items-center h-full">
              <Chart />
            </div>
          </div>
          <div className="mobile mb-2 md:ranking md:w-[27rem] md:h-[32rem] md:ml-4">
            <Ranking />
          </div>
        </div>
      </div>
    </div>
  );
}
