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
    <footer className="flex justify-between items-center w-full text-base-content/70 transition-colors duration-200 font-primary text-sm">
      <Link
        href="https://github.com/gian-gg/yubi"
        target="_blank"
        className="flex gap-2 items-center hover:text-base-content/100"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="14"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M12 0.297C5.373 0.297 0 5.67 0 12.297c0 5.292 3.438 9.787 8.207 11.387.6.111.793-.261.793-.58 0-.287-.01-1.047-.015-2.055-3.338.725-4.042-1.609-4.042-1.609-.546-1.387-1.333-1.757-1.333-1.757-1.089-.745.083-.729.083-.729 1.205.084 1.84 1.237 1.84 1.237 1.07 1.832 2.809 1.303 3.495.996.108-.775.418-1.303.762-1.603-2.665-.303-5.466-1.333-5.466-5.931 0-1.31.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.3 1.23a11.5 11.5 0 0 1 3-.404c1.02.005 2.045.137 3 .404 2.289-1.552 3.294-1.23 3.294-1.23.654 1.653.243 2.874.12 3.176.77.84 1.233 1.911 1.233 3.221 0 4.609-2.805 5.625-5.475 5.921.429.369.822 1.096.822 2.211 0 1.595-.015 2.879-.015 3.271 0 .322.192.697.801.579C20.565 22.08 24 17.587 24 12.297 24 5.67 18.627.297 12 .297z" />
        </svg>
        Github
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
        </div>
        <ul
          tabIndex={0}
          className="dropdown-content bg-base-200/60 z-1 w-52 p-2 font-secondary rounded-lg"
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
