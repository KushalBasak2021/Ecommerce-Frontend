import React from "react";
import styledComponents from "styled-components";
import ShoppingCartOutlinedIcon from "@material-ui/icons/ShoppingCartOutlined";
import SearchOutlinedIcon from "@material-ui/icons/SearchOutlined";
import FavoriteBorderOutlinedIcon from "@material-ui/icons/FavoriteBorderOutlined";
import { Link } from "react-router-dom";

const Info = styledComponents.div`
    opacity:0;
    height:100%;
    width:100%;
    position:absolute;
    top:0; 
    left:0;
    z-index:3;
    display:flex;
    justify-content:center;
    align-items:center;
    background-color:rgba(0,0,0,0.2);
    transition:all 0.5s ease;
    cursor:pointer;
`;

const Container = styledComponents.div`
    flex:1;
    margin:5px;
    min-width:300px;
    height:350px;
    display:flex;
    align-items: center;
    justify-content: center;
    background-color: #f5fbfd;
    position:relative;

    &:hover ${Info}{
        opacity:1;
    }
`;
const Circle = styledComponents.div`
    width:200px;
    height:200px;
    border-radius:50%;
    background-color: white;
    position:absolute;
`;
const Image = styledComponents.img`
    height:80%;
    width:85%;
    object-fit:cover;
    z-index:2
`;

const Icon = styledComponents.div`
    height:40px;
    width:40px;
    border-radius:50%;
    background-color:white;
    display:flex;
    align-items:center;
    justify-content: center;
    margin:10px;
    transition:all 0.5s ease;

    &:hover{
        background-color:#e9f5f5;
        transform:scale(1.1)
    }
`;

const ProductItem = ({ product }) => {
  return (
    <Container>
      <Circle />
      <Image src={product.img} />
      <Info>
        <Icon>
          <Link to={`/product/${product._id}`} className="link">
            <ShoppingCartOutlinedIcon />
          </Link>
        </Icon>
        <Icon>
          <Link to={`/product/${product._id}`} className="link">
            <SearchOutlinedIcon />
          </Link>
        </Icon>
        <Icon>
          <FavoriteBorderOutlinedIcon />
        </Icon>
      </Info>
    </Container>
  );
};

export default ProductItem;
