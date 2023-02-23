import { applyDecorators } from '@nestjs/common'
import {
  ApiOperation,
  ApiOkResponse,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger'

export function DocsGetReviewByUserId() {
  return applyDecorators(
    ApiOperation({
      summary: 'get reviews by userId',
      description: 'get reviews by user',
    }),
    ApiOkResponse({
      description: 'Get Success',
    }),
    ApiParam({
      name: '작성한 리뷰를 요청할 사용자 아이디',
    }),
    ApiQuery({
      name: 'pagination 정보',
    })
  )
}
