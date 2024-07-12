import DesignSection from "./sections/DesignSection";
import DisplaySection from "./sections/DisplaySection";
import HeroSection from "./sections/HeroSection";
import PhoneModel from "./sections/PhoneModel";
import Quote from "./sections/Quote";
import { GlobalStyle } from "./styles/GlobalStyle";
import ProcessorSection from "./sections/ProcessorSection";
import BatterySection from "./sections/BatterySection";
import ColorSection from "./sections/ColorSection";
import CameraSection from "./sections/CameraSection";
import PricingSection from "./sections/PricingSection";
import { ColorContextProvider } from "./context/ColorContext";
import React, { useState, useEffect } from "react";

import FilePicker from  "./components/FilePicker"

function App() {

  const [file, setFile] = useState("");
  const reader = (file) =>
    new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.onload = () => resolve(fileReader.result);
      fileReader.readAsDataURL(file);
    });

  const readFile = (type) => {
    reader(file).then((result) => {
    
   
    });
  };
  return (
    <>
      <GlobalStyle />
      <Quote />
      {/* <FilePicker file={file} setFile={setFile} readFile={readFile} /> */}
      <PhoneModel />
       <HeroSection /> {/*// video yourstyle your way */}
      <DesignSection />{/*// your imaginatio nmeets reality*/}
      <DisplaySection /> {/*// use ai to add */}
      <ProcessorSection /> {/*// ai image */}
         {/* <CameraSection /> */}
      <BatterySection />
      <ColorContextProvider>
     
        <ColorSection />

     
        <PricingSection />
      </ColorContextProvider>
     
    </>
  );
}

export default App;
