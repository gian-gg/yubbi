import { ActiveTouchData } from "@/types";

const generateGroups = (
  fingers: string[] | ActiveTouchData[],
  numberOfGroups: number,
  setGroups: (value: string[][]) => void
) => {
  const shuffledKeys = [...fingers].sort(() => Math.random() - 0.5);

  const newGroups: string[][] = Array.from(
    { length: numberOfGroups },
    () => []
  );

  shuffledKeys.forEach((key, index) => {
    const groupIndex = index % numberOfGroups;

    const finger = fingers[index % fingers.length];
    newGroups[groupIndex].push(
      typeof finger === "string" ? finger : finger?.id.toString()
    );
  });

  setGroups(newGroups);
};

export default generateGroups;
