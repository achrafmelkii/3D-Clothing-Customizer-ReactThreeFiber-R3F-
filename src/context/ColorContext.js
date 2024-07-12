import { useState } from "react";
import { createContext } from "react";
import { useGLTF } from '@react-three/drei';



export const ColorContext = createContext({});


export const ColorContextProvider = ({children}) => {


    
 
    const [currentColor, serCurrentColor] = useState({
        color:"#9BB5CE",
        text:"Sierra Blue",
        rgbColor:"155, 181, 206",
        currentobj:"/TShirt1.gltf"
    })

    let ChangeColorContext = (colorObj) => {
        console.log(colorObj)
        const { materials } = useGLTF(colorObj.currentobj);
        materials.lambert.color.set(colorObj.color);
          
        serCurrentColor(colorObj)
      }

    return(
        <ColorContext.Provider value={{currentColor, ChangeColorContext}} id="Colors">
            {children}
        </ColorContext.Provider>
    )

}