import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy } from 'passport-local'
import { AuthService } from './auth.service'

/*
 * strategy for local(username && password)
 * */
@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    //call super() => Passport create
    super()
    console.log('local strategy initialied')
  }

  /*
   * validate method will
   * */
  async validate(username: string, password: string): Promise<any> {
    const user = await this.authService.validateUser(username, password)
    console.log('local strategy')
    if (!user) {
      //this exception will handled in Exception layer
      throw new UnauthorizedException()
    }
    return user
  }
}
