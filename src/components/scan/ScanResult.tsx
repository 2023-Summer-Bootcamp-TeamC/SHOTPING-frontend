import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaCheck } from "react-icons/fa";
import { FaUndoAlt } from "react-icons/fa";
import ScanList from "./ScanList";
import Feedback from "./Feedback";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export interface predictResultProps {
  id: number;
  product_name: string;
  product_price: number;
  image_url: string;
}

interface scanResultProps {
  onRetry: () => void;
  imgFormData: FormData | undefined;
  img: string | undefined;
}

export default function ScanResult({
  onRetry,
  imgFormData,
  img,
}: scanResultProps) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [dataId, setDataId] = useState<number>();
  const [predictData, setPredictData] = useState<predictResultProps[]>([]);
  const [feedback, setFeedback] = useState<string>("");
  const [feedbackBoolean, setFeedbackBoolean] = useState<boolean>();

  useEffect(() => {
    setLoading(true);
    axios
      .post("/api/v1/predict", imgFormData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log("이미지 파일 분석 성공");
        console.log(response.data);

        setDataId(response.data.data_id);
        setPredictData(response.data.outputProducts);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [imgFormData]);

  const handleBoolean = (boolean: boolean) => {
    setFeedbackBoolean(boolean);
  };

  const handleFeedback = (feedback: string) => {
    setFeedback(feedback);
  };

  console.log("dataId : ", dataId);
  console.log("predictData: ", predictData);
  console.log("feedback boolean값: ", feedbackBoolean);
  console.log("feedback 내용 : ", feedback);

  const clickEvent = () => {
    setLoading(true);
    if (feedbackBoolean !== undefined && feedback !== "") {
      axios
        .post("/api/v1/feedback", {
          data_id: dataId,
          iscorrect: feedbackBoolean,
          feedback_text: feedback,
        })
        .then((response) => {
          console.log(response);
          setLoading(false);
          navigate("/buy");
        });
    } else {
      console.log("그냥 제출!");
      navigate("/buy");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  } else {
    return (
      <div className="flex flex-col bg-white drop-shadow-xl border rounded-3xl w-[89.5rem] h-45rem justify-center items-center">
        <div className="grid grid-cols-2 gap-10 p-10 w-full h-45rem border-black">
          <div className="relative bg-blue-300">
            <img src={img} className="absolute w-full h-full"></img>
            <div className="absolute bottom-6 right-6 flex space-x-7">
              <motion.button
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                className="relative z-10"
                onClick={clickEvent}
              >
                <FaCheck className="w-14 h-14 text-gray-100 drop-shadow-xl" />
              </motion.button>
              <motion.button
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                className="relative z-10"
                onClick={onRetry}
              >
                <FaUndoAlt className="w-14 h-14 text-gray-100 drop-shadow-xl" />
              </motion.button>
            </div>
          </div>

          <div className="flex flex-col space-y-10">
            <div className="border row-end-3 row-span-2 rounded-3xl h-25rem p-4">
              <div className="overflow-y-auto scrollbar-hide scroll-smooth h-full">
                {predictData.map((predictData) => {
                  return (
                    <ScanList
                      id={predictData.id}
                      product_name={predictData.product_name}
                      product_price={predictData.product_price}
                      image_url={predictData.image_url}
                    />
                  );
                })}
              </div>
            </div>
            <div className="border rounded-3xl h-12.5rem p-5 bg-gray-100">
              <Feedback
                onSelectBoolean={handleBoolean}
                onSelectFeedback={handleFeedback}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
