import { Controller, Post, Body, Param, Res, Get, Req, UnauthorizedException } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { Response, Request } from 'express';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('register')
  @ApiOperation({ summary: 'Регистрация нового пользователя' })
  @ApiResponse({
    status: 201,
    description: 'Пользователь успешно зарегистрирован',
  })
  register(@Body() body: RegisterDto) {
    return this.authService.register(
      body.username,
      body.password,
      body.fullName,
      body.birthDate,
    );
  }

  @Post('login')
  @ApiOperation({ summary: 'Авторизация пользователя' })
  @ApiResponse({ status: 200, description: 'Успешная авторизация' })
  async login(
    @Body() body: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { access_token, username } = await this.authService.login(
      body.username,
      body.password,
    );
    res.cookie('token', access_token, {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });
    return { username, access_token };
  }

  @Post('logout')
  @ApiOperation({ summary: 'Выход из системы' })
  @ApiResponse({ status: 200, description: 'Успешный выход' })
  logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('token');
    return { message: 'Logged out' };
  }

  @Get('profile')
  @ApiOperation({ summary: 'Получить профиль текущего пользователя' })
  getProfile(@Req() req: Request) {
    const token = req.cookies['token'];
    if (!token) throw new UnauthorizedException('No token found');
    const payload = this.authService.verifyToken(token);
    if (!payload) throw new UnauthorizedException('Invalid token');
    return payload;
  }

  @Post('avatar/:userId')
  @ApiOperation({ summary: 'Обновить аватар пользователя (base64)' })
  @ApiResponse({ status: 200, description: 'Аватар обновлен' })
  updateAvatar(
    @Param('userId') userId: string,
    @Body() body: { avatar: string },
  ) {
    return this.authService.updateAvatar(userId, body.avatar);
  }
}
