import React, { useState } from "react";
import Categories from "../components/Categories";
import Announcement from "../components/Announcement";
import Navbar from "../components/Navbar";
import Newsletter from "../components/Newsletter";
import Slider from "../components/Slider";
import Products from "../components/Products";
import Footer from "../components/Footer";
import styledComponents from "styled-components";
import ClipLoader from "react-spinners/ClipLoader";

const Loader = styledComponents.div`
    display:flex;
    align-items:center;
    justify-content:center;
    height:100vh;`;

const Home = () => {
  const [loading, setLoading] = useState(true);
  return (
    <>
      {loading && (
        <Loader>
          <ClipLoader color="blue" size={40} />
        </Loader>
      )}
      <div style={{ display: loading && "none" }}>
        <Announcement />
        <Navbar />
        <Slider />
        <Categories />
        <Products setLoading={setLoading} />
        <Newsletter />
        <Footer />
      </div>
    </>
  );
};

export default Home;
