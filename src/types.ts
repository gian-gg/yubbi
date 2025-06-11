interface ActiveTouchData {
  id: number;
  x: number;
  y: number;
}

type Mode = "touch-mode" | "keys-mode";

interface ModalInfoData {
  title: string;
  img: string;
  description: string;
}

export type { ActiveTouchData, Mode, ModalInfoData };
