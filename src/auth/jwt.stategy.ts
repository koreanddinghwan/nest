import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'

/*
 * super option {
 * jwtFromRequest: request에서 jwt를 추출하는 방식,
 * ignoreExpiration: 토큰의 만료기간을 무시한다는 의미, false로 해야 만료된 토큰을 받지 않는다.
 * secretOrKey: token signing에 사용하는 키, 시크릿
 * }
 * */
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWTCONSTANTS,
    })
  }

  /*
   * Passport가 JWT signature를 확인하고 JSON을 디코딩한 후에, validate 메서드로 decoding된 JSON을 보낸다.
   */
  async validate(payload: any, done: any) {
    return {
      ...payload,
    }
  }
}
