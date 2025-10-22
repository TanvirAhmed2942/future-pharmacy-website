import React from "react";
import MapAndFormSection from "./MapAndFormSection";
import RefillSection from "./RefillSection";

function Home() {
  return (
    <div className="min-h-screen container mx-auto px-4 ">
      <MapAndFormSection />
      <RefillSection />
    </div>
  );
}

export default Home;
