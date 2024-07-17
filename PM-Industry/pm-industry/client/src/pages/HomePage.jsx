import React from "react";
import "./../styles/homePage.scss";
import homeee from "./../assets/homee.jpeg";
import Interior from "./../assets/2.jpg";
import Banner from "./../assets/3.jpg";
import NavBar from "../components/NavBarD";
import Section2 from '../components/Section2';
import Value from "../components/Value";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const HomePage = () => {
  return (
    <div className="HomeContainer">
      <Navbar/>
      <div className="BannerContainer">
        <NavBar />
        <div className="bannerContent">
          <h1>Make your Dream Home Reality</h1>
          <button className="lets">Let's Start</button>
        </div>
        <img src={Banner} alt="" className="bannerImg" />
      </div>
      {/* Section 2 */}

      <Value />
      {/* Section world */}

      <Section2/>

      {/* Section contact */}
      <div className="PropertyType">
        <div className="propertyInfo">
          <p className="PropertyTypeInfo">
            “Crafting Quality. Creating Relationships. Quality is never an
            accident; it is always the result of high intention, sincere effort
            intelligent direction and skillful execution”
          </p>
        </div>
        <div className="ImgBox">
          <div className="serviceItem">
            <img src={homeee} alt="" className="serviceImg" />
            <p>Luxury Residentials</p>
          </div>
          <div className="serviceItem">
            <img src={Interior} alt="" className="serviceImg" />
            <p>Interior Designing</p>
          </div>
          <div className="serviceItem">
            <img
              src="https://static.wixstatic.com/media/2c91de_92b7643e9c7848b385f7d74a090ab4ba~mv2.jpg/v1/fill/w_925,h_579,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/2c91de_92b7643e9c7848b385f7d74a090ab4ba~mv2.jpg"
              alt=""
              className="serviceImg"
            />
            <p>Commercial Building</p>
          </div>
        </div>
      </div>

    
      <Footer/>
    </div>
  );
};

export default HomePage;
