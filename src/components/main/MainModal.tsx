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

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1000);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div
      className={`modal flex justify-center items-center fixed z-50 w-full h-full top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 ${
        isMobile ? "mobile" : ""
      }`}
      style={{ cursor: "default" }}
      onClick={setIsModalOpen}
    >
      <div
        className={`modalContent w-[60rem] h-[40rem] mt-16 bg-white rounded-xl flex flex-col justify-center items-center ${
          isMobile ? "mobile w-[34rem]" : ""
        }`}
      >
        <div
          className={`text-2xl font-semibold mb-2 ${
            isMobile ? "mobile mt-8 mb-[1.5rem]" : ""
          }`}
        >
          지금 인기있는 상품들이에요!
        </div>
        <div className="flex">
          <div className={`chartContainer ${isMobile ? "mobile" : ""}`}>
            <div
              className={`chart w-[27rem] h-[32rem] mr-4 flex justify-center items-center ${
                isMobile ? "hidden" : ""
              }`}
            >
              <Chart />
            </div>
          </div>
          <div
            className={`ranking w-[27rem] h-[32rem] ml-4 ${
              isMobile ? "mobile mb-2" : ""
            }`}
          >
            <Ranking />
          </div>
        </div>
      </div>
    </div>
  );
}
