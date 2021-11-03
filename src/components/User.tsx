import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import { UserType } from "../types";
import {ContentDiv} from "../styles";

const UserDiv = styled(ContentDiv)``;
const Name = styled.h2`
  font-size: 1.125rem;
  font-weight: 600;
`;
const UserName = styled.h3`
  font-size: 1rem;
`;
const NumAlbums = styled.p`
  span {
    font-size: 1.125rem;
    font-weight: 600;
  }
`;
const Email = styled(UserName)``;

const User = ({ data }: { data: UserType }) => {
  return (
    <UserDiv className="col-xl-3 col-lg-4 col-md-6 col-sm-12">
      <Name>
        <Link to={`/user/${data.id}/albums`}>{data.name}</Link>
      </Name>
      <UserName>Username: {data.username}</UserName>
      <Email>Email: {data.email}</Email>
      <NumAlbums>
        Number of Albums: <span>{data.numAlbums}</span>
      </NumAlbums>
    </UserDiv>
  );
};

export default User;
