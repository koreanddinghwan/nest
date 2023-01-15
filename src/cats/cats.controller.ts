import { Controller, Get, Post, Body, Req } from '@nestjs/common'
import { Request } from 'express'

@Controller('cats')
export class CatsController {
  @Get()
  findAll(@Req() request: Request): string {
    console.log(request)
    return 'this action will return all cats'
  }
}
