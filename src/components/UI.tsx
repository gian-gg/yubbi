"use client";
import React from "react";
import { useRouter, usePathname } from "next/navigation";
import { readFile } from "fs/promises";

const NavDivider = () => {
  return <div className="w-1 bg-base-content/10 self-stretch" />;
};

interface NavButtonProps {
  text: string;
  handleClick: () => void;
}

const NavButton = ({ text, handleClick }: NavButtonProps) => {
  return (
    <button
      className="hover:text-base-content active:text-base-content/75 transition-colors duration-200 cursor-pointer"
      onClick={handleClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
        }
      }}
    >
      {text}
    </button>
  );
};

interface NavLinkProps {
  icon?: string;
  text: string;
  route: string;
}

const NavLink = ({ icon, text, route }: NavLinkProps) => {
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
      {icon && <span className="hidden lg:inline-grid mr-2">{icon}</span>}
      {text}
    </button>
  );
};

interface ContainerProps {
  className?: string;
  children?: React.ReactNode;
  ref?: React.RefObject<HTMLDivElement | null>;
}

const Container = ({ className, children, ref }: ContainerProps) => {
  return (
    <div
      ref={ref}
      className={`text-xs md:text-sm lg:text-md bg-base-200/60 p-2 px-4 md:px-6 rounded-lg text-base-content/75  bg-clip-padding backdrop-filter backdrop-blur-sm border-1 border-base-200 h-full  ${className}`}
    >
      {children}
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

interface KeyElementProps {
  character: string;
  className?: string;
  style?: React.CSSProperties;
}
const KeyElement = ({ character, className, style }: KeyElementProps) => {
  return (
    <kbd
      className={`kbd kbd-lg w-20 h-20 lg:w-40 lg:h-40 text-[40px] lg:text-[80px] transition-transform duration-200 bg-base-300 ${className}`}
      style={style}
    >
      {character}
    </kbd>
  );
};

export { NavLink, RadioButton, NavDivider, NavButton, Container, KeyElement };
