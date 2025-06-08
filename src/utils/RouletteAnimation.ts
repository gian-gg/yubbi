import { ActiveTouchData } from "@/types";

export default function rouletteAnimation(
  setCurrentKey: (key: string) => void,
  pressedKeys: string[] | ActiveTouchData[],
  setAnimationDone: (done: boolean) => void
): void {
  let index = 0;
  const totalSpins = Math.floor(Math.random() * 20) + 15;
  const interval = 100;
  let spins = 0;

  const intervalId = setInterval(() => {
    const key = pressedKeys[index % pressedKeys.length];
    setCurrentKey(typeof key === "string" ? key : key?.id.toString());

    index++;
    spins++;

    if (spins >= totalSpins) {
      clearInterval(intervalId);
      setAnimationDone(true);
    }
  }, interval);
}
