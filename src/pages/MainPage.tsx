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

  return (
    <div className="flex flex-col justify-center items-center h-full">
      <div className="flex">
        <div className="text w-1/2 h-full">
          <motion.div
            className="logo text-7xl font-medium mt-32 ml-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2, delay: 0.5 }}
          >
            SHOTPING
          </motion.div>
          <br />
          <motion.div
            className="title text-3xl ml-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2, delay: 1.5 }}
          >
            One shot,
            <br />
            Easy shopping
          </motion.div>
        </div>
        <div className="animate flex flex-col w-1/2 h-full">
          <div className="lottie ml-32 w-96">
            <Lottie animationData={lottie} />
          </div>
          <div className="button ml-48 ">
            <motion.button
              className="popular border border-slate-300 rounded-3xl w-64 h-12 text-center mb-2 text-slate-600 flex items-center justify-center hover:bg-[#EAEAEA]"
              onClick={handleOpenModal}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 2, delay: 2 }}
            >
              지금 인기있는 상품
            </motion.button>
            <motion.button
              className="scan border rounded-3xl w-64 h-12 text-center font-semibold text-white bg-[#ff0099] flex items-center justify-center hover:bg-[#D60080]"
              onClick={scanNavigate}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 2, delay: 2 }}
            >
              상품 인식하러 가기
              <FaArrowRight className="arrow ml-2" />
            </motion.button>
          </div>
        </div>
        {isModalOpen && <Modal setIsModalOpen={handleCloseModal} />}

        <>
          <div id="container" style={{ width: "200px" }}></div>
        </>
      </div>
    </div>
  );
}
