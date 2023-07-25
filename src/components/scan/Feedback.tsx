import { useState } from "react";
import { motion } from "framer-motion";

/* 피드백 컴포넌트 */

interface feedbackProps {
  onSelectBoolean: (boolean: boolean) => void;
  onSelectFeedback: (feedback: string) => void;
}

export default function Feedback({
  onSelectBoolean,
  onSelectFeedback,
}: feedbackProps) {
  const [yesButtonColor, setYesButtonColor] = useState("");
  const [noButtonColor, setNoButtonColor] = useState("");

  const handleYesButtonClick = () => {
    setYesButtonColor("#FF0099");
    setNoButtonColor("");
    onSelectBoolean(true);
  };

  const handleNoButtonClick = () => {
    setNoButtonColor("#FF0099");
    setYesButtonColor("");
    onSelectBoolean(false);
  };

  return (
    <div className="flex flex-col space-y-3">
      <div className="flex flex-col">
        <span className="text-lg">인식이 잘 되었나요?</span>
        <div className="flex mt-1">
          <motion.button
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
            onClick={handleYesButtonClick}
          >
            <span
              className="text-3xl font-bold"
              style={{ color: yesButtonColor }}
            >
              YES
            </span>
          </motion.button>
          <div className="mx-4"></div>
          <motion.button
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
            onClick={handleNoButtonClick}
          >
            <span
              className="text-3xl font-bold"
              style={{ color: noButtonColor }}
            >
              NO
            </span>
          </motion.button>
        </div>
      </div>
      <div className="flex flex-col">
        <div className="text-lg">피드백을 자유롭게 남겨주세요!</div>
        <input
          className="border rounded-lg p-2 mt-2 px-2 focus:outline-none"
          type="text"
          onChange={(event) => onSelectFeedback(event.target.value)}
        ></input>
      </div>
    </div>
  );
}
