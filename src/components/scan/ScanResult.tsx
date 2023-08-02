import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaCheck } from "react-icons/fa";
import { FaUndoAlt } from "react-icons/fa";
import ScanList from "./ScanList";
import Loading from "../common/Loading";
import Feedback from "./Feedback";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
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
  product_stock: number;
  image_url: string;
  quantity: number;
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
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1536);

  const dispatch = useDispatch();
  let alertShown = false;

  const productList = useSelector((state: RootState) => {
    return state.buylist.products;
  });

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1536);
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
        if (response.data.outputProducts.length === 0) {
          navigate("/scanfail");
        }
      })
      .catch((error) => {
        navigate("/scanfail");
      });
  }, [imgFormData]);

  const handleBoolean = (boolean: boolean) => {
    setFeedbackBoolean(boolean);
  };

  const handleFeedback = (feedback: string) => {
    setFeedback(feedback);
  };

  const uniqueProducts: predictResultProps[] = [];
  predictData.forEach((product) => {
    const existingProduct = uniqueProducts.find(
      (item) => item.product_name === product.product_name,
    );

    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      uniqueProducts.push({ ...product, quantity: 1 });
    }
  });

  //console.log("uniqueProducts", uniqueProducts);

  const clickEvent = () => {
    setLoading(true);
    if (feedbackBoolean !== undefined) {
      axios
        .post("/api/v1/feedback", {
          data_id: dataId,
          iscorrect: feedbackBoolean,
          feedback_text: feedback,
        })
        .then((response) => {
          setLoading(false);
          uniqueProducts.map((product) => {
            if (product.product_stock === 0 && !alertShown) {
              alert("품절된 상품이 있습니다. 품절된 상품은 제외됩니다.");
              alertShown = true;
            } else {
              const currentListItem = productList.filter(
                (item) => item.product_name === product.product_name,
              );

              // console.log("currentListItem", currentListItem);

              if (currentListItem.length != 0) {
                if (
                  currentListItem[0].quantity !== product.product_stock &&
                  currentListItem[0].quantity + product.quantity >
                    product.product_stock
                ) {
                  alert(
                    "재고가 부족하여 남은 최대 재고 수만큼 물건이 담깁니다.",
                  );
                  dispatch(
                    addProduct({
                      id: product.id,
                      product_name: product.product_name,
                      product_price: product.product_price,
                      stock: product.product_stock,
                      image_url: product.image_url,
                      selected: true,
                      quantity:
                        product.product_stock - currentListItem[0].quantity,
                    }),
                  );
                  alertShown = true;
                } else if (
                  currentListItem[0].quantity === product.product_stock
                ) {
                  alert(
                    "재고가 부족하여 더 이상 담을 수 없는 물건이 있습니다.",
                  );
                  alertShown = true;
                } else {
                  dispatch(
                    addProduct({
                      id: product.id,
                      product_name: product.product_name,
                      product_price: product.product_price,
                      stock: product.product_stock,
                      image_url: product.image_url,
                      selected: true,
                      quantity: product.quantity,
                    }),
                  );
                }
              } else {
                dispatch(
                  addProduct({
                    id: product.id,
                    product_name: product.product_name,
                    product_price: product.product_price,
                    stock: product.product_stock,
                    image_url: product.image_url,
                    selected: true,
                    quantity: product.quantity,
                  }),
                );
              }

              navigate("/buy");
            }
          });
        });
    } else {
      uniqueProducts.map((product) => {
        if (product.product_stock === 0 && !alertShown) {
          alert("품절된 상품이 있습니다. 품절된 상품은 제외됩니다.");
          alertShown = true;
        } else {
          const currentListItem = productList.filter(
            (item) => item.product_name === product.product_name,
          );

          // console.log("currentListItem", currentListItem);

          if (currentListItem.length != 0) {
            if (
              currentListItem[0].quantity !== product.product_stock &&
              currentListItem[0].quantity + product.quantity >
                product.product_stock
            ) {
              alert("재고가 부족하여 남은 최대 재고 수만큼 물건이 담깁니다.");
              dispatch(
                addProduct({
                  id: product.id,
                  product_name: product.product_name,
                  product_price: product.product_price,
                  stock: product.product_stock,
                  image_url: product.image_url,
                  selected: true,
                  quantity: product.product_stock - currentListItem[0].quantity,
                }),
              );
              alertShown = true;
            } else if (currentListItem[0].quantity === product.product_stock) {
              alert("재고가 부족하여 더 이상 담을 수 없는 물건이 있습니다.");
              alertShown = true;
            } else {
              dispatch(
                addProduct({
                  id: product.id,
                  product_name: product.product_name,
                  product_price: product.product_price,
                  stock: product.product_stock,
                  image_url: product.image_url,
                  selected: true,
                  quantity: product.quantity,
                }),
              );
            }
          } else {
            dispatch(
              addProduct({
                id: product.id,
                product_name: product.product_name,
                product_price: product.product_price,
                stock: product.product_stock,
                image_url: product.image_url,
                selected: true,
                quantity: product.quantity,
              }),
            );
          }

          navigate("/buy");
        }
      });
    }
  };

  const onRetryClickEvent = () => {
    setLoading(true);
    if (feedbackBoolean !== undefined) {
      axios
        .post("/api/v1/feedback", {
          data_id: dataId,
          iscorrect: feedbackBoolean,
          feedback_text: feedback,
        })
        .then((response) => {
          setLoading(false);
          onRetry();
        });
    } else {
      onRetry();
    }
  };

  if (loading) {
    return <Loading />;
  } else {
    return (
      <div className="flex flex-col bg-white drop-shadow-xl border rounded-3xl w-[44rem] 2xl:w-[89.5rem] h-45rem justify-center items-center transition-all duration-700">
        <div className="grid grid-cols-2 gap-10 p-10 w-full h-45rem border-black transition-all duration-700">
          {isMobile ? (
            <>
              <motion.button
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                className="absolute top-[25rem] mt-7 right-28 z-10"
                onClick={clickEvent}
              >
                <FaCheck className="w-10 h-10 text-gray-500 drop-shadow-xl" />
              </motion.button>
              <motion.button
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                className="absolute top-[25rem] mt-7 right-12 z-10"
                onClick={onRetryClickEvent}
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
                  onClick={onRetryClickEvent}
                >
                  <FaUndoAlt className="w-14 h-14 text-gray-100 drop-shadow-xl" />
                </motion.button>
              </div>
            </div>
          )}
          <div className="flex flex-col space-y-16 2xl:space-y-10 transition-all duration-700">
            <div className="border row-end-3 row-span-2 rounded-3xl w-[39rem] h-[23.5rem] 2xl:w-full 2xl:h-[25rem] p-4 transition-all duration-700">
              <div className="overflow-y-auto scrollbar-hide scroll-smooth w-[37rem] h-[20rem] 2xl:w-full 2xl:h-full transition-all duration-700">
                {uniqueProducts.map((predictData) => {
                  return (
                    <ScanList
                      id={predictData.id}
                      product_name={predictData.product_name}
                      product_price={predictData.product_price}
                      product_stock={predictData.product_stock}
                      image_url={predictData.image_url}
                      quantity={predictData.quantity}
                    />
                  );
                })}
              </div>
            </div>
            <div className="border rounded-3xl w-[39rem] h-12.5rem p-5 bg-gray-100 2xl:w-[41rem]">
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
