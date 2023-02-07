import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styledComponents from "styled-components";
import { mobile } from "../responsive";

const Container = styledComponents.div`
    width:100vw;
    height:100vh;
    background: linear-gradient(
        rgba(255, 255, 255, 0.5),
        rgba(255, 255, 255, 0.5)
      ),
      url("https://images.pexels.com/photos/6984661/pexels-photo-6984661.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")
        center;
    background-size:cover;
    display: flex;
    align-items: center;
    justify-content: center;
`;
const Wrapper = styledComponents.div`
        width:40%;
        min-width:300px;
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
        display:flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content:center;
`;
const Input = styledComponents.input`
      width:45%;
      margin:20px 10px 0 0; 
      padding:5px;
      ${mobile({ width: "100%" })}
`;
const Button = styledComponents.button`
      width: 40%;
      border: none;
      padding: 15px 20px;
      background-color: teal;
      color: white;
      cursor: pointer;

      &:disabled{
        color:green;
        cursor:not-allowed
      }
`;
const Agreement = styledComponents.span`
        font-size:12px; 
        margin:20px 0;
`;

const Error = styledComponents.span`
        color:red;
        padding-top:10px
`;

const Register = () => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState(false);
  const [isfetching, setIsfetching] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  function handleChange(e) {
    setUser((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  }

  const validateForm = (e) => {
    let formIsValid = true;
    if (!user.username.match("^[a-zA-Z0-9_ ]*$")) {
      formIsValid = false;
      setError(true);
      setErrorMsg("Username must be alphabet and number only");
    }

    if (!/\S+@\S+\.\S+/.test(user.email)) {
      formIsValid = false;
      setError(true);
      setErrorMsg("Plase give a valid email");
    }

    if (user.password !== user.confirmPassword) {
      formIsValid = false;
      setError(true);
      setErrorMsg("Password should be matched with confirm Password");
    }

    return formIsValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      user.username === "" ||
      user.email === "" ||
      user.password === "" ||
      user.confirmPassword === ""
    ) {
      setError(true);
      setErrorMsg("Please fill all the field");
    } else if (!validateForm()) {
      setError(true);
    } else {
      setError(false);
      try {
        setIsfetching(true);
        const res = await axios.post(
          "https://ecommerce-backend-tf4t.onrender.com/api/auth/register",
          {
            username: user.username,
            email: user.email,
            password: user.password,
          }
        );
        res.data && navigate("/login");
        setIsfetching(false);
      } catch (err) {
        setError(true);
        setErrorMsg("Username or Email is already present");
        setIsfetching(false);
      }
    }
  };

  return (
    <Container>
      <Wrapper>
        <Title>CREATE AN ACCOUNT</Title>
        <Form onSubmit={handleSubmit}>
          <Input
            type="text"
            placeholder="username"
            name="username"
            value={user.username}
            onChange={handleChange}
          />
          <Input
            type="email"
            placeholder="email"
            name="email"
            value={user.email}
            onChange={handleChange}
          />
          <Input
            type="password"
            placeholder="password"
            name="password"
            value={user.password}
            onChange={handleChange}
          />
          <Input
            type="password"
            placeholder="confirm password"
            name="confirmPassword"
            value={user.confirmPassword}
            onChange={handleChange}
          />
          <Agreement>
            By creating an account, I consent to the processing of my personal
            data in accordance with the <b>PRIVACY POLICY</b>
          </Agreement>
          <Button type="submit" disabled={isfetching}>
            CREATE
          </Button>
        </Form>
        {error && <Error>{errorMsg}</Error>}
      </Wrapper>
    </Container>
  );
};

export default Register;
