import { Strategy } from 'passport-local'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { AuthService } from './auth.service'

//커스터마이징된 strategy는 반드시 PassportStrategy를 상속해야합니다.
//생성자에서 authService객체를 가지고있게됩니다.
//super호출 시 option객체를 넣어주는 경우도 있는데, 지금 구현하고있는 strategy는
//option 객체가 따로 없어서 단순히 super()만 호출합니다.
@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super()
  }

  async validate(username: string, password: string): Promise<any> {
    const user = await this.authService.validateUser(username, password)
    if (!user) {
      throw new UnauthorizedException()
    }
    return user
  }
}
