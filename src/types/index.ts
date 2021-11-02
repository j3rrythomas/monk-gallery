export interface UserType {
  id: number;
  name: string;
  username: string;
  email: string;
  numAlbums: number;
}

export interface AlbumType {
  userId: number;
  id: number;
  title: string;
  numPhotos: number;
}
