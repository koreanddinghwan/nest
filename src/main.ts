import './dotenv'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  //모든 route 경로를 api를 붙인다.
  app.setGlobalPrefix('api')
  await app.listen(3000)
}
bootstrap()
