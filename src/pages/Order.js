import React, { useEffect, useState } from "react";
import styledComponents from "styled-components";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { useSelector } from "react-redux";
import { mobile } from "../responsive";
import axios from "axios";
import { Link } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";

const Container = styledComponents.div``;
const Loader = styledComponents.div`
    display:flex;
    align-items:center;
    justify-content:center;
    height:100vh;`;
const Wrapper = styledComponents.div`
    padding:20px;
    ${mobile({ padding: "10px" })}
`;
const Title = styledComponents.h1`
    font-weight:300;
    text-align:center;
    padding-bottom:20px
`;

const Top = styledComponents.div`
    display:flex;
    align-items:center;
    justify-content:space-between;
    padding:20px;
`;

const TopButton = styledComponents.button`
    padding:10px;
    font-weight:600;
    cursor: pointer;
    border:${(props) => props.type === "filled" && "none"};
    background-color:${(props) =>
      props.type === "filled" ? "black" : "transparent"};
    color:${(props) => props.type === "filled" && "white"}
`;

const TopTexts = styledComponents.div`
    ${mobile({ display: "none" })}
`;
const TopText = styledComponents.span`
    text-decoration:underline;
    cursor: pointer;
    margin:0 10px;
`;

const Bottom = styledComponents.div`
    display:flex;
    justify-content:space-between;
    ${mobile({ flexDirection: "column" })}
`;
const Info = styledComponents.div`
    flex:3;
`;

const Product = styledComponents.div`
    display:flex;
    justify-content:space-between;
    padding-bottom:20px;
    ${mobile({ flexDirection: "column" })}

`;
const ProductDetail = styledComponents.div`
    flex:1;
    display:flex;
    align-items:center;
    justify-content:center;
`;
const Image = styledComponents.img`
    width:150px;
    height:150px;
    object-fit:cover
`;
const Details = styledComponents.div`
    padding:20px;
    display:flex;
    flex-direction:column;
    justify-content:space-around;
`;
const ProductName = styledComponents.span`
  padding-bottom:10px
`;
const ProductId = styledComponents.span`
padding-bottom:10px
`;
const ProductColor = styledComponents.div`
    height:20px;
    width:20px;
    border-radius:50%;
    margin-bottom:10px;
    background-color:${(props) => props.color};
`;
const ProductSize = styledComponents.span`
padding-bottom:10px
`;
const PriceDetail = styledComponents.div`
    flex:1;
    display:flex;
    align-items:center;
    justify-content:space-around;
    ${mobile({ flexDirection: "row" })}
`;
const ProductAmountContainer = styledComponents.div`
    display:flex;
    flex-direction:column;
    align-items:center;
    ${mobile({ marginBottom: "0px", marginRight: "40px" })}
`;
const ProductAmount = styledComponents.div`
    font-size:24px;
    margin:5px;
    ${mobile({ margin: "5px 15px" })}
`;
const ProductPrice = styledComponents.div`
    font-size:30px;
    font-weight:200;
`;

const Hr = styledComponents.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;

const Order = () => {
  const [products, setProducts] = useState([]);
  const user = useSelector((state) => state.user);
  const [loading, setLoading] = useState(true);
  // const dispatch = useDispatch();

  useEffect(() => {
    const getOrder = async () => {
      try {
        const res = await axios.get(
          `https://ecommerce-backend-tf4t.onrender.com/api/order/find/${user.currentUser._id}`,
          {
            headers: {
              token: "Bearer " + user.currentUser.accessToken,
            },
          }
        );

        setLoading(false);

        if (res.data) {
          res.data.forEach((order) => {
            setProducts((prev) => [...prev, ...order.products]);
          });
        }
      } catch (err) {
        console.log(err.message);
      }
    };

    if (user) {
      getOrder();
    }
  }, [user]);

  return (
    <Container>
      {loading ? (
        <Loader>
          <ClipLoader color="blue" size={40} />
        </Loader>
      ) : (
        <>
          <Navbar />
          <Announcement />
          <Wrapper>
            <Title>YOUR ORDERS</Title>
            <Top>
              <Link to="/">
                <TopButton>CONTINUE SHOPPING</TopButton>
              </Link>
              <TopTexts>
                <Link to="/cart" className="link">
                  <TopText>Shopping Bag</TopText>
                </Link>
                <TopText></TopText>
              </TopTexts>
              <Link to="/">
                <TopButton type="filled">CONTINUE SHOPPING</TopButton>
              </Link>
            </Top>
            <Bottom>
              <Info>
                {products.map((product, index) => (
                  <Product key={index}>
                    <ProductDetail>
                      <Image src={product.img} />
                      <Details>
                        <ProductName>
                          <b>Product:</b> {product.title}
                        </ProductName>
                        <ProductId>
                          <b>ID:</b> {product.productId}
                        </ProductId>
                        <ProductColor color={product.color} />
                        <ProductSize>
                          <b>Size:</b> {product.size}
                        </ProductSize>
                      </Details>
                    </ProductDetail>
                    <PriceDetail>
                      <ProductAmountContainer>
                        <p>
                          <b>Qty</b>
                        </p>
                        <ProductAmount>{product.quantity}</ProductAmount>
                      </ProductAmountContainer>
                      <ProductPrice>
                        <p style={{ fontWeight: 400 }}>Price</p>
                        <ProductAmount>{product.price}</ProductAmount>
                      </ProductPrice>
                      <ProductPrice>
                        <span style={{ fontWeight: 400 }}>Total</span>
                        <ProductAmount>
                          $ {product.price * product.quantity}
                        </ProductAmount>
                      </ProductPrice>
                    </PriceDetail>
                  </Product>
                ))}

                <Hr />
              </Info>
            </Bottom>
          </Wrapper>
          <Footer />
        </>
      )}
    </Container>
  );
};

export default Order;
