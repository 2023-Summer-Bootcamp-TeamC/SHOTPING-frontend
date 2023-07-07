import React from "react";
import { motion } from "framer-motion";
import { useState } from "react";
import ScanStart from "../components/scan/ScanStart";

function ScanPage() {
  const [modalOpen, setModalOpen] = useState(false);

  const showModal = () => {
    setModalOpen(true);
  };
  return (
    <div className="align flex flex-col items-center justify-center min-h-screen">
      <ScanStart />
    </div>
  );
}

export default ScanPage;
