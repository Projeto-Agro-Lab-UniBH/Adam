import { Request, Response } from "express";
import { UnauthorizedError } from "../../errors/ApiError";
import { IUserRepository } from "../../repositories/iUserAccountRepository";
import jwt from 'jsonwebtoken';

type JwtPayload = {
  id: string
}

export class AuthenticatedUserController {
  constructor(private userRepository: IUserRepository) { }

  async handle(request: Request, response: Response) {
    const cookie = request.cookies['jwt']
    // console.log(cookie)

    if (!cookie) {
      throw new UnauthorizedError('Unauthenticated');
    }

    const { id } = jwt.verify(cookie, process.env.JWTPASS ?? '') as JwtPayload
    // console.log(id)

    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new UnauthorizedError('Unauthenticated');
    }

    const { password: _, ...data } = user

    return response.json({ user: data, token: cookie })
  }
}

// return response.json(request.user)