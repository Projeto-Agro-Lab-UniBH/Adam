import { Request, Response } from "express";
import { FindByIdUseCase } from "../usecases/find-by-id-usecase";

export class FindByIdController {
  constructor(private findByIdUseCase: FindByIdUseCase) { }

  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const user = this.findByIdUseCase.execute(id);

    return response.status(200).json({ messsage: "Profile found successfully!", user: { data: user } });
  }
}