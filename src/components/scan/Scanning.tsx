import React, { useCallback, useRef, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { FaRegCircle } from "react-icons/fa";
import Webcam from "react-webcam";

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
  const [imgSrc, setImgSrc] = useState<String | null>(null);
  const [file, setFile] = useState<File | null>(null);

  const captureEvent = useCallback(() => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      setImgSrc(imageSrc);
      createImgFile(imageSrc);
    }
  }, [webcamRef, setImgSrc]);

  const createImgFile = async (imgSrc: string | null) => {
    if (imgSrc) {
      await console.log("이미지옴?", imgSrc);
      const res = await fetch(imgSrc);
      const blob = await res.blob();
      const file = new File([blob], "image", { type: "image/jpeg" });
      await console.log("파일 : ", file);

      const formData = new FormData();
      await formData.append("upload", file);

      //onImage, onImgFormData 를 통해 이미지와 formData를 결과 컴포넌트로 전달
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
