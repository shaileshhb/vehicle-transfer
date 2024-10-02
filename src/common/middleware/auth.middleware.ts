import { NestMiddleware, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { NextFunction, Request, Response } from "express";

export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers['authorization']
    if (!authHeader || authHeader == '') {
      throw new UnauthorizedException("authorization token not specified")
    }

    const fields = authHeader.split(" ")
    if (fields.length < 2) {
      throw new UnauthorizedException("invalid authorization header provided")
    }

    const authorizationType = fields[0].toLowerCase()
    if (authorizationType != 'bearer') {
      throw new UnauthorizedException(`unsupported authorization type ${authorizationType}`)
    }

    const token = fields[1]
    if (!token) {
      throw new UnauthorizedException("authorization token not provided")
    }

    next()
  }
}