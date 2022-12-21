import React, { ReactElement, useState } from "react";

import TabTitle from "./TabTitle";

type Props = {
  children: ReactElement[];
};

const Tabs: React.FC<Props> = ({ children }) => {
  const [selectedTab, setSelectedTab] = useState(0);
  return (
    <div className="text-sm font-medium text-center text-gray-500 border-gray-200">
      <ul className="flex flex-wrap -mb-px border-b border-solid">
        {children.map((item, index) => (
          <TabTitle
            key={index}
            title={item.props.title}
            index={index}
            isActive={selectedTab === index}
            setSelectedTab={setSelectedTab}
          />
        ))}
      </ul>
      {children[selectedTab]}
    </div>
  );
};

export default Tabs;
