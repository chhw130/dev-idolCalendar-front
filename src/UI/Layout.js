import React from "react";
import Footer from "./Footer";
import Headar from "./Header";
import styled from "styled-components";
const Div = styled.div`
  width: 100%;
  overflow: hidden;
`;
const Layout = (props) => {
  return (
    <Div>
      <Headar />
      <>{props.children}</>
      <Footer />
    </Div>
  );
};

export default Layout;
