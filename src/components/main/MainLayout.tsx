import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import { motion } from "framer-motion";
import lottieData from "../../assets/lottie/OnlineShopping.json";
import Modal from "./MainModal";
import Lottie from "lottie-react";

/* 메인레이아웃 */

export default function MainLayout() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  const navigate = useNavigate();
  const scanNavigate = () => {
    navigate("/scan");
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1200);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  });

  return (
    <div className="flex flex-col justify-center items-center h-full ml-38">
      <div className={`flex ${isMobile ? "flex-col-reverse" : "flex-row"}`}>
        <div
          className={`text ${
            isMobile ? "w-full" : "w-1/2"
          } h-full flex flex-col justify-center`}
        >
          <motion.div
            className={`logo text-9xl font-medium mb-1 ${
              isMobile ? "text-[6rem]" : ""
            }`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2, delay: 0.5 }}
          >
            SHOTPING
          </motion.div>
          <motion.div
            className="text-5xl md:text-6xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2, delay: 1.5 }}
          >
            One shot,
            <br />
            Easy shopping
          </motion.div>
          <div className="button mt-8">
            <motion.button
              className="popular border border-slate-300 rounded-full w-80 h-[3.7rem] mb-2 text-xl mt-[18rem] md:w-96 md:h-16 text-center md:text-2xl md:mt-20 md:mb-2 text-slate-600 flex items-center justify-center hover:bg-[#EAEAEA]"
              onClick={handleOpenModal}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 2 }}
            >
              지금 인기있는 상품
            </motion.button>
            <motion.button
              className="scan border rounded-full w-80 h-[4rem] text-xl mr-44 md:w-96 md:h-16 text-center md:text-2xl font-semibold text-white bg-[#ff0099] flex items-center justify-center hover:bg-[#D60080]"
              onClick={scanNavigate}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 2.5 }}
            >
              상품 인식하러 가기
              <FaArrowRight className="arrow ml-2" />
            </motion.button>
          </div>
        </div>
        <div className="animate w-full justify-center md:ml-20 md:transition-all md:duration-300">
          <div
            className={`lottie invisible md:visible ${
              isMobile ? "w-1/12 hidden" : ""
            }`}
          >
            <Lottie animationData={lottieData} />
          </div>
        </div>
      </div>
      {isModalOpen && <Modal setIsModalOpen={handleCloseModal} />}
    </div>
  );
}
