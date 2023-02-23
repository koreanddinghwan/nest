import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ServeStaticModule } from '@nestjs/serve-static'
import { join } from 'path'
import { UsersModule } from './users/users.module'
import { MorganInterceptor, MorganModule } from 'nest-morgan'
import { APP_INTERCEPTOR } from '@nestjs/core'

@Module({
  imports: [
    MorganModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client2'),
      exclude: ['/api*'],
    }),
    /*
     * TypeOrmModule 전체에 datasource 생성자에 필요한 connection정보 등록
     * */
    UsersModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    { provide: APP_INTERCEPTOR, useClass: MorganInterceptor('combined') },
  ],
})
export class AppModule {}
