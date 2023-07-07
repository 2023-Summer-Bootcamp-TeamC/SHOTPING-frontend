import React from "react";
import { motion } from "framer-motion";
import { FaRegCircle } from "react-icons/fa";
import Webcam from "react-webcam";

export default function Scanning() {
  return (
    <div className="relative flex flex-col bg-black drop-shadow-xl border rounded-3xl w-3/4 h-45rem justify-center items-center">
      <Webcam className="absolute inset-0 w-full h-full" />
      <div className="mt-auto mb-6">
        <motion.button
          whileTap={{ scale: 0.9 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
          className="relative z-10"
        >
          <FaRegCircle className="w-20 h-20 text-white drop-shadow-xl" />
        </motion.button>
      </div>
    </div>
  );
}
