// future task
// import { Request, Response, NextFunction } from "express"
// import { UnauthorizedError } from "../errors/ApiError"
// import jwt from 'jsonwebtoken'
// import { IUserRepository } from "../repositories/iUserAccountRepository"

// type JwtPayload = {
//   id: string
// }

// export const authMiddleware = async (
//   userRepository: IUserRepository,
//   request: Request,
//   response: Response,
//   next: NextFunction,
// ) => {
//   const cookie = request.cookies['jwt']

//   if (!cookie) {
//     throw new UnauthorizedError('Unauthenticated');
//   }

//   const { id } = jwt.verify(cookie, process.env.JWTPASS ?? '') as JwtPayload
//   const user = await userRepository.findById(id)

//   if (!user) {
//     throw new UnauthorizedError('Unauthenticated')
//   }

//   const { password: _, ...loggedUser } = user

//   request.user = loggedUser

//   next()
// }