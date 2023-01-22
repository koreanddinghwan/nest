import { Module } from '@nestjs/common'
import { UsersModule } from '../users/users.module'
import { AuthService } from './auth.service'
import { PassportModule } from '@nestjs/passport'
import { AuthController } from './auth.controller'
import { JwtModule } from '@nestjs/jwt'
import { JwtStrategy } from './jwt.stategy'
import { GoogleStrategy } from './google.strategy'
import { RefreshTokenService } from './refresh-token/refresh-token.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { RefreshToken } from './refresh-token/refreshToken.entity'

@Module({
  imports: [
    TypeOrmModule.forFeature([RefreshToken]),
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWTCONSTANTS,
    }),
  ],
  providers: [AuthService, JwtStrategy, GoogleStrategy, RefreshTokenService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
