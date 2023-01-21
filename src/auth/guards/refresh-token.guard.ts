import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Observable } from 'rxjs'

@Injectable()
export class refreshTokenGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const refreshToken = context.switchToHttp().getRequest()
      .cookies.refreshToken
    return this.validateAccessToken(refreshToken)
  }

  private validateAccessToken(refreshToken: any) {
    this.jwtService.verify(refreshToken)

    return true
  }
}
