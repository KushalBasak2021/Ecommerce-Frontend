import {
  Facebook,
  Instagram,
  MailOutline,
  Phone,
  Pinterest,
  Room,
  Twitter,
} from "@material-ui/icons";
import React from "react";
import styledComponents from "styled-components";
import { mobile } from "../responsive";

const Container = styledComponents.div`
    display:flex;
    ${mobile({ flexDirection: "column" })}
`;
const Left = styledComponents.div`
    flex:1;
    display:flex;
    flex-direction:column;
    padding:20px;
`;

const Logo = styledComponents.h1``;
const Desc = styledComponents.p`
  margin:20px 0;
`;
const SocialContainer = styledComponents.div`
  display:flex;
`;
const SocialIcon = styledComponents.div`
  width:40px;
  height:40px;
  border-radius:50%;
  color: white;
  background-color:#${(props) => props.color};
  display:flex;
  justify-content:center;
  align-items:center;
  margin-right:20px;
`;

const Center = styledComponents.div`
    flex:1;
    padding:20px;
    ${mobile({ display: "none" })}
`;

const Title = styledComponents.h3`
  margin-bottom:30px;
`;
const List = styledComponents.ul`
  list-style:none;
  display:flex;
  flex-wrap:wrap;
`;
const ListItem = styledComponents.li`
  width:50%;
  margin-bottom:10px;
`;

const Right = styledComponents.div`
    flex:1;
    padding:20px;
`;

const ContactItem = styledComponents.div`
  margin-bottom:20px;
  display:flex;
  align-items:center;
`;

const Payment = styledComponents.img`

`;

const Footer = () => {
  return (
    <Container>
      <Left>
        <Logo>SHOPPIFY</Logo>
        <Desc>
          There are many variations of passages of Lorem Ipsum available, but
          the majority have suffered alteration in some form, by injected
          humour, or randomised words which don’t look even slightly believable.
        </Desc>
        <SocialContainer>
          <SocialIcon color="3B5999">
            <Facebook />
          </SocialIcon>
          <SocialIcon color="E4405F">
            <Instagram />
          </SocialIcon>
          <SocialIcon color="55ACEE">
            <Twitter />
          </SocialIcon>
          <SocialIcon color="E60023">
            <Pinterest />
          </SocialIcon>
        </SocialContainer>
      </Left>
      <Center>
        <Title>Useful Links</Title>
        <List>
          <ListItem>Home</ListItem>
          <ListItem>Cart</ListItem>
          <ListItem>Man Fashion</ListItem>
          <ListItem>Woman Fashion</ListItem>
          <ListItem>Accessories</ListItem>
          <ListItem>My Account</ListItem>
          <ListItem>Order Tracking</ListItem>
          <ListItem>Wishlist</ListItem>
          <ListItem>Wishlist</ListItem>
          <ListItem>Terms</ListItem>
        </List>
      </Center>
      <Right>
        <Title>Contact</Title>
        <ContactItem>
          <Room style={{ marginRight: 10 }} />
          622 Dixie Path , South Tobinchester 98336
        </ContactItem>
        <ContactItem>
          <Phone style={{ marginRight: 10 }} />
          +1 234 56 78
        </ContactItem>
        <ContactItem>
          <MailOutline style={{ marginRight: 10 }} />
          contact@kushal.com
        </ContactItem>
        <Payment src="https://i.ibb.co/Qfvn4z6/payment.png" />
      </Right>
    </Container>
  );
};

export default Footer;
