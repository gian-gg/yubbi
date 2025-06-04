"use client";
import React from "react";
import { useRouter, usePathname } from "next/navigation";

const NavDivider = () => {
  return <div className="h-full w-1 bg-base-content/10" />;
};

interface NavButtonProps {
  text: string;
  route: string;
}

const NavButton = ({ text, route }: NavButtonProps) => {
  const router = useRouter();
  const pathname = usePathname();

  const isRouteActive = (route: string): boolean => {
    return pathname === route;
  };

  return (
    <button
      className={`hover:text-base-content active:text-base-content/75 transition-colors duration-200 cursor-pointer ${
        isRouteActive(route) ? "text-primary" : "text-base-content/75"
      }`}
      onClick={() => router.push(route)}
      disabled={isRouteActive(route)}
    >
      {text}
    </button>
  );
};

interface NavBarProps {
  children?: React.ReactNode;
}

const NavBar = ({ children }: NavBarProps) => {
  return (
    <div className="flex gap-8 bg-base-200 p-2 px-6 rounded-lg text-base-content/75">
      <NavButton text="🎲 Roulette" route="/roulette" />
      <NavButton text="👥 Group" route="/group" />
      {children && (
        <>
          <NavDivider />
          {children}
        </>
      )}
    </div>
  );
};

interface RadioButtonProps {
  text: string;
  setMode: (mode: string) => void;
  mode: string;
}

const RadioButton = ({ text, setMode, mode }: RadioButtonProps) => {
  const isActive = mode === text.toLowerCase() + "-mode";

  return (
    <button
      onClick={() => setMode(text.toLowerCase() + "-mode")}
      className={`hover:text-base-content active:text-base-content/75 cursor-pointer ${
        isActive ? "text-primary" : "text-base-content/75"
      }`}
    >
      {text}
    </button>
  );
};

export { NavBar, NavButton, RadioButton, NavDivider };
