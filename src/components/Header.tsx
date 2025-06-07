import React from "react";

const Header = () => {
  return (
    <header className="flex flex-col font-primary mb-2 md:mb-4 lg:mb-6 max-w-[1200px]">
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center my-4 text-primary">
        <span className="text-4xl md:text-5xl lg:text-7xl">✌️</span> yubi
      </h1>
      <p className="text-center text-[10px] md:text-xs lg:text-sm mb-4 max-w-[600px] font-secondary text-base-content/50">
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
      </p>
    </header>
  );
};

export default Header;
