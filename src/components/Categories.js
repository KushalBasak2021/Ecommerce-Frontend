import React from "react";
import styledComponents from "styled-components";
import CategoryItem from "./CategoryItem";
import { categories } from "../data";
import { mobile } from "../responsive";

const Container = styledComponents.div`
 display:flex;
 padding:20px;
 justify-content:space-between;
 ${mobile({ flexDirection: "column", padding: "0px" })}
 `;

const Categories = () => {
  return (
    <Container>
      {categories.map((item, index) => (
        <CategoryItem item={item} key={index} />
      ))}
    </Container>
  );
};

export default Categories;
