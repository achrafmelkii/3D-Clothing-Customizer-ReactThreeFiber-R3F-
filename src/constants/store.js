
import { proxy } from "valtio";

// import logoShirt from "/logo-tshirt.png";
// import stylishShirt from "../assets/stylish-tshirt.png";
const state = proxy({

    
    // GLTFModel:'./shirt_baked.gltf',
    isLogoTexture: true,
    isFullTexture: false,
    logoDecal: './AIImage.png',
    fullDecal: './AIImage.png',
  
  });

  const FilterTabs = [
    {
      name: "logoShirt",
      icon: "./img/logo-tshirt.png",
    },
    {
      name: "stylishShirt",
      icon: "./img/stylish-tshirt.png",
    },
  ];
  
  
  export {state , FilterTabs} ;