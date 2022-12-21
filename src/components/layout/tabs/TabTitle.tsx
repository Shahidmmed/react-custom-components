import React, { useState } from "react";

type Props = {
  title: string;
  index: number;
  isActive: boolean;
  setSelectedTab: (index: number) => void;
};

const TabTitle: React.FC<Props> = ({
  title,
  setSelectedTab,
  isActive,
  index,
}) => {
  return (
    <li className="mr-2">
      <a
        href="#"
        className={`${
          isActive ? "text-blue-600 border-blue-600" : "border-transparent"
        } inline-block p-4 rounded-t-lg border-b-2  hover:text-gray-600`}
        onClick={() => setSelectedTab(index)}
      >
        {title}
      </a>
    </li>
  );
};

export default TabTitle;
