import { Injectable } from '@nestjs/common'

@Injectable()
export class UsersService {
  //   async findOneByUserName(userName: string): Promise<User> {
  //     return await this.usersRepository.findOneBy({ userName })
  //   }
  //   async findOneById(userId: string): Promise<User> {
  //     return await this.usersRepository.findOneBy({ userId })
  //   }
  //   async insertUserReturnData(user: User) {
  //     const inserted = await this.usersRepository
  //       .createQueryBuilder()
  //       .insert()
  //       .into(User)
  //       .values(user)
  //       .execute()
  //     return inserted.generatedMaps[0]
  //   }
}
