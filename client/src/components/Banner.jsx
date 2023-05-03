import React from "react";

const Banner = ({ title, subtitle }) => {
  return (
    <div>
      <h1 className="font-extrabold text-[#222328] text-[32px]">{title}</h1>
      <p className="mt-2 text-[#666e75] text-[16px] max-w-[500px]">{subtitle}</p>
    </div>
  );
};

export default Banner;
