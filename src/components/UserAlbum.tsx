import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import { AlbumType } from "../types";
import { UserDiv } from "./User";

const UserAlbumDiv = styled(UserDiv)``;

const UserAlbum = ({ data }: { data: AlbumType }) => {
  return (
    <>
      <UserAlbumDiv className="col-lg-3 col-md-6 col-sm-12">
        <h2 style={{ fontSize: "1.125rem", fontWeight: 400 }}>
          Album Title:{"  "}
          <Link to={`/user/${data.userId}/albums/${data.id}/photos`}>
            {data.title}
          </Link>
        </h2>
        <span>Number of Pictures: {data.numPhotos}</span>
      </UserAlbumDiv>
    </>
  );
};

export default UserAlbum;
