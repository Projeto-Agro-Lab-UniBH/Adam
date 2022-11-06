import { User } from "@prisma/client";

export class UserEntity implements User {
  readonly id: string;
  profile_photo: string | null;
  fullname: string;
  birthdate: string;
  home_state: string;
  email: string;
  cell_phone_contact: string | null;
  residential_phone_contact: string | null;
  campus_name: string;
  profession: string;
  ra: number;
  password: string;

  constructor(
    id: string,
    profile_photo: string | null,
    fullname: string,
    birthdate: string,
    home_state: string,
    email: string,
    cell_phone_contact: string | null,
    residential_phone_contact: string | null,
    campus_name: string,
    profession: string,
    ra: number,
    password: string,
  ) {
    this.id = id;
    this.profile_photo = profile_photo;
    this.fullname = fullname;
    this.birthdate = birthdate;
    this.home_state = home_state;
    this.email = email;
    this.cell_phone_contact = cell_phone_contact;
    this.residential_phone_contact = residential_phone_contact;
    this.campus_name = campus_name;
    this.profession = profession;
    this.ra = ra;
    this.password = password;
  }
}