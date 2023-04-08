import { Request, Response } from "express";
import { FindAllUseCase } from "../usecases/find-all-usecase";

export class FindAllController {
  constructor(private findAllUseCase: FindAllUseCase) { }

  async handle(request: Request, response: Response): Promise<Response> {
    const list = await this.findAllUseCase.execute();
    return response.status(200).json({ message: "Request made successfully", profiles: list });
  }
}