import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Canvas, useThree } from "@react-three/fiber";
import { Suspense } from "react";
import Model3 from "../components/Scene3";
import Model4 from "../components/Scene4";
import Model5 from "../components/Scene5";
import ChairMesh from "../components/FullModel";
import {
  AdaptiveDpr,
  AdaptiveEvents,
  Environment,
  Html,
} from "@react-three/drei";
import { OrbitControls } from "@react-three/drei";
import { useRef } from "react";
import { useContext } from "react";
import { ColorContext } from "./../context/ColorContext";

import { COLORS } from "../constants/colors";
import ColorsSlider from "../components/ColorSlider";
import * as THREE from "three";

import { state, FilterTabs } from "../constants/store";
import Tab from "../components/Tab";
import AIPicker from "../components/AIPicker";
import FilePicker from "../components/FilePicker";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  position: relative;
  z-index: 1;

  background-color: var(--white);
  overflow: hidden;
`;
const Section = styled.div`
  width: 100vw;
  height: 100vh;
  position: relative;
  z-index: 1;

  background-color: "#9BB5CE";
`;
const Phone = styled.div`
  width: 100%;
  height: 70%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  position: relative;
  cursor: grab;
`;

const Colors = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  position: absolute;
  left: 5%;
  top: 50%;
  transform: translate(-50%, -50%);

  @media screen and (max-width: 64em) {
    left: 10%;
  }
`;

const Skins = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  position: absolute;
  right: 5%;
  top: 40%;
  transform: translate(-50%, -50%);

  @media screen and (max-width: 64em) {
    right: 10%;
  }
`;

const Skins1 = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  position: absolute;
  right: 10%;
  top: 40%;
  transform: translate(-50%, -50%);

  @media screen and (max-width: 64em) {
    right: 15%;
  }
`;

const OptionsMenu = styled.div`
  list-style: none;
  width: 1.5rem;
  height: 1.5rem;

  border-radius: 50%;

  .option {
    margin: 0.5rem;
    cursor: pointer;
    transition: transform 0.3s;

    &.--is-active {
      transform: scale(1.1);
    }
  }

  img {
    width: 50px;
    height: 50px;
  }
`;

const Color = styled.li`
  list-style: none;
  width: 1.5rem;
  height: 1.5rem;
  cursor: pointer;

  border-radius: 50%;
  background-color: ${(props) => props.color};
  margin: 0.5rem 0;

  border: 1px solid var(--dark);
`;
const Details = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h2`
  font-size: var(--fontxl);
  padding: 0.3rem;
`;

const SubTitle = styled.h2`
  font-size: var(--fontmd);
  font-family: var(--fontR);
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 1rem;
`;

const Btn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;

  margin: 0;
  padding: 0.4rem 1rem;
  border-radius: 50px;

  border: none;
  outline: none;

  background-color: var(--blue);
  color: var(--white);
  cursor: pointer;

  &:hover {
    opacity: 0.7;
  }
`;
const BtnLink = styled.a`
  color: var(--blue);
  text-decoration: none;
  margin-left: 1.5rem;

  &:hover {
    text-decoration: underline;
  }
`;

const IndicatorText = styled.div`
  font-size: var(--fontsm);
  position: absolute;
  top: 1rem;
`;
const options = [
  {
    name: "Object_1",
    img: "/img/tshirt.svg",
  },
  {
    name: "Object_3",
    img: "/img/pant.svg",
  },
  {
    name: "Object_2",
    img: "/img/shoe.svg",
  },
  {
    name: "Object_4",
    img: "/img/body.svg",
  },
  // {
  //     name:"Object_4",
  //     img: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/1376484/back.svg"},
];

const options1 = [
  {
    name: "Object_1",
    img: "/img/maqette.svg",
  },
  {
    name: "Object_4",
    img: "/img/tshirt.svg",
  },
  {
    name: "Object_3",
    img: "/img/pant.svg",
  },
  {
    name: "Object_2",
    img: "/img/shoe.svg",
  },
  // {
  //     name:"Object_4",
  //     img: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/1376484/back.svg"},
];

const DecalTypes = {
  logo: {
    stateProperty: "logoDecal",
    filterTab: "logoShirt",
  },
  full: {
    stateProperty: "fullDecal",
    filterTab: "stylishShirt",
  },
};

const FilterMenu = styled.div`
  list-style: none;
  width: 3rem;
  height: 3rem;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  position: absolute;
  right: 15%;
  top: 50%;
  transform: translateX(-50%) translateY(-50%);
  img {
    width: 70px;
    height: 70px;
  }
`;

export const OptionsMenuComponent = ({ activeOption, setActiveOption }) => {
  return (
    <OptionsMenu>
      {options.map(({ name, img }) => (
        <div
          className={`option1 ${activeOption === name ? "--is-active" : ""}`}
          data-option={name}
          onClick={() => setActiveOption(name)}
          key={name}>
          <img src={img} alt={name} />
        </div>
      ))}
    </OptionsMenu>
  );
};
export const OptionsMenuFilterTabs = ({
  activeFilterTab,
  handleActiveFilterTab,
}) => {
  return (
    <FilterMenu>
      {" "}
      {FilterTabs.map((tab) => (
        <Tab
          key={tab.name}
          tab={tab}
          // isFilterTab
          isActiveTab={activeFilterTab[tab.name]}
          handleClick={() => handleActiveFilterTab(tab.name)}
        />
      ))}
    </FilterMenu>
  );
};

export const OptionsMenuComponent1 = ({ activeOption, setActiveOption }) => {
  return (
    <OptionsMenu>
      {options1.map(({ name, img }) => (
        <div
          className={`option ${activeOption === name ? "--is-active" : ""}`}
          data-option={name}
          onClick={() => setActiveOption(name)}
          key={name}>
          <img src={img} alt={name} />
        </div>
      ))}
    </OptionsMenu>
  );
};

const PricingSection = () => {
  const sectionRef = useRef(null);
  const [activeOption, setActiveOption] = useState("Object_1");
  const [activeOption1, setActiveOption1] = useState("Object_1");
  const [activeFilterOption, setActiveFilterOption] = useState("Object_1");

  const [newMaterialOpt, setNewMaterialOpt] = useState({
    activeOption,
    newMTL: null,
  });

  const [file, setFile] = useState("");
  const [prompt, setPrompt] = useState("");
  const [generatingImg, setGeneratingImg] = useState(false);

  const [activeFilterTab, setActiveFilterTab] = useState({
    logoShirt: true,
    stylishShirt: false,
  });

  //toggle on n off the filter tabs

  const handleActiveFilterTab = (tabName) => {
    switch (tabName) {
      case "logoShirt":
        state.isLogoTexture = !activeFilterTab[tabName];
        break;
      case "stylishShirt":
        state.isFullTexture = !activeFilterTab[tabName];
        break;
      default:
        state.isLogoTexture = true;
        state.isFullTexture = false;
        break;
    }

    // after setting the state, activeFilterTab is updated

    setActiveFilterTab((prevState) => {
      return {
        ...prevState,
        [tabName]: !prevState[tabName],
      };
    });
    console.log("working");
  };

  const handleDecals = (type, result) => {
    const decalType = DecalTypes[type];

    state[decalType.stateProperty] = result;

    if (!activeFilterTab[decalType.filterTab]) {
      handleActiveFilterTab(decalType.filterTab);
    }
  };

  const handleSubmit = async (type) => {
    if (!prompt) return alert("Please enter a prompt");

    try {
      setGeneratingImg(true);

      const response = await fetch("http://localhost:8080/api/v1/dalle/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt,
        }),
      });

      const data = await response.json(); //uncomment
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);

      handleDecals(type, url);
      setGeneratingImg(false);

      handleDecals(type, `data:image/png;base64,${data.photo}`); //uncomment
      handleDecals(type, `data:image/jpeg,${data}`); //uncomment
    } catch (error) {
      alert(error);
    } finally {
      setGeneratingImg(false);
      //setActiveEditorTab("");
    }
  };

  const reader = (file) =>
    new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.onload = () => resolve(fileReader.result);
      console.log(file);
      if (file !== "") fileReader.readAsDataURL(file);
    });

  const readFile = (type) => {
    reader(file).then((result) => {
      // Process the result as needed
      console.log(result);
      handleDecals(type, result);
    });
  };

  const selectSwatch = (e) => {
    let color = COLORS[parseInt(e.target.dataset.key)];
    let newMTL;

    if (color.texture) {
      let txt = new THREE.TextureLoader().load(color.texture);

      txt.repeat.set(color.size[0], color.size[1], color.size[2]);
      txt.wrapS = THREE.RepeatWrapping;
      txt.wrapT = THREE.RepeatWrapping;

      newMTL = new THREE.MeshPhongMaterial({
        map: txt,
        shininess: color.shininess ? color.shininess : 10,
      });
    } else {
      newMTL = new THREE.MeshPhongMaterial({
        color: parseInt("0x" + color.color),
        shininess: color.shininess ? color.shininess : 10,
      });
    }

    return setNewMaterialOpt({
      activeOption,
      newMTL,
    });
  };
  const { currentColor, ChangeColorContext } = useContext(ColorContext);

  useEffect(() => {
    sectionRef.current.style.backgroundColor = `rgba(${currentColor.rgbColor},0.4)`;
  }, [currentColor]);

  let updateColor = (color, text, rgbColor) => {
    let currentobj = "/TShirt1.gltf";
    console.log(activeOption1);
    switch (activeOption1) {
      case "Object_3":
        currentobj = "/pant.gltf";
        break;
      case "Object_2":
        currentobj = "/shoes.gltf";
        break;
    }

    let colorObj = {
      color,
      text,
      rgbColor,
      currentobj,
    };

    console.log(currentobj);
    ChangeColorContext(colorObj);
  };

  const renderFilterModel = () => {
    switch (activeOption1) {
      case "Object_1":
        return (
          <>
            <OptionsMenuFilterTabs
              activeFilterTab={activeFilterTab}
              handleActiveFilterTab={
                handleActiveFilterTab
              }></OptionsMenuFilterTabs>

            <FilePicker
              file={file}
              setFile={setFile}
              readFile={readFile}
              className
            />
            <AIPicker
              prompt={prompt}
              setPrompt={setPrompt}
              generatingImg={generatingImg}
              handleSubmit={handleSubmit}
            />
          </>
        );
    }
  };

  const renderModel = () => {
    switch (activeOption1) {
      case "Object_1":
        return <Model3 />;
      case "Object_2":
        return <Model5 />;
      case "Object_3":
        return <Model4 />;
      case "Object_4":
        return <ChairMesh newMaterialOpt={newMaterialOpt} />;
    }
  };
  const renderModel1 = () => {
    switch (activeOption1) {
      case "Object_4":
        return (
          <OptionsMenuComponent1
            activeOption={activeOption}
            setActiveOption={setActiveOption}></OptionsMenuComponent1>
        );
    }
  };
  const renderModel2 = () => {
    switch (activeOption1) {
      case "Object_4":
        return <ColorsSlider selectSwatch={selectSwatch} />;
    }
  };
  const renderModel3 = () => {
    switch (activeOption1) {
      case "Object_4":
        return;
      default:
        return (
          <Colors>
            <Color
              color="#9BB5CE"
              onClick={() =>
                updateColor("#9BB5CE", "Sierra Blue", "155, 181, 206")
              }
            />
            <Color
              color="#F9E5C9"
              onClick={() => updateColor("#F9E5C9", "Gold", "249, 229, 201")}
            />
            <Color
              color="#505F4E"
              onClick={() =>
                updateColor("#505F4E", "Alpine Green", "80, 95, 78")
              }
            />
            <Color
              color="#574f6f"
              onClick={() =>
                updateColor("#574f6f", "Deep Purple", "87, 79, 111")
              }
            />
            <Color
              color="#A50011"
              onClick={() => updateColor("#A50011", "Red", "165, 0, 17")}
            />
            <Color
              color="#215E7C"
              onClick={() => updateColor("#215E7C", "Blue", "33, 94, 124")}
            />
          </Colors>
        );
    }
  };
  return (
    <Container id="Pricing">
      <Section ref={sectionRef}>
        <Phone>
          <IndicatorText>360&deg; &#x27F2; </IndicatorText>
          <Canvas camera={{ fov: 14 }}>
            <ambientLight intensity={1} />
            <directionalLight intensity={0.4} />
            <Suspense fallback={null}>{renderModel()}</Suspense>

            <Environment preset="night" />
            <AdaptiveDpr pixelated />
            <AdaptiveEvents />
            <OrbitControls enableZoom={false} />
          </Canvas>

          {renderModel3()}
          {/* colours */}
          <Skins>
            <OptionsMenuComponent
              activeOption={activeOption1}
              setActiveOption={setActiveOption1}></OptionsMenuComponent>
          </Skins>
          <Skins1>{renderModel1()}</Skins1>
          {renderFilterModel()}
        </Phone>

        {renderModel2()}
        {/* colour */}

        <Details>
          {/* <SubTitle>t-Shirt</SubTitle> */}
          {/* <Title>14 Pro Max</Title> */}
          <SubTitle>From $25*</SubTitle>
          <ButtonContainer>
            {/* <div >
      <div>
        <input
          id="file-upload"
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <label htmlFor="file-upload" className="filepicker-label">
          Upload File
        </label>

        <p className="mt-2 text-gray-500 text-xs truncate">
          {file === "" ? "No file selected" : file.name}
        </p>
      </div>

      <div className="mt-4 flex flex-wrap gap-3">
        <button
          handleClick={() => readFile("logo")}

        />
        <button
          handleClick={() => readFile("full")}
          />
      </div>
    </div> */}

            <Btn>Buy</Btn>
            <BtnLink href="#">Learn More &#x2192;</BtnLink>
          </ButtonContainer>
        </Details>
      </Section>
    </Container>
  );
};

export default PricingSection;
