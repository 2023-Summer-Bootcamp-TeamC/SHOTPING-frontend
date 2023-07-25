import React, { useState, useEffect } from "react";
import { AiFillCamera, AiOutlineUnorderedList } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

interface BuyModalProps {
  onClose: () => void;
}

export default function BuyModal({ onClose }: BuyModalProps) {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(false);

  const stopPropagation = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
  };
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1280);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div
      className=" fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="absolute xl:w-[76rem] xl:h-[45.25rem] w-[40rem] h-[25rem] transition-all duration-700
        left-1/2 top-1/2  -translate-x-1/2 -translate-y-1/2 rounded-[20px] bg-white p-10"
        onClick={stopPropagation}
      >
        {/* Modal content */}
        <h2 className="xl:text-2xl text-xl font-semibold xl:mb-4 mb-4 text-center xl:mt-5 mt-0  transition-all duration-700">
          제품을 추가하실 방법을 선택해주세요!
        </h2>
        <div className="flex flex-row justify-center">
          <div className="flex flex-col justify-center xl:m-10 m-5">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="shadow-xl border border-[#000000] rounded-[40px]  transition-all duration-700
              w-[15rem] h-[15rem] xl:w-[25rem] xl:h-[25rem] flex justify-center items-center"
            >
              <AiFillCamera
                size="140"
                color="#b7b7b7"
                className=" animate-bounce mt-11"
                onClick={() => {
                  navigate("/scan");
                }}
              />
            </motion.button>
            <span
              className={`text-center text-[32px] mt-10 font-medium ${
                isMobile ? "hidden " : ""
              }`}
            >
              상품인식하기
            </span>
          </div>
          <div className="flex flex-col justify-center xl:m-10 m-5">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="shadow-xl border border-[#000000] rounded-[40px]   transition-all duration-700
              w-[15rem] h-[15rem] xl:w-[25rem] xl:h-[25rem] flex justify-center items-center"
            >
              <AiOutlineUnorderedList
                size="140"
                color="#b7b7b7"
                className="animate-bounce mt-11"
                onClick={() => {
                  navigate("/list");
                }}
              />
            </motion.button>
            <span
              className={`text-center text-[32px] mt-10 font-medium ${
                isMobile ? "hidden" : ""
              }`}
            >
              리스트 보기
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
