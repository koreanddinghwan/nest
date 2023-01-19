import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Profile, Strategy } from 'passport-google-oauth20'

/*
 * google의 custom PassportStrategy를 정의한다.
 * passport-google-oauth20의 Strategy를 상속하며,
 * 기본 인자값으로 받는 clientID, clientSecret, callbackURL, scope를 super를 호출해 설정한다.
 * */
@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor() {
    super({
      clientID: process.env.GOOGLE_CLIENTID,
      clientSecret: process.env.GOOGLE_CLIENTPASSWD,
      callbackURL: process.env.GOOGLE_CALLBACK,
      passReqToCallback: true,
      scope: ['email'],
    })
  }

  authorizationParams(): { [key: string]: string } {
    return {
      access_type: 'offline',
      prompt: 'consent',
    }
  }

  validate(
    request: any,
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: any
  ) {
    try {
      console.log('accessToken: ', accessToken)
      console.log('refreshToken: ', refreshToken)
      console.log('profile: ', profile)

      //set req.user data
      const user = {
        accessToken,
        profile,
      }
      done(null, user)
    } catch (e) {
      done(e, false)
    }
  }
}
