type User = {
  id: string;
  profile_photo: string;
  imageUrl: string;
  username: string;
  email: string;
};

export interface UserToken {
  token: string;
  user: User;
}
