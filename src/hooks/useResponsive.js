import { useThree } from "@react-three/fiber";
import { useCallback } from "react";

// Screen breakpoints
const mobileBreakpoint = 480;
const tabletBreakpoint = 1024;
export const thresholdWidth = 768;

// Responsive Scale Hook
export const useResponsiveScale = () => {
  const size = useThree((state) => state.size);

  const responsiveScale = useCallback(
    (baseScale = 1) => {
      let scaleFactor;

      if (size.width <= mobileBreakpoint) {
        scaleFactor = 0.5; // Shrink down more for mobile
      } else if (size.width <= tabletBreakpoint) {
        scaleFactor = 0.7; // Moderate scaling for tablets
      } else {
        scaleFactor = 1; // Full scale for desktops
      }

      return baseScale * scaleFactor;
    },
    [size.width]
  );

  return responsiveScale;
};

// Responsive X Position Hook
export const useResponsiveX = () => {
  const size = useThree((state) => state.size);

  const responsiveX = useCallback(
    (value) => {
      const aspectRatio = size.width / size.height;

      if (aspectRatio < 1) {
        return 0;
      }

      const aspectRatioFactor = Math.min(size.width / window.innerWidth, 1);
      return value * aspectRatioFactor * 0.7;
    },
    [size.width]
  );

  return responsiveX;
};

// Responsive Y Position Hook based on aspect ratio
export const useResponsiveY = () => {
  const { size } = useThree();

  const responsiveY = useCallback(
    (yValue) => {
      const aspectRatio = size.width / size.height;

      if (aspectRatio < 0.6) {
        return yValue + 0.9;
      } else if (aspectRatio < 1) {
        return yValue + 0.3;
      }

      return yValue;
    },
    [size.width, size.height]
  );

  return responsiveY;
};
