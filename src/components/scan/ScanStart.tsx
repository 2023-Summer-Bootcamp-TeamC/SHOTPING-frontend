import { motion } from "framer-motion";

export default function ScanStart({
  onStartScan,
}: {
  onStartScan: () => void;
}) {
  return (
    <div className="flex flex-col bg-white drop-shadow-xl border rounded-3xl w-3/4 h-45rem justify-center items-center">
      <div className="camera flex justify-center mt-0.5">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={onStartScan}
        >
          <img
            src="https://i.postimg.cc/HLC973gD/2023-07-06-224526.png"
            className="image w-20 h-auto animate-bounce"
            alt="Camera"
          />
        </motion.button>
      </div>
      <div className="text pt-2 text-center">
        <span className="text-xl animate-pulse">상품을 인식해 주세요!</span>
      </div>
    </div>
  );
}
