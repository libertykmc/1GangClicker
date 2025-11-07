import { Controller, Post, Body, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

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
  login(@Body() body: LoginDto) {
    return this.authService.login(body.username, body.password);
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
