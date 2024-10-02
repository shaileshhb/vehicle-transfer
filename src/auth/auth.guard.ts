import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { jwtConstants } from 'src/user/constant';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
  ) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
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

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: jwtConstants.secret
      })
    } catch (error) {
      throw new UnauthorizedException()
    }
    
    return true;
  }
}
