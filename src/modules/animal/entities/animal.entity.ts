import { Animal } from '@prisma/client';

export class AnimalEntity implements Animal {
  id: string;
  profile_photo: string;
  name: string;
  owner: string;
  specie: string;
  race: string;
  gender: string;
  type: string;
  weight: string;
  situation: string;
  physical_shape: string;
  entry_date: string;
  departure_date: string;
}
