import React, { useState, useEffect } from "react";
import { Header } from "../components/layout/Header";
import { FaArrowRight } from "react-icons/fa";
import Modal from "../components/main/MainModal";
import { useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import lottie from "../assets/lottie/OnlineShopping.json";
import { motion } from "framer-motion";

export default function MainPage() {
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
      setIsMobile(window.innerWidth <= 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <div className="flex flex-col justify-center items-center h-full">
      <div className={`flex ${isMobile ? "flex-col-reverse" : "flex-row"}`}>
        <div
          className={`text ${
            isMobile ? "w-full" : "w-1/2"
          } h-full flex flex-col justify-center`}
        >
          <motion.div
            className={`logo text-9xl font-medium mb-8 ${
              isMobile ? "text-7xl ml-6" : "ml-32"
            }`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2, delay: 0.5 }}
          >
            SHOTPING
          </motion.div>
          <motion.div
            className={`title text-6xl ${isMobile ? "text-4xl ml-6" : "ml-32"}`}
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
              className={`popular border border-slate-300 rounded-full w-96 h-16 text-center text-2xl mt-20 mb-2 text-slate-600 flex items-center justify-center hover:bg-[#EAEAEA] ${
                isMobile ? "w-full" : ""
              } ${isMobile ? "w-[19.9rem] h-[4rem] ml-6 text-xl" : "ml-32"}`}
              onClick={handleOpenModal}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 2 }}
            >
              지금 인기있는 상품
            </motion.button>
            <motion.button
              className={`scan border rounded-full w-96 h-16 text-center text-2xl font-semibold text-white bg-[#FF0099] flex items-center justify-center hover:bg-[#D60080] ${
                isMobile ? "w-full" : ""
              } ${isMobile ? "w-[19.9rem] h-[4rem] ml-6 text-xl" : "ml-32"}`}
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
        <div
          className={`animate transition-all duration-300
           flex ${isMobile ? "w-full justify-center" : "w-1/2"} h-full`}
        >
          <div
            className={`lottie invisible md:visible ${
              isMobile ? "w-1/12" : ""
            }`}
          >
            <Lottie animationData={lottie} />
          </div>
        </div>
      </div>
      {isModalOpen && <Modal setIsModalOpen={handleCloseModal} />}
    </div>
  );
}
