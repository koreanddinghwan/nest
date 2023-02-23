import './dotenv'
import { NestFactory } from '@nestjs/core'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import { AppModule } from './app.module'
import * as cookieParser from 'cookie-parser'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log'],
  })
  //모든 route 경로를 api를 붙인다.
  app.setGlobalPrefix('api')

  //cookie parser는 option으로 secret key 받아서 파싱해줍니다.
  app.use(cookieParser(process.env.JWTCONSTANTS))

  app.enableCors({
    origin: 'http://localhost:4000',
    credentials: true,
  })

  const config = new DocumentBuilder()
    .setTitle('Cats example')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .addTag('cats')
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api', app, document)

  await app.listen(3000)
}
bootstrap()
