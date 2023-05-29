type User = {
  id: string;
  profile_photo: string;
  username: string;
  email: string;
};

export interface UserToken {
  token: string;
  user: User;
}
