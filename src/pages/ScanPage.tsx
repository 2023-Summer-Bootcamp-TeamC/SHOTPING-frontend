import React from "react";
import { motion } from "framer-motion";
import { useState } from "react";
import ScanStart from "../components/scan/ScanStart";
import Scanning from "../components/scan/Scanning";
import ScanResult from "../components/scan/ScanResult";

function ScanPage() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="align flex flex-col items-center justify-center min-h-screen">
      {/* <ScanStart /> */}
      {/* <Scanning /> */}
      <ScanResult />
    </div>
  );
}

export default ScanPage;
