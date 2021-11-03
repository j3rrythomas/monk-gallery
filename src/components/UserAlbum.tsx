import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import { AlbumType } from "../types";
import { ContentDiv } from "../styles";

const UserAlbumDiv = styled(ContentDiv)`
  span {
    font-size: 1.125rem;
    font-weight: 600;
  }
`;
const AlbumTitle = styled.h2`
  font-size: 1.125rem;
  font-weight: 400;
`;
const UserAlbum = ({ data }: { data: AlbumType }) => {
  return (
    <>
      <UserAlbumDiv className="col-xl-3 col-lg-4 col-md-6 col-sm-12">
        <AlbumTitle>
          Album Title:{"  "}
          <Link to={`/albums/${data.id}/photos`}>{data.title}</Link>
        </AlbumTitle>
        <p>
          Number of Pictures: <span>{data.numPhotos}</span>
        </p>
      </UserAlbumDiv>
    </>
  );
};

export default UserAlbum;
