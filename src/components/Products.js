import React, { useEffect, useState } from "react";
import styledComponents from "styled-components";
import ProductItem from "./ProductItem";
import axios from "axios";

const Container = styledComponents.div`
    display: flex;
    padding:20px;
    flex-wrap: wrap;
    justify-content: space-between;
`;

const Products = ({ cat, filters, sort, setLoading }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get(
          cat
            ? `https://ecommerce-backend-tf4t.onrender.com/api/products?category=${cat}`
            : "https://ecommerce-backend-tf4t.onrender.com/api/products"
        );
        setLoading(false);
        setProducts(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getProducts();
  }, [cat, setLoading]);

  useEffect(() => {
    cat &&
      setFilteredProducts(
        JSON.stringify(filters) !== "{}"
          ? products.filter(
              (item) =>
                item.color.includes(filters.color) ||
                item.size.includes(filters.size)
            )
          : products
      );
  }, [products, cat, filters]);

  useEffect(() => {
    if (sort === "newest") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => a.createdAt - b.createdAt)
      );
    } else if (sort === "asc") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => a.price - b.price)
      );
    } else {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => b.price - a.price)
      );
    }
  }, [sort]);

  // console.log(products);

  return (
    <Container>
      {cat
        ? filteredProducts.map((product, index) => (
            <ProductItem product={product} key={index} />
          ))
        : products
            .slice(0, 8)
            .map((product, index) => (
              <ProductItem product={product} key={index} />
            ))}
    </Container>
  );
};

export default Products;
