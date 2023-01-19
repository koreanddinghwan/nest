import { Injectable } from '@nestjs/common'
import { User } from './users.entity'
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'

@Injectable()
export class UsersService {
  constructor(
    /*
     * UserService class initialize될때, User entity의 repository를 선언합니다.
     * 아래의 메서드에서 User entity의 데이터를 가져오기위해서는
     * repository가 필요합니다.
     * */
    @InjectRepository(User)
    private usersRepository: Repository<User>
  ) {
    console.log('UserRepository initialized')
  }

  async findOneByUserName(userName: string): Promise<User> {
    return await this.usersRepository.findOneBy({ userName })
  }

  async findOneById(userId: number): Promise<User> {
    return await this.usersRepository.findOneBy({ userId })
  }

  async registerUser(user: User) {
    const id = await this.usersRepository
      .createQueryBuilder()
      .insert()
      .into(User)
      .values([
        {
          ...user,
        },
      ])
      .execute()
    return id.raw.insertId
  }
}
