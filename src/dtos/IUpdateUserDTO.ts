export interface IUpdateUserDTO {
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
}