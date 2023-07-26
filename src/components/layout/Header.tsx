import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router";
import { persistor } from "../../index";

/**
 * 헤더 (상단바)
 */

export function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const purge = async () => {
    await persistor.purge();
  };

  return (
    <div className="sticky top-0 left-0 right-0 z-50 w-full h-20">
      <div className="flex flex-col px-5 pt-5 bg-white h-full">
        <div className="grow flex items-center ">
          <motion.button
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
            onClick={() => {
              if (location.pathname === "/pay") {
                purge();
                navigate("/");
              } else {
                navigate("/");
              }
            }}
          >
            <span className="text-[#ff0099] text-2xl font-sans font-bold">
              SHOTPING
            </span>
          </motion.button>

          <div className="flex pl-10 space-x-10">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => {
                if (location.pathname === "/pay") {
                  purge();
                  navigate("/scan");
                } else {
                  navigate("/scan");
                }
              }}
            >
              <div
                className={`hover:font-semibold text-lg ${
                  location.pathname === "/scan" ||
                  location.pathname === "/scanfail"
                    ? "text-[#ff0099] underline underline-offset-[6px] font-semibold"
                    : "text-black"
                }`}
              >
                상품인식
              </div>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => {
                if (location.pathname === "/pay") {
                  purge();
                  navigate("/list");
                } else {
                  navigate("/list");
                }
              }}
            >
              <div
                className={`hover:font-semibold text-lg ${
                  location.pathname === "/list" ||
                  location.pathname === "/searchresult"
                    ? "text-[#ff0099] underline underline-offset-[6px] font-semibold"
                    : "text-black"
                }`}
              >
                상품리스트
              </div>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => {
                if (location.pathname === "/pay") {
                  purge();
                  navigate("/buy");
                } else {
                  navigate("/buy");
                }
              }}
            >
              <div
                className={`hover:font-semibold text-lg ${
                  location.pathname === "/buy"
                    ? "text-[#ff0099] underline underline-offset-[6px] font-semibold"
                    : "text-black"
                }`}
              >
                결제
              </div>
            </motion.button>
          </div>
        </div>
        <div className="flex px-4 py-2 w-full border-b-2" />
      </div>
    </div>
  );
}
