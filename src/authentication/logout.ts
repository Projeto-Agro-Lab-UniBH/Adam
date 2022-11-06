import { Request, Response } from "express";

export class LogoutController {
  async handle(request: Request, response: Response) {
    response.cookie('jwt', '', { maxAge: 0 })

    return response.send({
      message: 'Success logout'
    })
  }
}