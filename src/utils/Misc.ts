import { useEffect } from "react";

function capitalizeFirstLetter(word: string): string {
  if (!word) return "";
  return word.charAt(0).toUpperCase() + word.slice(1);
}

function useChangeModeUsingScreenWidth(setMode: (mode: string) => void): void {
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

export { capitalizeFirstLetter, useChangeModeUsingScreenWidth };
