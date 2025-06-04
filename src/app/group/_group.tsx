"use client";

import { NavBar } from "@components/Navigation";

const Group = () => {
  return (
    <main className="h-[600px] w-full flex flex-col items-center">
      <NavBar>
        <button className="hover:text-base-content active:text-base-content/75 cursor-pointer">
          <kbd className="kbd kbd-sm">esc</kbd> Reset
        </button>
      </NavBar>

      <div className="bg-base-200 min-h-60 w-full p-8 my-8 rounded-lg flex items-center justify-center gap-4"></div>
      <p>
        Press <kbd className="kbd kbd-md">Enter</kbd> to start.
      </p>
    </main>
  );
};

export default Group;
