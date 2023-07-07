import React from "react";
import { motion } from "framer-motion";
import { useState } from "react";
import ScanStart from "../components/scan/ScanStart";
import Scanning from "../components/scan/Scanning";

function ScanPage() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="align flex flex-col items-center justify-center min-h-screen">
      {/* <ScanStart /> */}
      <Scanning />
    </div>
  );
}

export default ScanPage;
