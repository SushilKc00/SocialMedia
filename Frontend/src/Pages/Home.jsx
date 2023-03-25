import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Feed } from "../componetns/Feed";
import { Rightbar } from "../componetns/Rightbar";
import { Leftbar } from "../componetns/Leftbar";
import { Header } from "../componetns/header";

export const Home = () => {
  return (
    <>
      <Header />
      <Wrapper>
        <Leftbar />
        <Feed />
        <Rightbar />
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  display: flex;
`;
