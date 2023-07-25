import { useState } from "react";
import ScanStart from "../components/scan/ScanStart";
import Scanning from "../components/scan/Scanning";
import ScanResult from "../components/scan/ScanResult";

function ScanPage() {
  const [isScan, setIsScan] = useState(false);
  const [isResult, setIsResult] = useState(false);
  const [imgFormData, setImgFormData] = useState<FormData>();
  const [image, setImage] = useState<string>();

  const handleStartScan = () => {
    setIsScan(true);
    setIsResult(false);
  };

  const handleScanComplete = () => {
    setIsScan(false);
    setIsResult(true);
  };

  const handleFormData = (file: FormData) => {
    if (file) {
      setImgFormData(file);
    }
  };

  const handleImage = (image: string) => {
    if (image) {
      setImage(image);
    }
  };

  const handleRetry = () => {
    setIsScan(false);
    setIsResult(false);
  };

  return (
    <div className="flex flex-col items-center justify-center h-full">
      {!isScan && !isResult && <ScanStart onStartScan={handleStartScan} />}
      {isScan && !isResult && (
        <Scanning
          onCompleteScan={handleScanComplete}
          onImgFormData={handleFormData}
          onImage={handleImage}
        />
      )}
      {!isScan && isResult && (
        <ScanResult
          onRetry={handleRetry}
          imgFormData={imgFormData}
          img={image}
        />
      )}
    </div>
  );
}

export default ScanPage;
