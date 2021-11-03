import React from "react";
import styled from "styled-components";

import { Title } from "../styles";

const LoadingDiv = styled.div`
  text-align: center;
`;
const Loading = () => {
  return (
    <LoadingDiv>
      <Title>Loading...</Title>
    </LoadingDiv>
  );
};

export default Loading;
