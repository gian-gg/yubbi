"use client";
import React, { useCallback, useEffect, useRef } from "react";

import { FingerContainer } from "@components/Components";

import { ActiveTouchData } from "@/types";

interface TouchHighlighterProps {
  setActiveTouches: (
    value: ActiveTouchData[] | ((prev: ActiveTouchData[]) => ActiveTouchData[])
  ) => void;
  activeTouches: ActiveTouchData[];
  currentKey: string | null;
  hasStarted: boolean;
  start: () => void;
  reset: () => void;
  children: React.ReactNode;
}

const TouchHighlighter = ({
  setActiveTouches,
  activeTouches,
  currentKey,
  hasStarted,
  start,
  reset,
  children,
}: TouchHighlighterProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const handleTouchStart = useCallback(
    (e: TouchEvent) => {
      setActiveTouches((prev) => {
        const touch = e.changedTouches[0];
        const newTouch: ActiveTouchData = {
          id: touch.identifier,
          x: touch.clientX,
          y: touch.clientY,
        };

        return [...prev, newTouch];
      });
    },
    [currentKey, setActiveTouches, start, reset]
  );

  const handleTouchEnd = useCallback(
    (e: TouchEvent) => {
      if (!currentKey) {
        setActiveTouches((prev) =>
          prev.filter((t) => t.id !== e.changedTouches[0].identifier)
        );
      }
    },
    [currentKey, setActiveTouches]
  );

  const handleTouchChange = useCallback(
    (e: TouchEvent) => {
      setActiveTouches((prev) => {
        const touch = e.changedTouches[0];
        return prev.map((t) =>
          t.id === touch.identifier
            ? { ...t, x: touch.clientX, y: touch.clientY }
            : t
        );
      });
    },
    [setActiveTouches]
  );

  useEffect(() => {
    if (hasStarted) return;

    const container = containerRef.current;

    if (container) {
      container.addEventListener("touchstart", handleTouchStart);
      container.addEventListener("touchmove", handleTouchChange);
      container.addEventListener("touchend", handleTouchEnd);
    }
    return () => {
      if (container) {
        container.removeEventListener("touchstart", handleTouchStart);
        container.removeEventListener("touchmove", handleTouchChange);
        container.removeEventListener("touchend", handleTouchEnd);
      }
    };
  }, [handleTouchStart, handleTouchEnd, hasStarted, currentKey]);
  return (
    <FingerContainer ref={containerRef} className="relative">
      <ul>
        {activeTouches.map((touch, index) => (
          <li key={index}>
            <h1>{`${touch.id}: (${touch.x}, ${touch.y})`}</h1>
          </li>
        ))}
      </ul>
      {children}
    </FingerContainer>
  );
};

export default TouchHighlighter;
