import { useState } from "react";

import { Canvas } from "@react-three/fiber";
import Experience from "../components/ChairExperience";
import Configurator from "../components/Configurator";
import { CustomizationProvider } from "../contexts/Customization";
import '../styles/chair.css'
import Header from "../components/Header";

const Chairpage = () => {
  return (
    <CustomizationProvider>
      <div className="furnitureStore">
        <Header/>
        <Canvas dpr={[1, 2]}>
          <color attach="background" args={["#283547"]} />
          <fog attach="fog" args={["#213547", 10, 20]} />
          <Experience />
        </Canvas>
        <Configurator />
      </div>
    </CustomizationProvider>
  );
};

export default Chairpage;
