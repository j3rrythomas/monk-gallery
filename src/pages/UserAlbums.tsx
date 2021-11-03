import React from "react";
import styled from "styled-components";
import { useLocation } from "react-router";
import { useState, useEffect } from "react";
import axios from "axios";

import { AlbumType } from "../types";
import { UserAlbum, Loading } from "../components";
import { Title, DataContainerDiv } from "../styles";

const UserAlbumsDiv = styled(DataContainerDiv)``;

const UserAlbums = () => {
  const [albums, setAlbums] = useState<AlbumType[]>([]);
  const [loading, isLoading] = useState<Boolean>(true);
  const fetchAlbums = () => {
    axios
      .get(`https://jsonplaceholder.typicode.com${pathname}`)
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
          isLoading(false);
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };
  useEffect(() => {
    fetchAlbums();
  }, []);
  const { pathname } = useLocation();
  return (
    <>
      <Title>Albums</Title>
      {!loading ? (
        <UserAlbumsDiv>
          {albums.map((album) => (
            <UserAlbum key={album.id} data={album} />
          ))}
        </UserAlbumsDiv>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default UserAlbums;
