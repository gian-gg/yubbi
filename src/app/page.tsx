import React from "react";

import Header from "@components/Header";
import Footer from "@components/Footer";
import Roulette from "@components/Roulette";

const Home = () => {
  return (
    <>
      <Header />

      <main className="h-[600px] w-full flex flex-col items-center">
        <Roulette />
      </main>

      <Footer />
    </>
  );
};

export default Home;
