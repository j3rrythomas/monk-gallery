import React from "react";
import styled from "styled-components";

import { PhotoType } from "../types";
import { ContentDiv } from "../styles";

const PhotoDiv = styled(ContentDiv)`
  align-items: center;
`;
const Image = styled.img`
  width: 300px;
  height: 300px;
  border-radius: 20px;
`;

const Photo = ({ data }: { data: PhotoType }) => {
  return (
    <>
      <PhotoDiv className="col-xl-3 col-lg-4 col-md-6 col-sm-12">
        <Image src={data.url} alt={data.title} />
      </PhotoDiv>
    </>
  );
};

export default Photo;
