interface ActiveTouchData {
  id: number;
  x: number;
  y: number;
}

type Mode = "touch-mode" | "keys-mode";

export type { ActiveTouchData, Mode };
