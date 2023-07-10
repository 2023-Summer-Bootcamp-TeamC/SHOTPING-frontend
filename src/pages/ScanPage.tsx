import React from "react";
import { motion } from "framer-motion";
import { useState } from "react";
import ScanStart from "../components/scan/ScanStart";
import Scanning from "../components/scan/Scanning";
import ScanResult from "../components/scan/ScanResult";

function ScanPage() {
  const [isScan, setIsScan] = useState(false);
  const [isResult, setIsResult] = useState(false);

  const handleStartScan = () => {
    setIsScan(true);
    setIsResult(false);
  };

  const handleScanComplete = () => {
    setIsScan(false);
    setIsResult(true);
  };

  const handleRetry = () => {
    setIsScan(false);
    setIsResult(false);
  };

  return (
    <div className="align flex flex-col items-center justify-center min-h-screen">
      {!isScan && !isResult && <ScanStart onStartScan={handleStartScan} />}
      {isScan && !isResult && <Scanning onCompleteScan={handleScanComplete} />}
      {!isScan && isResult && <ScanResult onRetry={handleRetry} />}
    </div>
  );
}

export default ScanPage;
