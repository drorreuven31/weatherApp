import { useRef, useEffect } from "react";

export function useHorizontalScroll() {
  const elRef = useRef();
  useEffect(() => {
    const el = elRef.current;
    if (el) {
      const onWheel = (e) => {
        if (e.deltaY == 0) return;
        e.preventDefault();
        el.scrollTo({
          left: el.scrollLeft + e.deltaY * 1.4,
          behavior: "smooth",
        });
      };
      el.addEventListener("wheel", onWheel);
      return () => el.removeEventListener("wheel", onWheel);
    }
  }, []);

  useEffect(() => {
    const el = elRef.current;
    if (el) {
      const onTouch = (ev) => {
        debugger;
        console.log("hey");
        ev.stopPropagation();
      };
      el.addEventListener("touchmove", onTouch);
      return () => {
        console.log("bye");

        el.removeEventListener("touchmove", onTouch);
      };
    }
  }, []);

  return elRef;
}
