import { Controller, Get, Param } from '@nestjs/common'
import { UsersService } from './users.service'
import { User } from './users.entity'

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get('/:id([0-9]+)')
  async findOneById(@Param('id') userId: string): Promise<User> {
    return await this.userService.findOneById(+userId)
  }

  @Get('/:username')
  async findOneByUserName(@Param('username') username: string): Promise<User> {
    return await this.userService.findOneByUserName(username)
  }
}
