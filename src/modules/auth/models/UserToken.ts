import { User } from '@prisma/client';

export interface UserToken {
  user: Partial<User>;
  token: string;
}
