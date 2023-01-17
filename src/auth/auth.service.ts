import { Injectable } from '@nestjs/common'
import { UsersService } from '../users/users.service'

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  //username과 hash화된 password로 사용자인지 아닌지 확인합니다.
  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findOneByUserName(username)
    //원래 여기 password는 bycrypt를 통해 해시화되어있어야합니다.
    if (user && user.password === password) {
      const { password, ...result } = user
      //password를 제외한 결과를 리턴.
      return result
    }
    return null
  }
}
