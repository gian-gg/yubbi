import { useEffect } from "react";

function capitalizeFirstLetter(word: string): string {
  if (!word) return "";
  return word.charAt(0).toUpperCase() + word.slice(1);
}

function changeModeUsingScreenWidth(setMode: (mode: string) => void): void {
  useEffect(() => {
    const updateMode = () => {
      const width = window.innerWidth;
      if (width <= 768) {
        console.log("touch-mode");
        setMode("touch-mode");
      } else {
        console.log("keys-mode");
        setMode("keys-mode");
      }
    };

    updateMode();
    window.addEventListener("resize", updateMode);

    return () => window.removeEventListener("resize", updateMode);
  }, [setMode]);
}

export { capitalizeFirstLetter, changeModeUsingScreenWidth };
