import styled from "styled-components";

export const ContentDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  padding: 2%;
`;

export const Title = styled.h1`
  margin: 2%;
  @media (max-width: 968px) {
    margin: 5% 0%;
    text-align: center;
  }
`;

export const DataContainerDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
`;
