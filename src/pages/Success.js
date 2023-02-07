import React from "react";
import styledComponents from "styled-components";

const Container = styledComponents.div`

  width:30vw;
  margin:auto;
  margin-top:35vh;
  text-align:center;
`;

const SuccessDiv = styledComponents.div`
  display:flex;
  flex-direction:column;
  gap:2rem;
  align-items:center;
  justify-content:center;
`;

const SuccessText = styledComponents.p`
  font-size:25px
`;

const Button = styledComponents.button`
    width: 50%;
    padding: 10px;
    background-color: black;
    color: white;
    font-weight: 600;
    cursor:pointer
`;

const Success = () => {
  return (
    <Container>
      <SuccessDiv>
        <SuccessText>Payment Successful</SuccessText>
        <Button>Go to Order</Button>
      </SuccessDiv>
    </Container>
  );
};

export default Success;
