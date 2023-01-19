import { Controller, UseGuards, Req, Get, Res } from '@nestjs/common'
import { Response } from 'express'
import { AuthGuard } from '@nestjs/passport'
import { AuthService } from './auth/auth.service'
import { JwtAuthGuard } from './auth/jwt-auth.guard'

@Controller()
export class AppController {
  constructor(private authService: AuthService) {}

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Req() req: any) {
    return req.user
  }

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
    //AuthGuard google will make req.user
    console.log(req.user)

    //got a jwt token to send
    const jwt = await this.authService.signIn(req.user)
    if (jwt) {
      const cur_date = new Date()
      cur_date.setSeconds(cur_date.getSeconds() + 5)
      res.cookie('access_token', jwt, {
        expires: cur_date, //token expired date, 5seconds
        maxAge: 10000, //token will delete after maxAge, 10s
        sameSite: true,
        secure: false,
      })
      res.redirect('/')
    } else {
      res.redirect('http://localhost:3000/api/login/google')
    }
  }
}
