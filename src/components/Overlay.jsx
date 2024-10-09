import { Scroll, useScroll } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useState } from "react";
import Interface from "./Interface";

const Section = (props) => {
  const { aspectRatio, right, opacity } = props;

  return (
    <section
      className={`h-screen flex ${
        aspectRatio < 1 ? "flex-row items-end" : `flex-col ${right ? "items-end" : "items-start"}`
      } justify-center p-10 cursor-text`}
      style={{ opacity: opacity + 0.3 }}
    >
      <div className={`${aspectRatio < 1 ? "w-full max-h-[50%]" : " w-1/2"} flex justify-center`}>
        <div className="max-w-sm w-full bg-white bg-opacity-15 backdrop-blur-md shadow-md rounded-lg p-8">
          {props.children}
        </div>
      </div>
    </section>
  );
};

export const Overlay = () => {
  const scroll = useScroll();
  const size = useThree((state) => state.size);
  const [firstOpacity, setFirstOpacity] = useState(1);
  const [secondOpacity, setSecondOpacity] = useState(1);
  const [thirdOpacity, setThirdOpacity] = useState(1);

  const aspectRatio = size.width / size.height;

  useFrame(() => {
    setFirstOpacity(1 - scroll.range(0, 1 / 4));
    setSecondOpacity(scroll.curve(1 / 4, 1 / 4));
    setThirdOpacity(scroll.curve(2 / 4, 1 / 4));
  });

  return (
    <Scroll html>
      <div className="w-screen">
        <Section opacity={firstOpacity} aspectRatio={aspectRatio}>
          <h1 className="font-semibold  text-2xl text-[#1a1a40]">Lightning-Fast Performance ⚡</h1>
          <p className="text-[#4b0082]">
            Speed meets precision. Our keyboard delivers unmatched responsiveness and the fastest
            performance. Experience every keystroke with power and accuracy.
          </p>
        </Section>
        <Section right opacity={secondOpacity} aspectRatio={aspectRatio}>
          <h1 className="font-semibold text-2xl text-[#1a1a40]">Designed for Your Comfort 🖐️ </h1>
          <p className="text-[#4b0082]">
            Crafted for perfection, engineered for comfort. Our ergonomic design keeps you typing
            longer, without fatigue. Every key is thoughtfully placed for effortless typing.
          </p>
        </Section>
        <Section opacity={thirdOpacity} aspectRatio={aspectRatio}>
          <h1 className="font-semibold text-2xl text-[#1a1a40]">
            Built to Last, Ready for Anything 💪
          </h1>
          <p className="text-[#4b0082]">
            Durability you can trust. Whether you're gaming or working, our keyboard stands the test
            of time with rugged construction and superior reliability.
          </p>
        </Section>
        <Interface aspectRatio={aspectRatio} />
      </div>
    </Scroll>
  );
};
