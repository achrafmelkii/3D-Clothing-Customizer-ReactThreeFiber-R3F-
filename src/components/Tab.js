import React from "react";
import { Html } from "@react-three/drei";
import styled from "styled-components";

const Tab = ({ tab, isFilterTab, isActiveTab, handleClick }) => {
  const Htmls = styled.div`
    //   position: absolute;
    // right: 5%;
    // top: 70%;
    //   transform: translateX(300px);
    //   transform: translateY(50px);
    cursor: pointer;
  `;

  return (
    <Htmls>
      <div
        key={tab.name}
        className={`tab-btn ${
          isFilterTab ? "rounded-full glassmorphism" : "rounded-4"
        }`}
        onClick={handleClick}
        //   style={activeStyles}
      >
        <img
          src={tab.icon}
          alt={tab.name}
          className={`${
            isFilterTab ? "w-2/3 h-2/3" : "w-11/12 h-11/12 object-contain"
          }`}
        />
      </div>
    </Htmls>
  );
};

export default Tab;
