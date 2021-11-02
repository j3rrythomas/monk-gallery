import React, { ChangeEventHandler } from "react";
import styled from "styled-components";
import { useState, useEffect } from "react";
import axios, { AxiosResponse } from "axios";

import "./App.css";
import { User } from "./components";

export interface UserType {
  id: number;
  name: string;
  username: string;
  email: string;
  numAlbums: number;
}
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
  width: 25%;
  padding: 1%;
`;
const UsersDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
`;
const SearchDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50%;
  button {
    padding: 1% 2%;
  }
`;

const App = () => {
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
      .then((response: AxiosResponse) => {
        return response.data;
      })
      .then((usersData: UserType[]) => {
        const albumRequests = usersData.map((user) => {
          return axios
            .get(`https://jsonplaceholder.typicode.com/users/${user.id}/albums`)
            .then((response: AxiosResponse) => {
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
        <SearchDiv>
          <SearchInput className="form-control" type="text" value={searchValue} onChange={searchUsers} />
          <button className="btn btn-primary" onClick={updateSearchResults}>Search</button>
        </SearchDiv>
      </Headerdiv>
      <UsersDiv>
        {matchingUsers.map((user) => {
          return <User key={user.id} data={user} />;
        })}
      </UsersDiv>
    </HomeDiv>
  );
};

export default App;
