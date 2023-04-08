import { Request, Response } from "express";
import { IUserRepository } from "../repositories/iUserAccountRepository";
import { BadRequestError } from "../errors/ApiError";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export class LoginController {
  constructor(private UserRepository: IUserRepository) { }

  async handle(request: Request, response: Response) {
    const { email, password } = request.body;

    const user = await this.UserRepository.findByEmail(email);

    if (!user) {
      throw new BadRequestError('Invalid email or password.');
    }

    const verifyPassword = await bcrypt.compare(password, user.password);

    if (!verifyPassword) {
      throw new BadRequestError('Invalid email or password.');
    }

    const token = jwt.sign({ id: user.id }, process.env.JWTPASS ?? '')

    response.cookie('jwt', token, {
      httpOnly: true,
      maxAge: 8 * 60 * 60 * 1000 // 8h
    })

    const { password: _, ...data } = user

    return response.send({
      message: 'Success login',
      user: data,
      token: token,
    })
  }
}