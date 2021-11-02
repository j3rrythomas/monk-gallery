import React, { ChangeEventHandler } from "react";
import styled from "styled-components";
import { useState, useEffect } from "react";
import axios from "axios";

import { User } from "../components";
import { UserType } from "../types";

const HomeDiv = styled.div``;
const Headerdiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;
const Title = styled.h1`
  margin: 2%;
`;
const SearchInput = styled.input`
  padding: 1%;
`;
export const UsersDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
`;
const SearchDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  button {
    padding: 1% 2%;
  }
`;

const Users = () => {
  const [users, setUsers] = useState<UserType[]>([]);
  const [searchValue, setSearchValue] = useState<string>("");
  const [matchingUsers, setMatchingUsers] = useState<UserType[]>([]);
  const searchUsers: ChangeEventHandler<HTMLInputElement> = (event) => {
    event.preventDefault();
    setSearchValue(event.target.value);
  };
  const updateSearchResults: React.MouseEventHandler<HTMLButtonElement> = (
    event
  ) => {
    searchValue === ""
      ? setMatchingUsers(users)
      : setMatchingUsers(
          users.filter((user) => {
            return (
              user.name.toUpperCase().indexOf(searchValue.toUpperCase()) >= 0
            );
          })
        );
  };
  const fetchUsers = () => {
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.data)
      .then((usersData: UserType[]) => {
        const albumRequests = usersData.map((user) => {
          return axios
            .get(`https://jsonplaceholder.typicode.com/users/${user.id}/albums`)
            .then((response) => {
              user.numAlbums = response.data.length;
              return user;
            });
        });
        Promise.all(albumRequests).then((data) => {
          setUsers(data);
          setMatchingUsers(data);
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    fetchUsers();
  }, []);
  return (
    <HomeDiv>
      <Headerdiv>
        <Title>Gallery</Title>
        <SearchDiv className="col-lg-6 col-md-12">
          <SearchInput
            className="form-control col-6"
            type="text"
            value={searchValue}
            onChange={searchUsers}
          />
          <button className="btn btn-primary" onClick={updateSearchResults}>
            Search
          </button>
        </SearchDiv>
      </Headerdiv>
      <UsersDiv>
        {matchingUsers.map((user) => (
          <User key={user.id} data={user} />
        ))}
      </UsersDiv>
    </HomeDiv>
  );
};

export default Users;
