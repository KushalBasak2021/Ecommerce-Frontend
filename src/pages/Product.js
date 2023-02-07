import { Add, Remove } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import styledComponents from "styled-components";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Newsletter from "../components/Newsletter";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { mobile } from "../responsive";
import { addItemToCart } from "../redux/cartRedux";
import ClipLoader from "react-spinners/ClipLoader";

const Container = styledComponents.div``;
const Loader = styledComponents.div`
    display:flex;
    align-items:center;
    justify-content:center;
    height:100vh;`;
const Wrapper = styledComponents.div`
    padding:50px;
    display:flex;
    ${mobile({ flexDirection: "column", padding: "10px" })}
`;
const ImgContainer = styledComponents.div`
    flex:1;
`;
const Image = styledComponents.img`
    width:100%;
    height:80vh;
    object-fit:cover;
    ${mobile({ height: "40vh" })}
`;
const InfoContainer = styledComponents.div`
    flex:1;
    padding:0 50px;
    ${mobile({ padding: "0px 10px", paddingBottom: "20px" })}
`;
const Title = styledComponents.h1`
    font-weight:200;
`;
const Desc = styledComponents.p`
    margin:20px 0;
`;
const Price = styledComponents.span`
    font-size:40px;
    font-weight:100;
`;

const FilterContainer = styledComponents.div`
    width:50%;
    margin:30px 0;
    display:flex;
    justify-content:space-between;
    ${mobile({ width: "100%" })}
`;

const Filter = styledComponents.div`
    display:flex;
    align-items:center;
`;

const FilterTitle = styledComponents.span`
    font-size:20px;
    font-weight:200;
`;

const FilterColor = styledComponents.div`
    width:20px;
    height:20px;
    border-radius:50%;
    background-color:${(props) => props.color};
    margin:0px 5px;
    cursor:pointer
`;
const FilterSize = styledComponents.select`
    margin-left:10px;
    padding:5px;
`;
const FilterSizeOption = styledComponents.option``;
const AddContainer = styledComponents.div`
    width:50%;
    display:flex;
    align-items:center;
    justify-content:space-between;
    ${mobile({ width: "100%" })}
`;
const AmountContainer = styledComponents.div`
    display:flex;
    align-items:center;
    font-weight:700;
`;
const Amount = styledComponents.span`
    height:30px;
    width:30px;
    border-radius:10px;
    border:1px solid teal;
    display:flex;
    align-items:center;
    justify-content:center;
    margin:0 5px;
`;
const Button = styledComponents.button`
    border:2px solid teal;
    padding:10px;
    background-color:white;
    cursor: pointer;
    font-weight:500;

    &:hover{
        background-color:#f8f4f4;
    }
`;

const Product = () => {
  const user = useSelector((state) => state.user.currentUser);
  const location = useLocation();
  const id = location.pathname.split("/")[2];

  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState({});
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [color, setColor] = useState("");
  const [size, setSize] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await axios.get(
          `https://ecommerce-backend-tf4t.onrender.com/api/products/find/${id}`
        );
        setLoading(false);
        setProduct(res.data);
        setSize(res.data.size[0]);
        setColor(res.data.color[0]);
      } catch (err) {
        console.log(err.message);
      }
    };

    const getUserCart = async () => {
      try {
        const res = await axios.get(
          `https://ecommerce-backend-tf4t.onrender.com/api/cart/find/${user._id}`,
          {
            headers: {
              token: "Bearer " + user.accessToken,
            },
          }
        );
        setCart(res.data);
      } catch (err) {
        console.log(err.message);
      }
    };
    getProduct();
    user && getUserCart();
  }, [id, user]);

  // console.log(color, size, quantity);

  const handleQuantity = (type) => {
    if (type === "inc") {
      setQuantity((prevQuantity) => prevQuantity + 1);
    }
    if (type === "dec") {
      quantity > 1 && setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };

  const handleClick = () => {
    if (user) {
      const addToCart = async () => {
        if (!cart) {
          await axios.post(
            `https://ecommerce-backend-tf4t.onrender.com/api/cart`,
            {
              userId: user._id,
              products: [
                {
                  productId: product._id,
                  quantity: quantity,
                  color: color,
                  size: size,
                  img: product.img,
                  price: product.price,
                },
              ],
            },
            {
              headers: {
                token:
                  "Bearer " +
                  JSON.parse(
                    JSON.parse(localStorage.getItem("persist:root")).user
                  ).currentUser.accessToken,
              },
            }
          );
          dispatch(addItemToCart({ quantity: quantity, price: product.price }));
        } else {
          const res = await axios.put(
            `https://ecommerce-backend-tf4t.onrender.com/api/cart/${user._id}`,
            {
              products: [
                ...cart.products,
                {
                  productId: product._id,
                  quantity: quantity,
                  color: color,
                  size: size,
                  img: product.img,
                  title: product.title,
                  price: product.price,
                },
              ],
            },
            {
              headers: {
                token:
                  "Bearer " +
                  JSON.parse(
                    JSON.parse(localStorage.getItem("persist:root")).user
                  ).currentUser.accessToken,
              },
            }
          );

          res && setCart(res.data);
          dispatch(addItemToCart({ quantity: quantity, price: product.price }));
        }
      };
      addToCart();
    } else {
      // dispatch(addProduct({ ...product, quantity, color, size }));
      navigate("/login");
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
            <ImgContainer>
              <Image src={product.img} />
            </ImgContainer>
            <InfoContainer>
              <Title>{product.title}</Title>
              <Desc>{product.desc}</Desc>
              <Price>$ {product.price}</Price>
              <FilterContainer>
                <Filter>
                  <FilterTitle>Color:</FilterTitle>
                  {product.color?.map((color) => (
                    <FilterColor
                      color={color}
                      key={color}
                      onClick={() => setColor(color)}
                    />
                  ))}
                </Filter>
                <Filter>
                  <FilterTitle>Size</FilterTitle>
                  <FilterSize onChange={(e) => setSize(e.target.value)}>
                    {product.size?.map((size, index) => (
                      <FilterSizeOption key={index}>{size}</FilterSizeOption>
                    ))}
                  </FilterSize>
                </Filter>
              </FilterContainer>
              <AddContainer>
                <AmountContainer>
                  <Remove onClick={() => handleQuantity("dec")} />
                  <Amount>{quantity}</Amount>
                  <Add onClick={() => handleQuantity("inc")} />
                </AmountContainer>
                <Button onClick={handleClick}>ADD TO CART</Button>
              </AddContainer>
            </InfoContainer>
          </Wrapper>
          <Newsletter />
          <Footer />
        </>
      )}
    </Container>
  );
};

export default Product;
