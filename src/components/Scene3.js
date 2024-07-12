
import React, { useRef, useLayoutEffect } from "react";
import { Decal, useGLTF, useTexture } from "@react-three/drei";
import { useThree } from "@react-three/fiber";

import { state } from '../constants/store';

export default function Model3({ ...props }) {
  const group = useRef();
  const { nodes, materials } = useGLTF("/TShirt1.gltf");

  let camera = useThree((state) => state.camera);

  const fullTexture = useTexture(state.fullDecal); // full texture decal
  const logoTexture = useTexture(state.logoDecal);
  

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
        <group rotation={[Math.PI / 2, 0, 0]} scale={1.4}>
        <mesh
        castShadow
        geometry={nodes.T_Shirt_male.geometry}
        material={materials.lambert}
        material-roughness={1}
        dispose={null}>
        {state.isFullTexture && (
          <Decal
            position={[0, 0, 0]}
            rotation={[0, 0, 0]}
            scale={1}
            map={fullTexture}
          />
        )}

        {state.isLogoTexture && (
          <Decal
            position={[0, 0.04, 0.15]}
            rotation={[0, 0, 0]}
            scale={0.15}
            map={logoTexture}
            //map-anisotropy={16}
            depthTest={true}
        depthWrite={true}
          />
        )}
      </mesh>
         
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("/TShirt1.gltf");
