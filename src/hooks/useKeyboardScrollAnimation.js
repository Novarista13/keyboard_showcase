import { useRef, useLayoutEffect, useCallback } from "react";
import { useThree, useFrame, useLoader } from "@react-three/fiber";
import { useScroll } from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";
import { useResponsiveX, useResponsiveY } from "./useResponsive";

export const SECTION_HEIGHT = 1.5;
export const NB_SECTIONS = 4;

const useKeyboardScrollAnimation = (keyboard, soundFile = "./audio/swoosh.wav") => {
  // Scroll and scene references
  const camera = useThree((state) => state.camera);
  const size = useThree((state) => state.size);

  const scroll = useScroll();
  const tl = useRef();

  // Sound effect
  const soundBuffer = useLoader(THREE.AudioLoader, soundFile);
  const soundRef = useRef(null);

  // Section tracking
  const currentSection = useRef(0);
  const prevSection = useRef(-1);

  // responsive functions
  const responsiveX = useResponsiveX();
  const responsiveY = useResponsiveY();

  useLayoutEffect(() => {
    const listener = new THREE.AudioListener();
    const sound = new THREE.Audio(listener);
    sound.setBuffer(soundBuffer);
    sound.setVolume(0.5);
    keyboard.current.add(listener);
    soundRef.current = sound;

    // Setup GSAP timeline
    tl.current = gsap.timeline({ paused: true });

    // y values
    const totalYMovement = -SECTION_HEIGHT * (NB_SECTIONS - 1);
    const proportionalYValues = [
      0,
      totalYMovement * (1 / 3),
      totalYMovement * (2 / 3),
      totalYMovement,
    ];

    // Define animations for each section
    const animations = [
      { x: responsiveX(-1.5), y: proportionalYValues[1], z: 2.25, rotationX: 0.8 + Math.PI * 2 },
      { x: responsiveX(1.5), y: proportionalYValues[2], z: 2, rotationX: 1.5 },
      { x: responsiveX(-0.5), y: proportionalYValues[3] - 0.05, z: 3.25, rotationX: 1.5 },
    ];

    // Loop through and create animations for each section
    animations.forEach((anim, index) => {
      tl.current.to(
        keyboard.current.position,
        {
          duration: 1,
          x: anim.x,
          y: index === 2 ? anim.y : responsiveY(anim.y),
          z: anim.z,
        },
        index
      );
      tl.current.to(
        keyboard.current.rotation,
        {
          duration: 1,
          x: anim.rotationX,
          y: 0,
          z: 0,
        },
        index
      );
      tl.current.to(
        camera.position,
        {
          duration: 1,
          y: anim.y,
        },
        index
      );
    });

    return () => {
      tl.current.kill(); // Clean up
    };
  }, [keyboard, size.width]);

  useFrame(() => {
    const scrollOffset = scroll.offset;
    const progress = scrollOffset * NB_SECTIONS;
    const newSection = Math.floor(progress);

    if (newSection !== currentSection.current) {
      currentSection.current = newSection;

      // Play sound only if section change is detected
      if (soundRef.current && newSection !== prevSection.current) {
        soundRef.current.play();
        prevSection.current = newSection;
      }
    }

    // Animate scroll progress
    if (tl.current) {
      tl.current.seek(progress * (1 / NB_SECTIONS) * tl.current.duration());
    }
  });
};

export default useKeyboardScrollAnimation;
