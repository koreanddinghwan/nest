import { Controller, Get, Param } from '@nestjs/common'
import { UsersService } from './users.service'
import { UsePipes } from '@nestjs/common'
import { ValidationPipe } from '@nestjs/common'
import { Query } from '@nestjs/common'
import { DocsGetReviewByUserId } from './apidocs.dto'
import { example, examples } from './example.dto'

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  // @Get('/:id([0-9]+)')
  // async findOneById(@Param('id') userId: string) {
  //   // return await this.userService.findOneById(userId)
  // }

  // @Get('/:username')
  // async findOneByUserName(@Param('username') username: string) {
  //   // return await this.userService.findOneByUserName(username)
  // }

  @Get('/example')
  @DocsGetReviewByUserId()
  @UsePipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      forbidUnknownValues: true,
    })
  )
  async example(@Query() example: example) {}

  @Get('/examples')
  @DocsGetReviewByUserId()
  @UsePipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      forbidUnknownValues: true,
    })
  )
  async examples(@Query() examples: examples) {}
}
