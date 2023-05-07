import { User } from '@prisma/client';

export class UserEntity implements User {
  id: string;
  profile_photo: string;
  username: string;
  email: string;
  password: string;
}
