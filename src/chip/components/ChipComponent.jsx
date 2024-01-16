import React from "react";
import CrossIcon from "../icons/CrossIcon";

import UserPlaceholder from "../images/user.png";

const ChipComponent = ({ userData, removeUserFromList, highlight }) => {
  return (
    <div
      className={`text-sm w-max rounded-full px-3 py-1 flex items-center space-x-1 ${highlight ? "bg-slate-300" : "bg-gray-200"
        }`}
    >
      <div className="w-5 h-5 rounded-full">
        <img src={UserPlaceholder} alt="" />
      </div>
      <div>{userData.name}</div>
      <div
        className="cursor-pointer"
        onClick={() => removeUserFromList(userData)}
      >
        <CrossIcon />
      </div>
    </div>
  );
};

export default ChipComponent;
