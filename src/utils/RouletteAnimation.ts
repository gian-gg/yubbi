export default function rouletteAnimation(
  setCurrentKey: (key: string) => void,
  pressedKeys: string[],
  setAnimationDone: (done: boolean) => void
): void {
  let index = 0;
  const totalSpins = Math.floor(Math.random() * 20) + 15;
  const interval = 100;
  let spins = 0;

  const intervalId = setInterval(() => {
    setCurrentKey(pressedKeys[index % pressedKeys.length]);

    index++;
    spins++;

    if (spins >= totalSpins) {
      clearInterval(intervalId);
      setAnimationDone(true);
    }
  }, interval);
}
