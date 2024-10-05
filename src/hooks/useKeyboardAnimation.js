import { useEffect, useRef } from "react";
import { useLoader } from "@react-three/fiber";
import * as THREE from "three";
import { useAnimations } from "@react-three/drei";

const useKeyboardAnimation = (animations, keyboard, soundFile = "./audio/click.mp3") => {
  const { actions, mixer } = useAnimations(animations, keyboard);
  const soundBuffer = useLoader(THREE.AudioLoader, soundFile);
  const soundRef = useRef(null);

  const setAction = (fromAction, toActionName) => {
    const toAction = actions[toActionName];
    toAction.loop = THREE.LoopOnce;

    // Play the sound
    // soundRef.current.play();

    // Reset the action before playing it
    toAction.reset();

    // Crossfade with a very short duration for fast transitions
    if (fromAction) {
      fromAction.crossFadeTo(toAction, 0.05, true); // Very fast crossfade (0.05 seconds)
    }

    // Play the action immediately
    toAction.play();

    return toAction; // Return the newly played action
  };

  useEffect(() => {
    // Sound listener setup
    const listener = new THREE.AudioListener();
    const sound = new THREE.Audio(listener);
    sound.setBuffer(soundBuffer);
    sound.setVolume(0.5);

    keyboard.current.add(listener);
    soundRef.current = sound;

    // Animation handling
    let currentActionIndex = 0;
    const animationNames = ["action1", "action2", "action3"]; // Extract action names dynamically
    let currentAction = null; // To track the current action

    // Function to transition to the next animation
    const playNextAction = () => {
      // soundRef.current.stop(); // Stop the sound
      currentActionIndex = (currentActionIndex + 1) % animationNames.length; // Move to the next animation
      currentAction = setAction(currentAction, animationNames[currentActionIndex]); // Crossfade to the next action
    };

    // Start the first animation
    currentAction = setAction(null, animationNames[currentActionIndex]);

    // Event listener for when an animation finishes
    mixer.addEventListener("finished", playNextAction);

    // Cleanup function to remove event listener and stop sound
    return () => {
      mixer.removeEventListener("finished", playNextAction);
      // soundRef.current.stop(); // Stop sound on component unmount
    };
  }, [actions, mixer, soundBuffer, keyboard]);

  return { setAction, mixer }; // Return useful functions or values if needed
};

export default useKeyboardAnimation;
