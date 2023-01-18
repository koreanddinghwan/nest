import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { InjectRepository } from '@nestjs/typeorm'
import { Profile, Strategy } from 'passport-google-oauth20'
import { User } from 'src/users/users.entity'
import { Repository } from 'typeorm'

/*
 * PassportStrategy를 정의한다.
 * passport-google-oauth20의 Strategy를 상속하며,
 * 기본 인자값으로 받는 clientID, clientSecret, callbackURL, scope를 super를 호출해 설정한다.
 * */
@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>
  ) {
    super({
      clientID: process.env.GOOGLE_CLIENTID,
      clientSecret: process.env.GOOGLE_CLIENTPASSWD,
      callbackURL: process.env.GOOGLE_CALLBACK,
      scope: ['email'],
    })
  }

  validate(accessToken: string, refreshToekn: string, profile: Profile) {
    const { id, emails, name } = profile

    return {
      provider: 'google',
      providerId: id,
      name: name.givenName,
      email: emails[0].value,
    }
  }
}
