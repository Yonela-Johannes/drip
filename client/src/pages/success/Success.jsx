import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MaxWidthWrapper from "../../components/MaxWidthWrapper";

const Success = () => {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate('/orders')
    }, 3100)
  }, []);

  return (
    <MaxWidthWrapper>
      <div className="h-[50vh] flex items-center px-20 pt-20 md:pt-10  flex-col justify-center">
        <h1 className="text-lg md:text-4xl text-center">
          Payment successful. You are being redirected to the orders page.
        </h1>
        <h1 className="text-lg md:text-4xl text-center">Please do not close the page.</h1>
      </div>
    </MaxWidthWrapper>
  );
};

export default Success;
