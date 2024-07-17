import React from "react";

const Back = ({ name, title, cover }) => {
  return (
    <>
      <div className="back">
        <div className="container">
        <div class="heading">
          <h1>{title}</h1>
          <p>{name}</p>
          <button class="btn5">Learn More</button>
        </div>
        </div>
        <img src={cover} alt="" />
      </div>
    </>
  );
};

export default Back;
