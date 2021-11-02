import React from "react";
import styled from "styled-components";
import { useLocation } from "react-router";
import { useState, useEffect } from "react";
import axios from "axios";

import { AlbumType } from "../types";
import { UserAlbum } from "../components";

const UserAlbumsDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
`;
const Title = styled.h1`
  margin: 2%;
`;

const UserAlbums = () => {
  const [albums, setAlbums] = useState<AlbumType[]>([]);
  const fetchAlbums = () => {
    axios
      .get(`https://jsonplaceholder.typicode.com${pathId}`)
      .then((response) => response.data)
      .then((albumsData: AlbumType[]) => {
        const photosRequests = albumsData.map((album) => {
          return axios
            .get(
              `https://jsonplaceholder.typicode.com/albums/${album.id}/photos`
            )
            .then((response) => {
              album.numPhotos = response.data.length;
              return album;
            });
        });
        Promise.all(photosRequests).then((data) => {
          setAlbums(data);
        });
      });
  };
  useEffect(() => {
    fetchAlbums();
  }, []);
  const { pathname: pathId } = useLocation();
  return (
    <>
      <Title>Albums</Title>
      {albums.map((album) => {
        return (
          <UserAlbumsDiv>
            {albums.map((album) => (
              <UserAlbum key={album.id} data={album} />
            ))}
          </UserAlbumsDiv>
        );
      })}
    </>
  );
};

export default UserAlbums;
