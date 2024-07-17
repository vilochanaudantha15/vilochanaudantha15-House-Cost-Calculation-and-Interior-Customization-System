import React, { useRef } from "react";
import { Canvas, extend, useThree } from "@react-three/fiber";
import { Leva } from "leva";
import { Experience } from "../components/Experience";
import { TransitionMaterial } from "../components/TransitionMaterial";
import "../styles/room.css";
import Header from "../components/Header";

extend({
  TransitionMaterial,
});

const Room = () => {
  const canvasRef = useRef(null);

  const downloadImage = () => {
    const canvas = canvasRef.current;
    if (!canvas) return; // Check if canvas is available

    const dataUrl = canvas.toDataURL("image/png");

    // Create a link element
    const link = document.createElement("a");
    link.href = dataUrl;
    link.download = "room.png"; // Set the filename for the downloaded image
    document.body.appendChild(link);

    // Trigger the download
    link.click();

    // Cleanup
    document.body.removeChild(link);
  };

  return (
    <div className="room">
      <Header />
      <Leva />
      <Canvas
        shadows
        camera={{ position: [0, 0, 5], fov: 30 }}
        onCreated={({ gl }) => {
          canvasRef.current = gl.domElement;
        }}
      >
        <color attach="background" args={["#333"]} />
        <Experience />
      </Canvas>
      <button onClick={downloadImage}>Download Room</button>
    </div>
  );
};

export default Room;
