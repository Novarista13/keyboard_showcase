import { useEffect, useRef, useState } from "react";
import { useLoader } from "@react-three/fiber";
import * as THREE from "three";
import { useAnimations } from "@react-three/drei";
import useScrollEnd from "./useScrollEnd";

const useKeyboardAnimation = (keyboard, animations, soundFile = "./audio/click.mp3") => {
  const { actions, mixer, names } = useAnimations(animations, keyboard);

  const soundBuffer = useLoader(THREE.AudioLoader, soundFile);
  const soundRef = useRef(null);
  const intervalRef = useRef(null);

  const isAtScrollEnd = useScrollEnd();

  useEffect(() => {
    if (!isAtScrollEnd) return;

    const listener = new THREE.AudioListener();
    const sound = new THREE.Audio(listener);
    sound.setBuffer(soundBuffer);
    sound.setVolume(0.5);

    keyboard.current.add(listener);
    soundRef.current = sound;

    const action = actions[names[0]];
    const actionDuration = action.getClip().duration;

    action.reset().fadeIn(0.5).play();
    action.setLoop(THREE.LoopOnce, 1);
    action.clampWhenFinished = true;

    const intervalTime = (actionDuration / 10) * 1000;

    intervalRef.current = setInterval(() => {
      if (soundRef.current.isPlaying) soundRef.current.stop();
      soundRef.current.play();
    }, intervalTime);

    mixer.addEventListener("finished", () => {
      soundRef.current.stop();
      clearInterval(intervalRef.current);
    });

    return () => {
      action.fadeOut(0.5);
      soundRef.current.stop();
      clearInterval(intervalRef.current);
    };
  }, [keyboard, isAtScrollEnd]);
};

export default useKeyboardAnimation;
