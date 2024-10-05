import { useRef, useLayoutEffect } from "react";
import { useThree, useFrame, useLoader } from "@react-three/fiber";
import { useScroll } from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";

export const SECTION_HEIGHT = 1.5;
export const NB_SECTIONS = 4;

const useKeyboardScrollAnimation = (keyboard, soundFile = "./audio/swoosh.wav") => {
  const viewport = useThree((state) => state.viewport);
  const camera = useThree((state) => state.camera);
  const target = useRef(new THREE.Vector3(0, 0, 0));
  const scroll = useScroll();
  const tl = useRef();

  // Sound setup
  const soundBuffer = useLoader(THREE.AudioLoader, soundFile);
  const soundRef = useRef(null);

  useLayoutEffect(() => {
    // GSAP timeline setup
    tl.current = gsap.timeline();

    // Sound listener setup
    const listener = new THREE.AudioListener();
    const sound = new THREE.Audio(listener);
    sound.setBuffer(soundBuffer);
    sound.setVolume(0.5);

    keyboard.current.add(listener);
    soundRef.current = sound;

    // Scroll-based animations for different sections
    tl.current.to(target.current, {
      duration: 2,
      y: -SECTION_HEIGHT * (NB_SECTIONS - 1),
    });

    // 2nd section animation
    tl.current.to(
      keyboard.current.position,
      {
        duration: 1,
        x: -(viewport.width * 0.1 + 0.1),
        y: -1.5,
        z: 2.71,
      },
      0
    );
    tl.current.to(keyboard.current.rotation, { duration: 1, x: 0.4 + Math.PI * 2, y: 0, z: 0 }, 0);

    // 3rd section animation
    tl.current.to(keyboard.current.position, { duration: 1, x: 1.5, y: -1.89, z: 3.01 }, 1);
    tl.current.to(keyboard.current.rotation, { duration: 1, x: 0.8, y: 0, z: 0 }, 1);

    // 4th section animation
    tl.current.to(keyboard.current.position, { duration: 1, x: -0.5, y: -1.25, z: 3.65 }, 2);
    tl.current.to(keyboard.current.rotation, { duration: 1, x: 0.82, y: 0, z: 0 }, 2);

    // Pause the timeline to be controlled by scroll
    tl.current.pause();

    return () => {
      // Cleanup the timeline and sound on unmount
      tl.current.kill();
      // soundRef.current.stop();
    };
  }, [keyboard, viewport.width, camera, soundFile]);

  useFrame(() => {
    // Update the timeline based on the scroll position
    tl.current.seek(scroll.offset * tl.current.duration());

    // Make the camera look at the target
    camera.lookAt(target.current);
  });

  // Return position and rotation if needed
};

export default useKeyboardScrollAnimation;
