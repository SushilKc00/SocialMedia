import React from "react";
import { Leftbar } from "../componetns/Leftbar";
import styled from "styled-components";
import { Header } from "../componetns/header";
export const Allnews = () => {
  return (
    <Wrapper>
      <Header />
      <div className="newsarea">
        <Leftbar />
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .newsarea {
    width: 55%;
    margin: auto;
  }
  @media screen and (max-width: 768px) {
    .newsarea {
      width: 98%;
    }
  }
`;
