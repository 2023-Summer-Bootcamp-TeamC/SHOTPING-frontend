import React from "react";
import { motion } from "framer-motion";
import { useState } from "react";
import Modal from "../src/components/scan/Modal";

function ScanPage() {
  const [modalOpen, setModalOpen] = useState(false);

  const showModal = () => {
    setModalOpen(true);
  };
  return (
    <div className="align flex flex-col items-center justify-center min-h-screen">
      <div className="camera flex justify-center mt-0.5">
        <button onClick={showModal}>
          <img
            src="https://i.postimg.cc/HLC973gD/2023-07-06-224526.png"
            className="image w-20 h-auto"
            alt="Camera"
          />
        </button>
        {modalOpen && <Modal setModalOpen={setModalOpen} />}
      </div>
      <div className="text pt-2 text-center">
        <div>상품을 인식해 주세요!</div>
      </div>
    </div>
  );
}

export default ScanPage;
