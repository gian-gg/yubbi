"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";

import { FingerContainer } from "@components/Components";
import { ActiveTouchData } from "@/types";
import { secondsToStabilize } from "@/data";

interface TouchHighlighterProps {
  setActiveTouches: (
    value: ActiveTouchData[] | ((prev: ActiveTouchData[]) => ActiveTouchData[])
  ) => void;
  activeTouches: ActiveTouchData[];
  currentFinger: string | null;
  hasStarted: boolean;
  start: () => void;
  children: React.ReactNode;
}

const TouchHighlighter = ({
  setActiveTouches,
  activeTouches,
  currentFinger,
  hasStarted,
  start,
  children,
}: TouchHighlighterProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const [isStable, setIsStable] = useState(false);

  useEffect(() => {
    // Reset isStable when reset button is clicked
    if (!hasStarted && !currentFinger) {
      setIsStable(false);
    }
  }, [hasStarted, currentFinger]);

  useEffect(() => {
    if (currentFinger || activeTouches.length <= 1) return;

    const timeoutId: ReturnType<typeof setTimeout> = setTimeout(() => {
      setIsStable(true);
      start();
    }, secondsToStabilize * 1000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [currentFinger, isStable, activeTouches, start]);

  const handleTouchStart = useCallback(
    (e: TouchEvent) => {
      setIsStable(false);

      setActiveTouches((prev) => {
        const touch = e.changedTouches[0];
        const rect = containerRef.current?.getBoundingClientRect();

        const newTouch: ActiveTouchData = {
          id: touch.identifier,
          x: rect ? touch.clientX - rect.left : touch.clientX,
          y: rect ? touch.clientY - rect.top : touch.clientY,
        };

        return [...prev, newTouch];
      });
    },
    [setActiveTouches]
  );

  const handleTouchEnd = useCallback(
    (e: TouchEvent) => {
      setIsStable(false);

      if (!currentFinger) {
        setActiveTouches((prev) =>
          prev.filter((t) => t.id !== e.changedTouches[0].identifier)
        );
      }
    },
    [currentFinger, setActiveTouches]
  );

  const handleTouchChange = useCallback(
    (e: TouchEvent) => {
      setIsStable(false);

      setActiveTouches((prev) => {
        const touch = e.changedTouches[0];
        const rect = containerRef.current?.getBoundingClientRect();
        return prev.map((t) =>
          t.id === touch.identifier
            ? {
                ...t,
                x: rect ? touch.clientX - rect.left : touch.clientX,
                y: rect ? touch.clientY - rect.top : touch.clientY,
              }
            : t
        );
      });
    },
    [setActiveTouches]
  );

  useEffect(() => {
    if ((hasStarted || currentFinger) && isStable) return;

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
  }, [
    handleTouchStart,
    handleTouchChange,
    handleTouchEnd,
    hasStarted,
    currentFinger,
    isStable,
  ]);

  return (
    <FingerContainer ref={containerRef} className="relative">
      <p className="self-end">
        {activeTouches.length >= 2
          ? hasStarted || currentFinger
            ? null
            : "Don't Move Fingers to Start."
          : "Minimum of two fingers required to start."}
      </p>

      {/* <div> // for debugging purposes
        <p>isStable:{isStable ? "true" : "false"}</p>
        <hr />
        <ul>
          {activeTouches.map((touch, index) => (
            <li key={index}>
              <h1>{`${touch.id}: (${touch.x}, ${touch.y})`}</h1>
            </li>
          ))}
        </ul>
      </div> */}
      {children}
    </FingerContainer>
  );
};

export default TouchHighlighter;
