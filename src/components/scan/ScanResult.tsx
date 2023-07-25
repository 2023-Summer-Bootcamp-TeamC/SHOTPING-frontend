import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaCheck } from "react-icons/fa";
import { FaUndoAlt } from "react-icons/fa";
import ScanList from "./ScanList";
import Loading from "../common/Loading";
import Feedback from "./Feedback";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addProduct } from "../../store/ProductSlice";
import axios from "axios";

/* 
  상품 인식 결과 컴포넌트
  인식 결과를 리스트에 표시, 피드백 작성 
*/

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
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  const dispatch = useDispatch();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    setLoading(true);
    axios
      .post("/api/v1/predict", imgFormData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        setDataId(response.data.data_id);
        setPredictData(response.data.outputProducts);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        navigate("/scanfail");
      });
  }, [imgFormData]);

  const handleBoolean = (boolean: boolean) => {
    setFeedbackBoolean(boolean);
  };

  const handleFeedback = (feedback: string) => {
    setFeedback(feedback);
  };

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
          predictData.map((product) => {
            dispatch(
              addProduct({
                id: product.id,
                product_name: product.product_name,
                product_price: product.product_price,
                image_url: product.image_url,
                selected: false,
                quantity: 1,
              }),
            );
          });
          navigate("/buy");
        });
    } else {
      predictData.map((product) => {
        dispatch(
          addProduct({
            id: product.id,
            product_name: product.product_name,
            product_price: product.product_price,
            image_url: product.image_url,
            selected: false,
            quantity: 1,
          }),
        );
      });
      navigate("/buy");
    }
  };

  if (loading) {
    return <Loading />;
  } else {
    return (
      <div className="flex flex-col bg-white drop-shadow-xl border rounded-3xl w-[37rem] md:w-[89.5rem] h-45rem justify-center items-center">
        <div className="grid grid-cols-2 gap-10 p-10 w-full h-45rem border-black">
          {isMobile ? (
            <>
              <motion.button
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                className="absolute top-[25rem] mt-7 right-12 z-10"
                onClick={clickEvent}
              >
                <FaCheck className="w-10 h-10 text-gray-500 drop-shadow-xl" />
              </motion.button>
              <motion.button
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                className="absolute top-[25rem] mt-7 right-28 z-10"
                onClick={onRetry}
              >
                <FaUndoAlt className="w-10 h-10 text-gray-500 drop-shadow-xl" />
              </motion.button>
            </>
          ) : (
            <div className="relative bg-pink-300">
              <img src={img} className="absolute w-full h-full" />
              <div className="absolute bottom-8 right-6 flex space-x-7">
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
          )}
          <div className="flex flex-col space-y-16 md:space-y-10">
            <div className="border row-end-3 row-span-2 rounded-3xl w-[32rem] h-[23.5rem] md:w-full md:h-[25rem] p-4">
              <div className="overflow-y-auto scrollbar-hide scroll-smooth w-[30rem] h-[20rem] md:w-full md:h-full">
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
            <div className="border rounded-3xl w-[32rem] h-12.5rem p-5 bg-gray-100 md:w-[41rem]">
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
