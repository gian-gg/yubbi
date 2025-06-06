import confetti from "canvas-confetti";
import { themes } from "@/data";

function launchConfetti() {
  const currentTheme = localStorage.getItem("theme") || "mauve";
  const end = Date.now() + 2 * 1000;
  const colors = [
    themes.find((theme) => theme.name === currentTheme)?.color || "#d1ace0",
    "#ffffff",
  ];

  (function frame() {
    confetti({
      particleCount: 2,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
      colors: colors,
    });
    confetti({
      particleCount: 2,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
      colors: colors,
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  })();
}

export { launchConfetti };
