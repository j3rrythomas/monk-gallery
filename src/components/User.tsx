import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import { UserType } from "../App";

const UserDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2%;
`;

const User = ({ data }: { data: UserType }) => {
  return (
    <UserDiv className="col-lg-3 col-md-4 col-sm-6 col-xs-12">
      <h2 style={{ fontSize: "1.25rem", fontWeight: 400 }}>
        <Link to={`/user/${data.id}/albums`}>{data.name}</Link> - {data.username}
      </h2>
      <h3 style={{ fontSize: "1.125rem" }}>{data.email}</h3>
      <span>Number of Albums - {data.numAlbums}</span>
    </UserDiv>
  );
};

export default User;
