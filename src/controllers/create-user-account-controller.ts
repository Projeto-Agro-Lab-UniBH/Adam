import { Request, Response } from "express";
import { CreateUserAccountUseCase } from "../usecases/create-user-account-usecase";

export class CreateUserAccountController {
  constructor(private createUserAccountUseCase: CreateUserAccountUseCase) { }

  async handle(request: Request, response: Response): Promise<Response> {
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

    const user = await this.createUserAccountUseCase.execute({
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
    });

    const { password: _, ...data } = user

    return response.status(201).json({ message: "User successfully created", user: { data: data } });
  }
}