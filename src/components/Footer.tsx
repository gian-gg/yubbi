"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";

import { ChevronDownIcon } from "@components/Icons";

import { capitalizeFirstLetter } from "@utils/Misc";
import { themes } from "@/data";

const Footer = () => {
  const [currentTheme, setCurrentTheme] = useState<string>("mauve");

  useEffect(() => {
    // Set the initial theme from localStorage or default to 'mauve'
    const savedTheme = localStorage.getItem("theme") || "mauve";
    document.body.setAttribute("data-theme", savedTheme);

    setCurrentTheme(savedTheme);
  }, []);

  const handleThemeChange = (theme: string) => {
    localStorage.setItem("theme", theme);
    document.body.setAttribute("data-theme", theme);
    setCurrentTheme(theme);
  };

  return (
    <footer className="max-w-[1200px] flex justify-between items-center w-full text-base-content/70 transition-colors duration-200 font-primary text-xs md:text-md lg:text-lg z-10">
      <Link
        href="https://github.com/gian-gg"
        target="_blank"
        className="flex gap-2 items-center hover:text-base-content/100"
      >
        Made with <span className="text-primary">♥︎</span> by gian.gg!
      </Link>

      <div className="dropdown dropdown-top dropdown-end">
        <div
          tabIndex={0}
          role="button"
          className="flex gap-2 items-center hover:text-base-content/100 m-1 cursor-pointer"
        >
          <span className="text-xs">
            {themes.find((theme) => theme.name === currentTheme)?.emoji}
          </span>
          {capitalizeFirstLetter(currentTheme)}
          <ChevronDownIcon />
        </div>
        <ul
          tabIndex={0}
          className="dropdown-content bg-[#363636] z-50 w-52 p-2 font-secondary rounded-lg text-md"
        >
          {themes.map((theme) => (
            <li key={theme.name}>
              <input
                type="radio"
                name="theme-dropdown"
                onChange={() => handleThemeChange(theme.name)}
                checked={
                  typeof window !== "undefined" &&
                  document.body.getAttribute("data-theme") === theme.name
                }
                className="theme-controller w-full btn btn-sm btn-ghost justify-start hover:[background-color:var(--hover-color)] transition-colors duration-300"
                style={{ "--hover-color": theme.color } as React.CSSProperties}
                aria-label={`${theme.emoji} ${capitalizeFirstLetter(
                  theme.name
                )}`}
                value={theme.name}
              />
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
