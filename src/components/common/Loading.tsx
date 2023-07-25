import Lottie from "lottie-react";
import lottie from "../../assets/lottie/LoadingLottie.json";
import React from "react";

export default function Loading() {
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Lottie className="max-w-[15rem]" animationData={lottie} />
    </div>
  );
}
