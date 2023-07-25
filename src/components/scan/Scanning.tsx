import { useCallback, useRef } from "react";
import { motion } from "framer-motion";
import { FaRegCircle } from "react-icons/fa";
import Webcam from "react-webcam";

/* 
  상품 인식 중 컴포넌트
  웹캠을 통해 인식할 제품의 사진을 찍음
*/

interface imageProps {
  onImgFormData: (file: FormData) => void;
  onImage: (image: string) => void;
}

export default function Scanning({
  onCompleteScan,
  onImgFormData,
  onImage,
}: imageProps & { onCompleteScan: () => void }) {
  const webcamRef = useRef<Webcam>(null);

  const captureEvent = useCallback(() => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      createImgFile(imageSrc);
    }
  }, [webcamRef]);

  const createImgFile = async (imgSrc: string | null) => {
    if (imgSrc) {
      const res = await fetch(imgSrc);
      const blob = await res.blob();
      const file = new File([blob], "image", { type: "image/jpeg" });

      const formData = new FormData();
      await formData.append("upload", file);

      await onImage(imgSrc);
      await onImgFormData(formData);
      await onCompleteScan();
    }
  };

  return (
    <div className="relative flex flex-col bg-black drop-shadow-xl border rounded-3xl w-3/4 h-45rem justify-center items-center">
      <Webcam className="absolute inset-0 w-full h-full" ref={webcamRef} />
      <div className="mt-auto mb-6">
        <motion.button
          whileTap={{ scale: 0.9 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
          className="relative z-10"
          onClick={captureEvent}
        >
          <FaRegCircle className="w-20 h-20 text-white drop-shadow-xl" />
        </motion.button>
      </div>
    </div>
  );
}
