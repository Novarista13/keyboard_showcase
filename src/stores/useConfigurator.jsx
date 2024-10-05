import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

export default create(
  subscribeWithSelector((set) => {
    return {
      whiteKeyColor: "#6273B7",
      setWhiteKeyColor: (color) => set({ whiteKeyColor: color }),

      darkKeyColor: "#344070",
      setDarkKeyColor: (color) => set({ darkKeyColor: color }),

      plateColor: "#202042",
      setPlateColor: (color) => set({ plateColor: color }),
    };
  })
);

// E7E7E7
// 969696
// 585858
