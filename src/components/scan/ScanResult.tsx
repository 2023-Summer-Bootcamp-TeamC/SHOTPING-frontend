import React from "react";
import { motion } from "framer-motion";
import { FaCheck } from "react-icons/fa";
import { FaUndoAlt } from "react-icons/fa";
import ScanList from "./ScanList";
import Feedback from "./Feedback";
import { useNavigate } from "react-router-dom";

export default function ScanResult({ onRetry }: { onRetry: () => void }) {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col bg-white drop-shadow-xl border rounded-3xl w-[89.2rem] h-45rem justify-center items-center">
      <div className="grid grid-cols-2 gap-10 p-10 w-full h-45rem border-black">
        <div className="relative bg-blue-300">
          <img
            src="https://i.postimg.cc/HLC973gD/2023-07-06-224526.png"
            className="absolute w-full h-full"
          ></img>
          <div className="absolute bottom-6 right-6 flex space-x-7">
            <motion.button
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
              className="relative z-10"
              onClick={() => navigate("/pay")}
            >
              <FaCheck className="w-14 h-14 text-gray-100 drop-shadow-xl" />
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
              className="relative z-10"
              onClick={onRetry}
            >
              <FaUndoAlt className="w-14 h-14 text-gray-100 drop-shadow-xl" />
            </motion.button>
          </div>
        </div>

        <div className="flex flex-col space-y-10">
          <div className="border row-end-3 row-span-2 rounded-3xl h-25rem p-4">
            <div className="overflow-y-auto scrollbar-hide scroll-smooth h-full">
              <ScanList />
              <ScanList />
              <ScanList />
              <ScanList />
              <ScanList />
            </div>
          </div>
          <div className="border rounded-3xl h-12.5rem p-5 bg-gray-100">
            <Feedback />
          </div>
        </div>
      </div>
    </div>
  );
}
