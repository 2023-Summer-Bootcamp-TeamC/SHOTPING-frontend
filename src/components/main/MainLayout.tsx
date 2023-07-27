import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import { motion } from "framer-motion";
import lottieData from "../../assets/lottie/OnlineShopping.json";
import Modal from "./MainModal";
import Lottie from "lottie-react";
import ScanLottie from "../../assets/lottie/ScanProduct.json";

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
    <div>
      <div className="flex flex-col justify-center items-center h-full ml-38">
        <div
          className={`flex transition-all duration-700 ${
            isMobile ? "flex-col-reverse" : "flex-row"
          }`}
        >
          <div
            className={`text transition-all duration-700 ${
              isMobile ? "w-full" : "w-1/2"
            } h-full flex flex-col justify-center`}
          >
            <motion.div
              className={`logo text-9xl font-medium mb-1 transition-all duration-700 ${
                isMobile ? "text-[6rem]" : ""
              }`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 2, delay: 0.5 }}
            >
              SHOTPING
            </motion.div>
            <motion.div
              className="text-5xl transition-all duration-700 md:text-6xl"
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
                className="popular transition-all duration-700 rounded-full w-80 h-[3.7rem] mb-2 text-xl mt-[18rem] md:w-96 md:h-16 text-center md:text-2xl md:mt-20 md:mb-2 text-slate-600 flex items-center justify-center hover:bg-[#EAEAEA]"
                onClick={handleOpenModal}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 2 }}
              >
                지금 인기있는 상품
              </motion.button>
              <motion.button
                className="scan transition-all duration-700 border rounded-full w-80 h-[4rem] text-xl mr-44 md:w-96 md:h-16 text-center md:text-2xl font-semibold text-white bg-[#ff0099] flex items-center justify-center hover:bg-[#D60080]"
                onClick={scanNavigate}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 2.5 }}
              >
                상품 인식하러 가기
                <FaArrowRight className="arrow ml-5" />
              </motion.button>
            </div>
          </div>
          <div className="animate transition-all duration-700 w-full justify-center md:ml-20 md:transition-all md:duration-300">
            <div
              className={`lottie invisible md:visible transition-all duration-700${
                isMobile ? "w-1/12 hidden" : ""
              }`}
            >
              <Lottie animationData={lottieData} />
            </div>
          </div>
        </div>
        {isModalOpen && <Modal setIsModalOpen={handleCloseModal} />}
      </div>
      <div className="flex flex-col">
        {/*상품을 인식하세요 부분 */}
        <div className="flex flex-row w-full h-full justify-between items-right">
          <div className="flex justify-start justify-items-start">
            <Lottie
              className="w-[40rem] mt-[15rem]"
              animationData={ScanLottie}
            />
          </div>
          <div className="flex flex-col justify-center items-right h-full mt-[17rem] mr-[10rem] ">
            <p className="text-[7.5rem] font-semibold text-right text-black mb-[2rem]">
              상품을 인식하세요.
            </p>
            <span className="text-[2.5rem] font-medium text-right text-black">
              원하는 상품을 카메라에 인식시켜
            </span>
            <span className="text-[2.5rem] font-medium text-right text-black">
              쉽게 결제할 수 있습니다.
            </span>
            <br />
            <div className="flex text-right justify-end mb-[17rem]">
              <motion.button
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                className="flex items-center font-semibold text-[#ff0099] tracking-[0.5rem] text-[2.5rem] mt-[2rem]"
                onClick={() => navigate("/scan")}
              >
                인식하러 가기
                <FaArrowRight className="ml-[1rem]" />
              </motion.button>
            </div>
          </div>
        </div>
        {/*상품을 담아보세요 부분 */}
        <div className="flex flex-row w-full h-full justify-center items-left relative">
          <div className="flex flex-col z-20 justify-center items-left h-full mt-[17rem] mr-[33rem]">
            <p className="text-[7.5rem] font-semibold text-left text-black mt-0 mb-[2rem]">
              상품을 담아보세요.
            </p>
            <span className="text-[2.5rem] font-medium text-left text-black">
              모든 상품들을 리스트로 한눈에,
            </span>
            <span className="text-[2.5rem] font-medium text-left text-black">
              원하는 상품을 검색해서 쉽게 찾을 수 있습니다.
            </span>
            <br />
            <div className="flex text-left justify-start mb-[17rem]">
              <motion.button
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                className="flex items-center font-semibold text-[#ff0099] tracking-[0.5rem] text-[2.5rem]  mt-20"
                onClick={() => navigate("/list")}
              >
                상품 보러 가기
                <FaArrowRight className="ml-[1rem]" />
              </motion.button>
            </div>
          </div>
          <motion.div
            className="absolute top-0 right-[-140]"
            animate={{ rotate: -25 }}
          >
            <img
              src="https://i.postimg.cc/nzjg1kjS/2023-07-27-160611.png"
              className="w-[80rem] pt-[10rem] ml-[20rem]"
            />
          </motion.div>
        </div>

        {/*인기 상품 보러가기 부분 */}
        <div className="flex flex-row w-full h-full justify-center items-right">
          <div className="">
            <img
              className="mt-[35rem] w-[40rem] h-[30rem]"
              src="https://i.postimg.cc/4y6WMLgW/2023-07-27-225947.png"
            ></img>
          </div>
          <div className="flex flex-col justify-center items-right h-full mt-[17rem] ml-[4.5rem]">
            <p className="text-[7.5rem] font-semibold text-right text-black">
              인기 있는 상품을
            </p>
            <p className="text-[7.5rem] font-semibold text-right text-black">
              구매하세요.
            </p>
            <span className="text-[2.5rem] font-medium text-right text-black">
              차트와 랭킹으로
            </span>
            <span className="text-[2.5rem] font-medium text-right text-black">
              많이 팔린 상품들을 확인할 수 있습니다.
            </span>
            <br />
            <div className="flex text-right justify-end mb-[8rem]">
              <motion.button
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                className="flex items-center font-semibold text-[#ff0099] tracking-[0.5rem] text-[2.5rem] mt-[5rem]"
                onClick={handleOpenModal}
              >
                인기 상품 보러 가기
                <FaArrowRight className="ml-[1rem]" />
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
