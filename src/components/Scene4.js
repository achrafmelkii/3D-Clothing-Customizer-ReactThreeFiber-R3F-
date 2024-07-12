/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
author: DatSketch (https://sketchfab.com/DatSketch)
license: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
source: https://sketchfab.com/3d-models/apple-iphone-13-pro-max-4328dea00e47497dbeac73c556121bc9
title: Apple iPhone 13 Pro Max
*/

import React, { useRef, useLayoutEffect } from "react";
import { useGLTF } from "@react-three/drei";
import { useThree } from "@react-three/fiber";

export default function Model4({ ...props }) {
  const group = useRef();
  const { nodes, materials } = useGLTF("/pant.gltf");

  let camera = useThree((state) => state.camera);

  useLayoutEffect(() => {
    camera.position.set(-0.1,0.4,5);
    materials.lambert.color.set("#9BB5CE");
    
    if(window.matchMedia("(max-width: 48em)").matches){
      camera.fov = 18;
      camera.updateProjectionMatrix();
    }
        
  }, []);

  return (
    <group ref={group} {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <group rotation={[Math.PI / 2, 0, 0]} scale={1}>
        <mesh
        castShadow
        geometry={nodes.pant_male.geometry}
        material={materials.lambert}
        material-roughness={1}
        dispose={null}>
     
      </mesh>

        </group>
      </group>
    </group>
  );
}

useGLTF.preload("/pant.gltf");
