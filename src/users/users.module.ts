import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from './users.entity'
import { UsersService } from './users.service'
import { UsersController } from './users.controller'

@Module({
  /*
   * 이 모듈은 forFeature() 메서드를 사용하여 현재 범위에 등록된 리포지토리를 정의합니다.
   * 이 기능을 사용하면 @InjectRepository() decorator를 사용하여
   * UsersService에 UsersRepository를 삽입할 수 있습니다:
   * */
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
