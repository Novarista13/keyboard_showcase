import { useScroll } from "@react-three/drei";
import { useEffect, useState } from "react";

// Helper function to debounce scroll event
function debounce(fn, delay) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

function useScrollEnd() {
  const [isAtBottom, setIsAtBottom] = useState(false);
  const scroll = useScroll();
  const scrollElement = scroll.el;

  useEffect(() => {
    if (!scrollElement) return;

    const handleScroll = debounce(() => {
      const scrollTop = scrollElement.scrollTop;
      const elementHeight = scrollElement.clientHeight;
      const scrollHeight = scrollElement.scrollHeight;

      const atBottom = scrollTop + elementHeight >= scrollHeight - 1;

      setIsAtBottom((prevIsAtBottom) => {
        if (prevIsAtBottom !== atBottom) {
          return atBottom;
        }
        return prevIsAtBottom;
      });
    }, 100);

    scrollElement.addEventListener("scroll", handleScroll);

    return () => scrollElement.removeEventListener("scroll", handleScroll);
  }, [scrollElement]);

  return isAtBottom;
}

export default useScrollEnd;
