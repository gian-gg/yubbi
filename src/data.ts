import { ModalInfoData } from "@/types";

const themes = [
  { name: "mauve", emoji: "💜", color: "#d1ace0" },
  { name: "lumen", emoji: "☀️", color: "#f0e07f" },
  { name: "minty", emoji: "🌿", color: "#7ee3d0" },
  { name: "blush", emoji: "🌸", color: "#ffc1c0" },
  { name: "aether", emoji: "☁️", color: "#9cd3ff" },
];

const groupColors = [
  "#9cd3ff", // Aether (light, airy accent)
  "#d1ace0", // Mauve (subtle, neutral)
  "#f2f0ee", // Pastel White (clean background)
  "#FFD166", // Golden Yellow (warmer, less clash)
  "#7ee3d0", // Minty (cool, calming)
  "#FF6B81", // Coral Pink (soft but vibrant)
  "#3D6EFF", // Strong Blue (high contrast, bold)
  "#FF8F2C", // Vivid Orange (energetic, complements blue)
  "#00B27A", // Teal Green (fresh, balances warmth)
  "#7047EB", // Royal Purple (replaces harsh yellow)
];

const groupConfig = {
  MAX: 10,
  MIN: 2,
};

const secondsToStabilize = 2;

const RouletteInfo: ModalInfoData[] = [
  {
    title: "🎲 Finger Roulette",
    img: "/cat-fingers.gif",
    description: "Too many fingers? Let fate pick one.",
  },
  {
    title: "🤔 Select Mode",
    img: "/select-mode.png",
    description:
      "Touch = touchscreen, Keys = keyboard. (Only available on larger screens)",
  },
  {
    title: "☝️ Place Fingers",
    img: "/canvas.png",
    description:
      "Place fingers on the canvas or press keys on the keyboard. Max players depend on your device!",
  },
  {
    title: "🎉 Start & Enjoy!",
    img: "/happy-cat.gif",
    description:
      "Touch-mode starts automatically when fingers are stable. In keys-mode, press Enter to start.",
  },
];

const GroupInfo: ModalInfoData[] = [
  {
    title: "👥 Group Fingers",
    img: "/cat-confused.png",
    description: "Too many fingers? Let fate divide them.",
  },
  {
    title: "🤔 Select Mode",
    img: "/select-mode.png",
    description:
      "Touch = touchscreen, Keys = keyboard. (Only available on larger screens)",
  },
  {
    title: "🔢 Set Number of Groups",
    img: "/set-group.png",
    description: "Set how many groups to split into.",
  },
  {
    title: "☝️ Place Fingers",
    img: "/canvas.png",
    description:
      "Place fingers on the canvas or press keys on the keyboard. Max players depend on your device!",
  },
  {
    title: "🎉 Start & Enjoy!",
    img: "/happy-cat.gif",
    description:
      "Touch-mode starts automatically when fingers are stable. In keys-mode, press Enter to start.",
  },
];

export {
  themes,
  groupColors,
  groupConfig,
  secondsToStabilize,
  RouletteInfo,
  GroupInfo,
};
