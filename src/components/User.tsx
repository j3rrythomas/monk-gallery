import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import { UserType } from "../types";

export const UserDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  padding: 2%;
`;

const User = ({ data }: { data: UserType }) => {
  return (
    <UserDiv className="col-lg-3 col-md-6 col-sm-12">
      <h2 style={{ fontSize: "1.125rem", fontWeight: 400 }}>
        <Link to={`/user/${data.id}/albums`}>{data.name}</Link>
      </h2>
      <h3 style={{ fontSize: "1rem" }}>Username: {data.username}</h3>
      <h3 style={{ fontSize: "1rem" }}>Email: {data.email}</h3>
      <span>Number of Albums: {data.numAlbums}</span>
    </UserDiv>
  );
};

export default User;
