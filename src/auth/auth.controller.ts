import { Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { AuthGuard } from '@nestjs/passport'
import { Request, Response } from 'express'
import { AuthService } from './auth.service'
import { RefreshTokenService } from './refresh-token/refresh-token.service'
import { RefreshToken } from './refresh-token/refreshToken.entity'

@Controller('auth')
export class AuthController {
  constructor(
    private jwtService: JwtService,
    private authService: AuthService,
    private refreshTokenService: RefreshTokenService
  ) {}

  // 1.this route will redirected to google login page
  @Get('google/login')
  @UseGuards(AuthGuard('google'))
  googleLogin() {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
  }

  /*
   * after google/login get access token,
   * redirected come here
   * */
  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleCallback(@Req() req: any, @Res() res: Response) {
    //got a jwt token to send
    const userData = await this.authService.signInAndReturnUser(req.user)

    //generate access, refresh token to send client
    const accessToken = this.authService.generateJwt(
      JSON.parse(JSON.stringify(userData))
    )
    const refreshToken = this.authService.generateJwt({})

    if (accessToken && refreshToken) {
      //set access_token cookie
      const acc_expire_date = new Date()
      const refr_expire_date = new Date()
      acc_expire_date.setSeconds(acc_expire_date.getSeconds() + 5)
      refr_expire_date.setSeconds(refr_expire_date.getSeconds() + 10)

      res.cookie('access_token', accessToken, {
        maxAge: 10000, //token will delete after maxAge, 10s
        expires: acc_expire_date, //token expired date, 5seconds
        sameSite: true,
        secure: false, //https로만 전송?
        httpOnly: true, //httpHeader로만 전달됨, CSRF공격에 대비하기위함
      })

      //make refresh token data in db
      const newRefreshToken = new RefreshToken()
      newRefreshToken.value = refreshToken
      newRefreshToken.userId = userData.userId
      newRefreshToken.expires = refr_expire_date
      newRefreshToken.createdByIp = req.ip
      newRefreshToken.createdAt = new Date()

      //insert into database
      //## could changed into redis ##
      await this.refreshTokenService.insertRefreshToken(newRefreshToken)

      //set refresh_token cookie
      res.cookie('refresh_token', refreshToken, {
        maxAge: 10000,
        expires: refr_expire_date,
        sameSite: true,
        secure: false,
        httpOnly: true,
      })

      res.status(202).redirect('http://localhost:4000')
    } else {
      res.status(402).redirect('http://localhost:4000')
    }
  }

  /*
   * refreshSilent:
   * refresh If user access token about to expire
   * */
  @Post('/refresh_silent')
  silentRefresh(@Req() req: Request, @Res() res: Response) {
    console.log('------------------')
    const access_token = req.cookies.access_token
    console.log(this.jwtService.decode(access_token))
  }
}
