import { Canvas } from "@react-three/fiber";
import { Experience } from "./Experience/Experience";
import { Leva } from "leva";
import { Suspense } from "react";
import Loading from "./components/Loading";
import Credit from "./components/Credit";

function App() {
  return (
    <>
      <Leva collapsed hidden={!(window.location.hash === "#debug")} />

      <Suspense fallback={<Loading />}>
        <Canvas
          camera={{
            fov: 65,
          }}
        >
          <Experience />
        </Canvas>
        <Credit />
      </Suspense>
    </>
  );
}

export default App;
