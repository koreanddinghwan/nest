import { ApiProperty } from '@nestjs/swagger'

export class example {
  @ApiProperty({
    description: '요청할 페이지',
    example: 'https://host/review/event/2?page=10&',
  })
  readonly page: number
}

export class examples {
  @ApiProperty({
    description: '요청할 페이지',
    examples: ['https://host/review/event/2?page=10', 'asdfasdf'],
  })
  readonly page: number
}
