import React, { useRef, useEffect, useLayoutEffect } from "react";
import { useGLTF, useTexture } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import * as THREE from "three";

const INITIAL_MTL = new THREE.MeshPhongMaterial({
    color: new THREE.Color(0xf1f1f1),
    shininess: 10
});

const INITIAL_MAP = [
    { childID: "Object_1", mtl: INITIAL_MTL },
    { childID: "Object_2", mtl: INITIAL_MTL },
    { childID: "Object_3", mtl: INITIAL_MTL },
    { childID: "Object_4", mtl: INITIAL_MTL },
];

const initColor = (parent, type, mtl) => {
    parent.traverse(o => {
        if (o.isMesh && o.name.includes(type)) {
            o.castShadow = true;
            o.receiveShadow = true;
            o.material = mtl;
            o.nameID = type;
        }
    });
};

export default function ChairMesh({ newMaterialOpt, logoTexture, logoPosition, ...props }) {
    const group = useRef();
    const { scene: theModel } = useGLTF("/AVATAR.gltf");
    const { camera } = useThree();

    useLayoutEffect(() => {
        camera.position.set(-0.1, 0.4, 5);
        if (window.matchMedia("(max-width: 48em)").matches) {
            camera.fov = 18;
            camera.updateProjectionMatrix();
        }
    }, [camera]);

    useEffect(() => {
        if (theModel) {
            INITIAL_MAP.forEach(object => {
                initColor(theModel, object.childID, object.mtl);
            });
        }
    }, [theModel]);

    useEffect(() => {
        if (newMaterialOpt.newMTL) {
            setMaterial(newMaterialOpt.activeOption, newMaterialOpt.newMTL);
        }
    }, [newMaterialOpt.newMTL, newMaterialOpt.activeOption]);

    useEffect(() => {
        if (logoTexture && theModel) {
            const logoMesh = theModel.getObjectByName("Object_1"); // Adjust to your mesh name
            if (logoMesh) {
                logoTexture.offset.set(logoPosition.x, logoPosition.y);
                logoTexture.repeat.set(0.1, 0.1);
                logoMesh.material.map = logoTexture;
                logoMesh.material.needsUpdate = true;
            }
        }
    }, [logoTexture, logoPosition, theModel]);

    const setMaterial = (type, mtl) => {
        theModel.traverse(o => {
            if (o.isMesh && o.nameID != null && o.nameID === type) {
                o.material = mtl;
            }
        });
    };

    return (
        <group ref={group} {...props} dispose={null}>
            <group rotation={[0, -Math.PI, 0]}>
            <primitive
                object={theModel}
                scale={[0.5, 0.5, 0.5]}
                rotation={[0, Math.PI, 0]}
                position={[0, -0.5, 0]}
                receiveShadow
                castShadow
            />
            </group>
        </group>
    );
}

useGLTF.preload("/AVATAR.gltf");
