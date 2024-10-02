import { NestMiddleware, UnauthorizedException } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";

export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const headers = req.headers
    if (headers['authorization'] !== 'authorization') {
      throw new UnauthorizedException("authorization token not specified")
    }
    next()
  }
}