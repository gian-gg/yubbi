import { useEffect } from "react";

import { Mode } from "@/types";

function useChangeModeUsingScreenWidth(setMode: (mode: Mode) => void): void {
  useEffect(() => {
    const updateMode = () => {
      const width = window.innerWidth;
      if (width <= 768) {
        setMode("touch-mode");
      } else {
        setMode("keys-mode");
      }
    };

    updateMode();
    window.addEventListener("resize", updateMode);

    return () => window.removeEventListener("resize", updateMode);
  }, [setMode]);
}

export default useChangeModeUsingScreenWidth;
