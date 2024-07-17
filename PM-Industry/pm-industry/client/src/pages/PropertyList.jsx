import "../styles/List.scss";
import { useDispatch } from "react-redux";
import Header from "../components/Header";
import ListingCard from "../components/ListingCard";
import { useEffect, useState } from "react";
import { setPropertyList } from "../redux/state";
import Loader from "../components/Loader";
import Footer from "../components/Footer";
import Back from "../components/common/Back";
import img from "../images/about.jpg";

const PropertyList = () => {
  const [loading, setLoading] = useState(true);
  const [propertyList, setPropertyList] = useState([]);

  const dispatch = useDispatch();

  const getPropertyList = async () => {
    try {
      const response = await fetch("http://localhost:3001/properties", {
        method: "GET",
      });
      const data = await response.json();
      setPropertyList(data);
      setLoading(false);
    } catch (err) {
      console.log("Fetch all properties failed", err.message);
    }
  };

  useEffect(() => {
    getPropertyList();
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <>
      <Header />
      <Back
        name="Properties"
        title="We offer you premium properties in the island"
        cover={img}
      />
      <h1 className="title-list">Property List</h1>
      <div className="list">
        {propertyList.map(
          ({
            _id,
            creator,
            listingPhotoPaths,
            city,
            province,
            country,
            category,
            type,
            price,
            booking = false,
          }) => (
            <ListingCard
              key={_id}
              listingId={_id}
              creator={creator}
              listingPhotoPaths={listingPhotoPaths}
              city={city}
              province={province}
              country={country}
              category={category}
              type={type}
              price={price}
              booking={booking}
            />
          )
        )}
      </div>

      <Footer />
    </>
  );
};

export default PropertyList;
