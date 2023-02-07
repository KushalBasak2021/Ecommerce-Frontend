import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import styledComponents from "styled-components";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Newsletter from "../components/Newsletter";
import Products from "../components/Products";
import { mobile } from "../responsive";
import ClipLoader from "react-spinners/ClipLoader";

const Container = styledComponents.div``;

const Loader = styledComponents.div`
    display:flex;
    align-items:center;
    justify-content:center;
    height:100vh;`;

const Title = styledComponents.h1`
    margin:20px;
`;
const FilterContainer = styledComponents.div`
    display:flex;
    justify-content:space-between;
`;
const Filter = styledComponents.div`
    margin:20px;
    ${mobile({ display: "flex", flexDirection: "column" })}
`;

const FilterText = styledComponents.span`
    font-size:20px;
    font-weight:600;
    margin-right:20px;
    ${mobile({ marginRight: "0px" })}
`;

const Select = styledComponents.select`
    padding:10px;
    margin-right:20px;
    ${mobile({ margin: "10px 0" })}
`;
const Option = styledComponents.option``;

const ProductList = () => {
  const location = useLocation();
  const cat = location.pathname.split("/")[2];
  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState("newest");
  const [loading, setLoading] = useState(true);

  const handleFilters = (e) => {
    const value = e.target.value;
    setFilters({
      ...filters,
      [e.target.name]: e.target.name === "color" ? value.toLowerCase() : value,
    });
  };

  return (
    <>
      {loading && (
        <Loader>
          <ClipLoader color="blue" size={40} />
        </Loader>
      )}
      <Container style={{ display: loading && "none" }}>
        <Navbar />
        <Announcement />
        <Title>{cat}</Title>
        <FilterContainer>
          <Filter>
            <FilterText>Filter Products:</FilterText>
            <Select onChange={handleFilters} name="color">
              <Option disabled>Color</Option>
              <Option>Blue</Option>
              <Option>Black</Option>
              <Option>Red</Option>
              <Option>Grey</Option>
              <Option>Yellow</Option>
              <Option>White</Option>
            </Select>
            <Select onChange={handleFilters} name="size">
              <Option disabled>Size</Option>
              <Option>XS</Option>
              <Option>S</Option>
              <Option>M</Option>
              <Option>L</Option>
              <Option>XL</Option>
              <Option>XXL</Option>
            </Select>
          </Filter>
          <Filter>
            <FilterText>Sort Products:</FilterText>
            <Select onChange={(e) => setSort(e.target.value)}>
              <Option value="newest">Newest</Option>
              <Option value="asc">Price (asc)</Option>
              <Option value="desc">Price (desc)</Option>
            </Select>
          </Filter>
        </FilterContainer>
        <Products
          cat={cat}
          filters={filters}
          sort={sort}
          setLoading={setLoading}
        />
        <Newsletter />
        <Footer />
      </Container>
    </>
  );
};

export default ProductList;
