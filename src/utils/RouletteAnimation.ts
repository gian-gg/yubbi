import { ActiveTouchData } from "@/types";

export default function rouletteAnimation(
  setCurrentKey: (key: string) => void,
  pressedKeys: string[] | ActiveTouchData[],
  setAnimationDone: (done: boolean) => void
): void {
  let index = 0;
  const totalSpins = Math.floor(Math.random() * 20) + 30;
  const initialInterval = 50;
  const maxInterval = 400;
  let spins = 0;

  const getCurrentInterval = (currentSpin: number) => {
    const progress = currentSpin / totalSpins;
    return (
      initialInterval + (maxInterval - initialInterval) * Math.pow(progress, 2)
    );
  };

  const spin = () => {
    const key = pressedKeys[index % pressedKeys.length];
    setCurrentKey(typeof key === "string" ? key : key?.id.toString());

    index++;
    spins++;

    if (spins < totalSpins) {
      const nextInterval = getCurrentInterval(spins);
      setTimeout(spin, nextInterval);
    } else {
      setAnimationDone(true);
    }
  };

  spin();
}
