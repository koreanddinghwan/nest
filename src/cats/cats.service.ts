import { Injectable } from '@nestjs/common'

@Injectable()
export class CatsService {
  findAll() {
    return `This action returns all cats`
  }
}
