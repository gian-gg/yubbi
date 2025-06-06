"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";

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
    <footer className="mt-20 flex justify-between items-center w-full text-base-content/70 transition-colors duration-200 font-primary text-xs md:text-md lg:text-lg">
      <Link
        href="https://github.com/gian-gg"
        target="_blank"
        className="flex gap-2 items-center hover:text-base-content/100"
      >
        © {new Date().getFullYear()}, gian.gg. All rights reserved.
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
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="ml-1 h-3 w-3 md:h-4 md:w-4 inline-block"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 15l7-7 7 7"
            />
          </svg>
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
