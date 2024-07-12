// import { color } from "framer-motion";
import React from "react";

// import { useSnapshot } from "valtio";
// import state from "../store";

const CustomButton = ({ type, title, customStyles, handleClick }) => {
  //   const snap = useSnapshot(state);

  const generateStyle = (type) => {
    if (type === "filled") {
      return {
        // backgroundColor: snap.color,
        color: "#000",
      };
    } else if (type === "outline") {
      return {
        borderWidth: "1px",
        // borderColor: snap.color,
        color: "#000",
      };
    }
  };
  return (
    <button
      className="BTNClass"
      style={generateStyle(type)}
      onClick={handleClick}>
      {title}
    </button>
  );
};

export default CustomButton;
