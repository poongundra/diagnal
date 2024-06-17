import React from "react";

export const Pagetitle = ({ title }) => {
  return (
    <div>
      <div className="flex gap-2 text-xl">
        <div className=" ml-2 bg-[#171717">{title}</div>
      </div>
    </div>
  );
};
