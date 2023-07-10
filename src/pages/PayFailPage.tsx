import React from "react";
import PayButton from "../components/Pay/PayButton";
import PayText from "../components/Pay/PayText";
import payfail_image from "../components/images/payfail_image.png";
import { useNavigate } from "react-router-dom";

const flexColumnCenterStyle = () => {
  return "flex flex-col items-center justify-center h-screen";
};

const PayFailPage: React.FC = () => {
  const navigate = useNavigate(); // Get the navigate function from React Router

  const handleRetry = () => {
    // Logic for retrying payment
    console.log("다시 시도하기 button clicked");
  };

  const handleGoBack = () => {
    navigate("/main"); // Navigate to the "/main" route when the button is clicked
  };

  return (
    <div className={flexColumnCenterStyle()}>
      <img
        src={payfail_image}
        alt="Payment"
        style={{
          width: "7.5rem",
          height: "7.5rem",
          marginTop: "8.75rem",
          marginBottom: "1.875rem",
        }}
      />
      <PayText name="결제가 완료되지 않았습니다." />

      <div
        style={{
          marginRight: "35rem",
          marginTop: "6.25rem",
          marginBottom: "0.625rem",
        }}
      ></div>

      <PayButton
        variant="continue"
        name="다시 시도하기"
        onClick={() => {
          navigate("/buy");
        }}
      />
      <PayButton
        variant="detail"
        name="메인으로 돌아가기"
        onClick={() => {
          navigate("/");
        }}
      />
    </div>
  );
};

export default PayFailPage;
