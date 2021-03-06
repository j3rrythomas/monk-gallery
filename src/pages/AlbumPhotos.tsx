import React, { useCallback } from "react";
import styled from "styled-components";
import { useLocation } from "react-router";
import { useState, useEffect } from "react";
import axios from "axios";

import { PhotoType } from "../types";
import { Photo, Loading } from "../components";
import { DataContainerDiv, Title } from "../styles";

const AlbumPhotosDiv = styled(DataContainerDiv)``;

const AlbumPhotos = () => {
  const [photos, setPhotos] = useState<PhotoType[]>([]);
  const [loading, isLoading] = useState<Boolean>(true);
  const { pathname } = useLocation();
  const fetchPhotos = useCallback(() => {
    axios
      .get(`https://jsonplaceholder.typicode.com${pathname}`)
      .then((response) => response.data)
      .then((photosData: PhotoType[]) => {
        setPhotos(photosData);
        isLoading(false);
      });
  }, [pathname]);
  useEffect(() => {
    fetchPhotos();
  }, [fetchPhotos]);
  return (
    <>
      <Title>Photos</Title>
      {!loading ? (
        <AlbumPhotosDiv>
          {photos.map((photo) => (
            <Photo key={photo.id} data={photo} />
          ))}
        </AlbumPhotosDiv>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default AlbumPhotos;
