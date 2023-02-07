import React, { useEffect, useState } from "react";
import styledComponents from "styled-components";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { mobile } from "../responsive";
import axios from "axios";
import { removeItemToCart, setItemToCart } from "../redux/cartRedux";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
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
const ProductName = styledComponents.span``;
const ProductId = styledComponents.span``;
const ProductColor = styledComponents.div`
    height:20px;
    width:20px;
    border-radius:50%;
    background-color:${(props) => props.color};
`;
const ProductSize = styledComponents.span``;
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
    justify-content:center;
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

const Summary = styledComponents.div`
    flex:1;
    border:0.5px solid lightgray;
    border-radius:10px;
    padding:20px;
    height:auto;
    max-height:350px
`;

const SummaryTitle = styledComponents.h1`
    font-weight:200;
`;
const SummaryItem = styledComponents.div`
    margin:20px 0;
    display: flex;
    justify-content: space-between;
    font-weight: ${(props) => props.type === "total" && "500"};
    font-size: ${(props) => props.type === "total" && "24px"};
`;
const SummaryItemText = styledComponents.span``;
const SummaryItemPrice = styledComponents.span``;
const Button = styledComponents.button`
    width: 100%;
    padding: 10px;
    background-color: black;
    color: white;
    font-weight: 600;
    cursor:pointer
`;

const Cart = () => {
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [orderTotal, setOrderTotal] = useState(0);
  const [cart, setCart] = useState({});
  const [order, setOrder] = useState([]);
  const [orderId, setOrderId] = useState("");
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const getCartItem = async () => {
      try {
        const res = await axios.get(
          `https://ecommerce-backend-tf4t.onrender.com/api/cart/find/${user.currentUser._id}`,
          {
            headers: {
              token: "Bearer " + user.currentUser.accessToken,
            },
          }
        );

        setLoading(false);

        if (res.data) {
          setCart(res.data);
          let a = 0;
          res.data.products.forEach((element) => {
            a += element.price * element.quantity;
          });
          setTotal(a);
        } else {
          setCart({});
          setTotal(0);
        }
      } catch (err) {
        console.log(err.message);
      }
    };

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

        setOrder(res.data);

        if (res.data.length > 0) {
          setOrderId(res.data[0]._id);
          setOrderTotal(res.data[0].amount);
        }
      } catch (err) {
        console.log(err.message);
      }
    };

    if (user) {
      getCartItem();
      getOrder();
    }
  }, [user]);

  // console.log(cart);

  const handleDeleteClick = async (id, product) => {
    let newProducts = cart.products.filter((product) => product._id !== id);

    const res = await axios.put(
      `https://ecommerce-backend-tf4t.onrender.com/api/cart/${user.currentUser._id}`,
      {
        products: newProducts,
      },
      {
        headers: {
          token: "Bearer " + user.currentUser.accessToken,
        },
      }
    );

    let a = 0;
    res.data.products.forEach((element) => {
      a += element.price * element.quantity;
    });

    setTotal(a);

    res && setCart(res.data);
    dispatch(removeItemToCart({ ...product }));
  };

  const handleOpenRazorpay = (data) => {
    let options = {
      key: "rzp_test_7hUvqKUbEBiMqi",
      amount: Number(data.amount) * 100,
      currency: data.currency,
      name: "Shoppify",
      order_id: data.id,
      handler: async function (response) {
        try {
          const res = await axios.post(
            `https://ecommerce-backend-tf4t.onrender.com/api/checkout/verify`,
            { response: response }
          );

          if (res.data.message === "Sign Valid") {
            if (order.length === 0) {
              const res = await axios.post(
                `https://ecommerce-backend-tf4t.onrender.com/api/order`,
                {
                  userId: user.currentUser._id,
                  products: cart.products,
                  amount: total,
                },
                {
                  headers: {
                    token: "Bearer " + user.currentUser.accessToken,
                  },
                }
              );
              console.log(res.data);
            } else {
              await axios.put(
                `https://ecommerce-backend-tf4t.onrender.com/api/order/${user.currentUser._id}/${orderId}`,
                {
                  products: [...cart.products, ...order[0].products],
                  amount: total + orderTotal,
                },
                {
                  headers: {
                    token: "Bearer " + user.currentUser.accessToken,
                  },
                }
              );
            }

            const res = await axios.put(
              `https://ecommerce-backend-tf4t.onrender.com/api/cart/${user.currentUser._id}`,
              {
                products: [],
              },
              {
                headers: {
                  token: "Bearer " + user.currentUser.accessToken,
                },
              }
            );

            setCart(res.data);
            setTotal(0);
            dispatch(setItemToCart({ quantity: 0, total: total }));
            navigate("/order");
          }
        } catch (err) {
          console.log(err);
        }
      },
    };
    let rzp1 = new window.Razorpay(options);
    rzp1.open();
  };

  const handleCheckout = async () => {
    try {
      const res = await axios.post(
        `https://ecommerce-backend-tf4t.onrender.com/api/checkout/payment`,
        {
          amount: total >= 50 ? total : total > 0 ? total + 5 : 0,
        }
      );

      handleOpenRazorpay(res.data);
      // console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // console.log(user);

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
            <Title>YOUR CART</Title>
            <Top>
              <Link to="/">
                <TopButton>CONTINUE SHOPPING</TopButton>
              </Link>
              <TopTexts>
                <Link to="/order" className="link">
                  <TopText>Orders</TopText>
                </Link>
              </TopTexts>
              <TopButton type="filled" onClick={handleCheckout}>
                Place Order
              </TopButton>
            </Top>
            <Bottom>
              <Info>
                {cart.products?.map((product, index) => (
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
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        paddingRight: "15px",
                      }}
                    >
                      <Button
                        style={{ cursor: "pointer" }}
                        onClick={() => handleDeleteClick(product._id, product)}
                      >
                        Delete
                      </Button>
                    </div>
                  </Product>
                ))}
                <Hr />
              </Info>
              <Summary>
                <SummaryTitle>ORDER SUMMARY</SummaryTitle>
                <SummaryItem>
                  <SummaryItemText>Subtotal</SummaryItemText>
                  <SummaryItemPrice>$ {total}</SummaryItemPrice>
                </SummaryItem>
                <SummaryItem>
                  <SummaryItemText>Estimated Shipping</SummaryItemText>
                  <SummaryItemPrice>$ 5</SummaryItemPrice>
                </SummaryItem>
                <SummaryItem>
                  <SummaryItemText>Shipping Discount</SummaryItemText>
                  <SummaryItemPrice>
                    $ {total >= 50 ? -5 : 0.0}
                  </SummaryItemPrice>
                </SummaryItem>
                <SummaryItem type="total">
                  <SummaryItemText>Total</SummaryItemText>
                  <SummaryItemPrice>
                    $ {total >= 50 ? total : total > 0 ? total + 5 : 0}
                  </SummaryItemPrice>
                </SummaryItem>

                <Button onClick={handleCheckout}>CHECKOUT NOW</Button>
              </Summary>
            </Bottom>
          </Wrapper>
          <Footer />
        </>
      )}
    </Container>
  );
};

export default Cart;
