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

const secondsToStabilize = 3;

export { themes, groupColors, groupConfig, secondsToStabilize };
