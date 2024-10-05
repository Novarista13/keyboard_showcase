import { Canvas } from "@react-three/fiber";
import { Experience } from "./Experience/Experience";
import { Leva } from "leva";

function App() {
  return (
    <>
      <Leva collapsed />
      <Canvas
        camera={{
          fov: 65,
        }}
      >
        <Experience />
      </Canvas>
    </>
  );
}

export default App;
