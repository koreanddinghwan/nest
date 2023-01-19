import { BadRequestException, Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { UsersService } from '../users/users.service'

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    //user가 로그인에 성공하면 JWT 토큰을 반환하도록해야합니다.
    //bearer token으로 유효한 JWT인지 확인해 API route를 보호해줘야합니다.
    private jwtService: JwtService
  ) {}

  /*
   * sign this payload
   * */
  generateJwt(payload) {
    return this.jwtService.sign(payload)
  }

  /*
   * @param user: AuthGuard's made user
   * */
  async signIn(user) {
    if (!user) throw new BadRequestException('UnAuthenticated')

    const DbUser = await this.usersService.findOneByUserName(user.username)

    if (!DbUser) {
      //register new user
      const newUserId = this.usersService.registerUser(user)
      user.userId = newUserId
    }

    //return JWT token
    const { password, ...data } = DbUser
    return this.generateJwt({
      data,
    })
  }

  /*
   * @param username: username to find
   * @param pass: password for user
   * */
  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneByUserName(username)
    if (user && user.password === pass) {
      const { password, ...result } = user
      //return except password
      return result
    }
    return null
  }

  /*
   * google user
   * */
  async findOrCreate(username: string) {
    const user = await this.usersService.findOneByUserName(username)
    if (!user) {
      //insert
    } else {
      //
    }
  }
}
