import React from "react";

const Title = ({ title, secondary }) => {
  return (
    <h1
      className={`{text-xl lg:text-4xl md:text-3xl font-bold ${!secondary ? "text-white" : "text-black"} filter
         drop-shadow-md`}
    >
      {title}
    </h1>
  );
};

export default Title;
