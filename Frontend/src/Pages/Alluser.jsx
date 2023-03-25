import React from "react";
import styled from "styled-components";
import { Header } from "../componetns/header";
import { Rightbar } from "../componetns/Rightbar";

export const Alluser = () => {
  return (
    <Wrapper>
      <Header />
      <Rightbar />
    </Wrapper>
  );
};

const Wrapper = styled.header``;
