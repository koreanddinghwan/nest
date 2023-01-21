import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Observable } from 'rxjs'

@Injectable()
export class accessTokenGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const accessToken = context.switchToHttp().getRequest().cookies.accessToken
    return this.validateAccessToken(accessToken)
  }

  private validateAccessToken(accessToken: any) {
    this.jwtService.verify(accessToken)

    return true
  }
}
