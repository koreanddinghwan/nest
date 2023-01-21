import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { Observable } from 'rxjs'
import { AuthService } from '../auth.service'
import { CustomJwtService } from '../jwt.service'

/*
 * AuthGuard for refresh-silent
 * */
@Injectable()
export class RefreshGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private jwtService: CustomJwtService
  ) {}

  /*
   * express에서는 middleware로 인가를 구현했으나,
   * middleware는 execution context가 없다.
   * guard에는 다음에 수행될 context가 정확하게 지정되어있다
   * (nest runtime에 결정된다...bootstrap함수 호출하면서!)
   * */
  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    //context내부의 request 가져오기
    const request = context.switchToHttp().getRequest()
    const res = context.switchToHttp().getResponse()
    return this.validateRequest(request, res)
  }

  private async validateRequest(req: any, res: any) {
    const accessToken = req.cookies.access_token
    const refreshToken = req.cookies.refresh_token

    //둘 다 없으면 로그인을 수행해야하는 정상적인 클라이언트
    if (!accessToken && !refreshToken) {
      res.status(101).end()
    }

    try {
      //verify refresh token
      await this.jwtService.verifyAsync(refreshToken, {
        secret: process.env.JWTCONSTANTS,
      })

      //check without expire
      await this.jwtService.verifyAsync(accessToken, {
        secret: process.env.JWTCONSTANTS,
        ignoreExpiration: true,
      })
    } catch (err) {
      console.log(err)
      return false
    }

    //check expire
    const isAccessTokenExpired = this.jwtService.isExpired(accessToken)

	if ()
    return true
  }
}
