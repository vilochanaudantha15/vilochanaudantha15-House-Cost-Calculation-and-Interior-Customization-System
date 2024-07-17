import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/Header";
import "../styles/uploader.scss";
import Footer from "./Footer";
import img from "../assets/7.jpg";
import Back from "./common/Back";

export default function ImageUploader() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [totalWallArea, setTotalWallArea] = useState(0);
  const [floorArea, setFloorArea] = useState(0);
  const [costPerSquareFeet, setCostPerSquareFeet] = useState(0);
  const [costPerFloorSquareFeet, setCostPerFloorSquareFeet] = useState(0);
  const [totalCost, setTotalCost] = useState(0); // New state for total cost

  useEffect(() => {
    async function fetchPrices() {
      try {
        const response = await axios.get("http://localhost:8000/api/products/");
        const cementPrice = response.data.products[0].quantity;
        const sandPrice = response.data.products[1].quantity;
        const blockStonePrice = response.data.products[2].price;
        const concreteStonePrice = response.data.products[3].quantity;

        const costPerSqFt = calculateCostPerSquareFeet(
          blockStonePrice,
          sandPrice,
          cementPrice
        );
        setCostPerSquareFeet(costPerSqFt);

        const costPerFloorSqFt = calculateCostPerFloorSquareFeet(
          concreteStonePrice,
          sandPrice,
          cementPrice
        );
        setCostPerFloorSquareFeet(costPerFloorSqFt);
      } catch (error) {
        console.error("Error fetching prices:", error);
      }
    }
    fetchPrices();
  }, []);

  const handleDrop = (acceptedFiles) => {
    setSelectedFile(acceptedFiles[0]);
  };

  const handleSubmit = async () => {
    if (!selectedFile) {
      console.error("No file selected");
      return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await axios.post(
        "http://localhost:5000/process_image",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setTotalWallArea(response.data.total_wall_area);
      setFloorArea(response.data.floor_area);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const calculateCostPerSquareFeet = (
    blockStonePrice,
    sandPrice,
    cementPrice
  ) => {
    return sandPrice * 0.75 + blockStonePrice * 2.5 + cementPrice * 0.25;
  };

  const calculateCostPerFloorSquareFeet = (
    concreteStonePrice,
    sandPrice,
    cementPrice
  ) => {
    return sandPrice * 0.75 + concreteStonePrice * 2.5 + cementPrice * 0.25;
  };

  // Update total cost whenever total wall area, floor area, or cost per square feet/floor square feet changes
  useEffect(() => {
    const calculateTotalCost = () => {
      const totalCost =
        totalWallArea * costPerSquareFeet + floorArea * costPerFloorSquareFeet;
      setTotalCost(totalCost);
    };

    calculateTotalCost();
  }, [totalWallArea, floorArea, costPerSquareFeet, costPerFloorSquareFeet]);

  return (
    <div className="imageuploader">
      <Header />
      <Back
        name="Cost Calculation"
        title=" We predict the cost to the best rates in the marcket?"
        cover={img}
      />
      <div className="uploader">
        <input type="file" onChange={(e) => handleDrop(e.target.files)} />
        <button onClick={handleSubmit}>Submit</button>
        {totalWallArea > 0 && floorArea > 0 && (
          <p>
            Total Wall Area: {totalWallArea} square feet
            <br />
            Floor Area: {floorArea} square feet
            <br />
            Cost Per Square Feet: Rs.{costPerSquareFeet.toFixed(2)}
            <br />
            Cost Per Floor Square Feet: Rs.{costPerFloorSquareFeet.toFixed(2)}
            <br />
            Total Cost: Rs.{totalCost.toFixed(2)} {/* Display total cost */}
          </p>
        )}
      </div>
      <Footer />
    </div>
  );
}
