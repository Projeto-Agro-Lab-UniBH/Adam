import { Request, Response } from "express";
import { UpdateUserAccountUseCase } from "../usecases/update-user-account-usecase";

export class UpdateUserAccountController {
  constructor(private updateUserAccountUseCase: UpdateUserAccountUseCase) { }

  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const {
      profile_photo,
      fullname,
      birthdate,
      home_state,
      email,
      cell_phone_contact,
      residential_phone_contact,
      campus_name,
      profession,
      ra,
      password
    } = request.body;

    const user = await this.updateUserAccountUseCase.execute({
      id,
      profile_photo,
      fullname,
      birthdate,
      home_state,
      email,
      cell_phone_contact,
      residential_phone_contact,
      campus_name,
      profession,
      ra,
      password
    })

    const { password: _, ...data } = user;

    return response.status(200).json({ message: "User successfully updated in in dataset", user: { data: data } });
  }
}