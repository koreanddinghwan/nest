import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Profile, Strategy } from 'passport-google-oauth20'
import { User } from 'src/users/users.entity'
import { LoginType } from './enum/loginType.enum'

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

  /*
   * set authorization param
   * these params used for authorization server
   * */
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
      //set req.user data
      const user = new User()
      user.userName = profile.emails[0].value
      user.loginType = LoginType.G
      user.userNickName = user.userName + '_' + user.loginType
      done(null, user)
    } catch (e) {
      done(e, false)
    }
  }
}
