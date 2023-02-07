import React, { useState } from "react";
import styledComponents from "styled-components";
import { login } from "../redux/apiCalls";
import { mobile } from "../responsive";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Container = styledComponents.div`
    width:100vw;
    height:100vh;
    background: linear-gradient(
        rgba(255, 255, 255, 0.5),
        rgba(255, 255, 255, 0.5)
      ),
      url("https://images.pexels.com/photos/6984650/pexels-photo-6984650.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")
        center;
    background-size:cover;
    display: flex;
    align-items: center;
    justify-content: center;
`;
const Wrapper = styledComponents.div`
        width:25%;
        min-width:350px;
        padding:20px;
        background-color:white;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction:column;
        ${mobile({ width: "90%" })}
`;
const Title = styledComponents.h1`
        font-size:24px;
        font-weight:300;
`;
const Form = styledComponents.form`
        width:100%;
        display:flex;
        flex-direction:column;
        align-items: center;
        justify-content:center;
`;
const Input = styledComponents.input`
      width:90%;
      flex:1;
      margin:10px 0; 
      padding:10px
`;
const Button = styledComponents.button`
      width: 60%;
      border: none;
      padding: 15px 20px;
      background-color: teal;
      color: white;
      cursor: pointer;
      margin: 10px 0;

      &:disabled{
        color:green;
        cursor:not-allowed
      }
`;

const StaticLink = styledComponents.span`
  margin: 5px 0px;
  font-size: 12px;
  text-decoration: underline;
  cursor: pointer;
`;

const Error = styledComponents.span`
  color:red
`;

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { isFetching, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleClick = (e) => {
    e.preventDefault();
    login(dispatch, { username, password });
  };

  return (
    <Container>
      <Wrapper>
        <Title>SIGN IN</Title>
        <Form>
          <Input
            placeholder="username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            placeholder="password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button onClick={handleClick} disabled={isFetching}>
            LOGIN
          </Button>
          {error && <Error>Something went wrong</Error>}
          <Link to="/register">
            <StaticLink>CREATE A NEW ACCOUNT</StaticLink>
          </Link>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Login;
