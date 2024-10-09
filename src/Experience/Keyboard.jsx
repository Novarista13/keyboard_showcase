import * as THREE from "three";

import { useCallback, useEffect, useMemo, useRef } from "react";

import { useGLTF } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";

import useKeyboardAnimation from "../hooks/useKeyboardAnimation";
import useKeyboardScrollAnimation from "../hooks/useKeyboardScrollAnimation";
import useConfigurator from "../stores/useConfigurator";
import { useControls } from "leva";
import useScrollEnd from "../hooks/useScrollEnd";
import { useResponsiveScale, useResponsiveX, useResponsiveY } from "../hooks/useResponsive";

const WhiteKeys = ({ nodes, material }) => {
  const { whiteKeyColor } = useConfigurator();
  material.toneMapped = false;

  useEffect(() => {
    material.color = new THREE.Color(whiteKeyColor);
  }, [whiteKeyColor]);

  return (
    <>
      <mesh
        name="whiteKeys"
        geometry={nodes.whiteKeys.geometry}
        material={material}
        position={[-0.067, 0, 0.015]}
        rotation={[0.052, 0, 0]}
        scale={0.5}
      />
      <mesh
        name="whiteKey_1"
        geometry={nodes.whiteKey_1.geometry}
        material={material}
        position={[-0.049, 0.001, -0.015]}
        rotation={[0.052, 0, 0]}
        scale={0.5}
      />
      <mesh
        name="whiteKey_2"
        geometry={nodes.whiteKey_2.geometry}
        material={material}
        position={[-0.02, 0.001, -0.015]}
        rotation={[0.052, 0, 0]}
        scale={0.5}
      />
      <mesh
        name="whiteKey_3"
        geometry={nodes.whiteKey_3.geometry}
        material={material}
        position={[-0.072, 0.001, 0]}
        rotation={[0.052, 0, 0]}
        scale={0.5}
      />
      <mesh
        name="whiteKey_4"
        geometry={nodes.whiteKey_4.geometry}
        material={material}
        position={[-0.058, 0.001, 0]}
        rotation={[0.052, 0, 0]}
        scale={0.5}
      />
      <mesh
        name="whiteKey_5"
        geometry={nodes.whiteKey_5.geometry}
        material={material}
        position={[-0.029, 0.001, 0]}
        rotation={[0.052, 0, 0]}
        scale={0.5}
      />
      <mesh
        name="whiteKey_6"
        geometry={nodes.whiteKey_6.geometry}
        material={material}
        position={[-0.001, 0.001, 0]}
        rotation={[0.052, 0, 0]}
        scale={0.5}
      />
      <mesh
        name="whiteKey_7"
        geometry={nodes.whiteKey_7.geometry}
        material={material}
        position={[0.028, 0.001, 0]}
        rotation={[0.052, 0, 0]}
        scale={0.5}
      />
      <mesh
        name="whiteKey_8"
        geometry={nodes.whiteKey_8.geometry}
        material={material}
        position={[-0.039, 0, 0.015]}
        rotation={[0.052, 0, 0]}
        scale={0.5}
      />
      <mesh
        name="whiteKey_9"
        geometry={nodes.whiteKey_9.geometry}
        material={material}
        position={[-0.01, 0, 0.015]}
        rotation={[0.052, 0, 0]}
        scale={0.5}
      />
    </>
  );
};

const DarkKeys = ({ nodes, material }) => {
  const { darkKeyColor } = useConfigurator();
  material.toneMapped = false;

  useEffect(() => {
    material.color = new THREE.Color(darkKeyColor);
  }, [darkKeyColor]);

  return (
    <>
      <mesh
        name="darkKeys"
        geometry={nodes.darkKeys.geometry}
        material={material}
        position={[-0.095, 0.002, -0.015]}
        rotation={[0.052, 0, 0]}
        scale={0.5}
      />
      <mesh
        name="space"
        geometry={nodes.space.geometry}
        material={material}
        position={[-0.01, 0, 0.03]}
        rotation={[0.052, 0, 0]}
        scale={0.5}
      />
    </>
  );
};

const Plate = ({ nodes, switchMaterial, switchBottomMaterial }) => {
  const { plateColor } = useConfigurator();
  switchMaterial.toneMapped = false;

  useEffect(() => {
    switchMaterial.color = new THREE.Color(plateColor);
  }, [plateColor]);

  return (
    <>
      <mesh
        name="plate"
        geometry={nodes.plate.geometry}
        material={switchMaterial}
        position={[0.001, -0.013, -0.001]}
      />

      <group
        name="switches"
        position={[-0.001, -0.006, -0.001]}
        rotation={[-3.089, 0, 0]}
        scale={0.5}
      >
        <mesh
          name="Cube010"
          castShadow
          receiveShadow
          geometry={nodes.Cube010.geometry}
          material={switchMaterial}
        />
        <mesh
          name="Cube010_1"
          castShadow
          receiveShadow
          geometry={nodes.Cube010_1.geometry}
          material={switchBottomMaterial}
        />
      </group>
    </>
  );
};

export default function Keyboard(props) {
  const keyboard = useRef();

  const { position, rotation } = useControls({
    position: { value: { x: 1.5, y: 0, z: 2 }, step: 0.01 },
    rotation: { value: { x: 1.05, y: -0.48, z: 0.09 }, step: 0.01 },
  });

  const { nodes, materials, animations } = useGLTF("./models/keyboard.glb");

  // key caps animation
  useCallback(() => {
    useKeyboardAnimation(keyboard, animations);
  }, [keyboard, animations])();

  // whole keyboard animation
  useCallback(() => {
    useKeyboardScrollAnimation(keyboard);
  }, [keyboard])();

  // responsiveX function
  const responsiveX = useResponsiveX();
  const responsiveY = useResponsiveY();
  const responsiveScale = useResponsiveScale();

  return (
    <group
      ref={keyboard}
      {...props}
      position={[responsiveX(position.x), responsiveY(position.y), position.z]}
      rotation={[rotation.x, rotation.y, rotation.z]}
      scale={responsiveScale(13)}
      name="Scene"
    >
      <Plate
        nodes={nodes}
        switchMaterial={materials.switch}
        switchBottomMaterial={materials["switch bottom"]}
      />
      <WhiteKeys nodes={nodes} material={materials.keycaps2} />
      <DarkKeys nodes={nodes} material={materials.keycaps} />
    </group>
  );
}

useGLTF.preload("/models/keyboard.glb");
