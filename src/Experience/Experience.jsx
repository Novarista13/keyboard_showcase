import { OrbitControls, PresentationControls, ScrollControls } from "@react-three/drei";
import Keyboard from "./Keyboard";
import { Overlay } from "../components/Overlay";
import { useControls } from "leva";

export const Experience = () => {
  const { position, intensity } = useControls("light", {
    position: {
      value: { x: -0.8, y: 2.25, z: 3 },
      step: 0.01,
    },
    intensity: {
      value: 1,
      step: 0.01,
      min: 0,
      max: 5,
    },
  });

  return (
    <>
      <directionalLight
        castShadow
        position={[position.x, position.y, position.z]}
        intensity={intensity}
      />
      <ambientLight intensity={1} />

      {/* <OrbitControls makeDefault minPolarAngle={0} maxPolarAngle={Math.PI / 1.75} /> */}

      <ScrollControls pages={4} damping={0.25}>
        <Overlay />

        <Keyboard />
      </ScrollControls>
    </>
  );
};

{
  /* <mesh>
    <meshNormalMaterial />
    <boxBufferGeometry />
  </mesh> */
}
