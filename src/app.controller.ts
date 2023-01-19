import {
  Controller,
  Post,
  UseGuards,
  Req,
  Get,
  Redirect,
  Res,
} from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { AuthService } from './auth/auth.service'
import { JwtAuthGuard } from './auth/jwt-auth.guard'
import { LocalAuthGuard } from './auth/local-auth.guard'

@Controller()
export class AppController {
  constructor(private authService: AuthService) {}

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Req() req: any) {
    return req.user
  }

  //this route will redirected to google login page
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
  googleCallback(@Req() req: any, @Res() res: any) {
    //AuthGuard google will make req.user

    const jwt = this.authService.signIn(req.user)

    if (jwt) {
      res.redirect('http://localhost:3000/')
    } else {
      res.redirect('http://localhost:3000/api/login/google')
    }
  }
}
