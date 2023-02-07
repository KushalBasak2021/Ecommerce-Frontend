import React, { useEffect } from "react";
import styled from "styled-components";
import Badge from "@material-ui/core/Badge";
import ShoppingCartOutlinedIcon from "@material-ui/icons/ShoppingCartOutlined";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { mobile } from "../responsive";
import { Logout } from "../redux/apiCalls";
import axios from "axios";
import { setItemToCart } from "../redux/cartRedux";

const Container = styled.div`
  height: 60px;
  ${mobile({ height: "50px" })}
`;

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  ${mobile({ padding: "10px 0" })}
`;

const Center = styled.div`
  flex: 1;
  text-align: left;
`;

const Logo = styled.h1`
  font-weight: bold;
  text-transform: uppercase;
  ${mobile({ fontSize: "25px" })}
`;

const Right = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  ${mobile({ justifyContent: "center", flex: 2 })}
`;

const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
  ${mobile({ fontSize: "12px", marginLeft: "10px" })}
`;

const Navbar = () => {
  const user = useSelector((state) => state.user.currentUser);
  const cartItem = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  useEffect(() => {
    const getCartItem = async () => {
      try {
        const res = await axios.get(
          `https://ecommerce-backend-tf4t.onrender.com/api/cart/find/${user._id}`,
          {
            headers: {
              token: "Bearer " + user.accessToken,
            },
          }
        );

        if (res.data) {
          let a = 0;
          res.data.products.forEach((element) => {
            a += element.price * element.quantity;
          });

          dispatch(
            setItemToCart({ quantity: res.data.products.length, total: a })
          );
        } else {
          dispatch(setItemToCart({ quantity: 0, total: 0 }));
        }
      } catch (err) {
        console.log(err.message);
      }
    };

    if (user) {
      getCartItem();
    }
  }, [user, dispatch]);

  return (
    <Container>
      <Wrapper>
        <Center>
          <Link to="/" className="link">
            <Logo>Shoppify</Logo>
          </Link>
        </Center>
        <Right>
          {!user ? (
            <>
              <Link to="/register" className="link">
                <MenuItem>REGISTER</MenuItem>
              </Link>
              <Link to="/login" className="link">
                <MenuItem>SIGN IN</MenuItem>
              </Link>
            </>
          ) : (
            <>
              <MenuItem onClick={() => Logout(dispatch)}>Logout</MenuItem>
              <Link to="/order" className="link">
                <MenuItem>Orders</MenuItem>
              </Link>
              <MenuItem>{user.username}</MenuItem>
            </>
          )}

          <Link to="/cart" className="link">
            <MenuItem>
              <Badge
                badgeContent={!user ? 0 : cartItem.quantity}
                color="primary"
                overlap="rectangular"
              >
                <ShoppingCartOutlinedIcon />
              </Badge>
            </MenuItem>
          </Link>
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Navbar;
