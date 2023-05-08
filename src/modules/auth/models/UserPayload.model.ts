export interface UserPayload {
  sub: string;
  email: string;
  username: string;
  profile_photo: string;
  iat?: number;
  exp?: number;
}
