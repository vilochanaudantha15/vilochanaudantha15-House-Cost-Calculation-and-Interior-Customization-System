import React, { useEffect, useState } from "react";
import "../styles/section2.scss";
import image1 from "../assets/canadaa.png";
import image2 from "../assets/lankaaa.png";
import image3 from "../assets/america.png";
import image4 from "../assets/ausi.png";

const Section2 = () => {
  const [activeImage, setActiveImage] = useState(1);

  useEffect(() => {
    const controlsContainer = document.getElementById("controls-container");
    const allImages = document.querySelectorAll(".image");

    controlsContainer.addEventListener("click", (e) => {
      const target = e.target;
      const dataTarget = target.getAttribute("data-image");

      if (dataTarget) {
        allImages.forEach((image) => {
          image.removeAttribute("data-active");
        });

        setActiveImage(Number(dataTarget));
        const activeImageElement = document.getElementById(dataTarget);
        activeImageElement.setAttribute("data-active", "active");
      }
    });
  }, []);

  return (
    <div className="section-two">
      <h2>
        Helping you transform communities
        <br /> across the globe.
      </h2>
      <div className="sec-items">
        <div className="left">
          <div className="container">
            <div id="controls-container" className="controls-container">
              <div className={`control ${activeImage === 1 ? "active" : ""}`}>
                <div className="control-btn" data-image="1">
                  Canada
                </div>
              </div>
              <div className={`control ${activeImage === 2 ? "active" : ""}`}>
                <div className="control-btn" data-image="2">
                  Sri-lanka
                </div>
              </div>
              <div className={`control ${activeImage === 3 ? "active" : ""}`}>
                <div className="control-btn" data-image="3">
                  America
                </div>
              </div>
              <div className={`control ${activeImage === 4 ? "active" : ""}`}>
                <div className="control-btn" data-image="4">
                  Australia
                </div>
              </div>
            </div>
            <div id="images-container">
              <div
                className={`image image-1 ${activeImage === 1 ? "active" : ""}`}
                id="1"
                data-active="active"
                style={{ backgroundImage: `url(${image1})` }}
              ></div>
              <div
                className={`image image-2 ${activeImage === 2 ? "active" : ""}`}
                id="2"
                style={{ backgroundImage: `url(${image2})` }}
              ></div>
              <div
                className={`image image-3 ${activeImage === 3 ? "active" : ""}`}
                id="3"
                style={{ backgroundImage: `url(${image3})` }}
              ></div>
              <div
                className={`image image-4 ${activeImage === 4 ? "active" : ""}`}
                id="4"
                style={{ backgroundImage: `url(${image4})` }}
              ></div>
            </div>
          </div>
        </div>
        <div className="right">
          <span className="count">100%</span>
          <span className="name">Projects Owned</span>
          <div className="text2">
            <span className="count2">1000 +</span>
            <span className="name2">Active Projects</span>
            <button className="branch">Our Branches</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Section2;
