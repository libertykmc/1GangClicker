import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ example: 'player1', description: 'Имя пользователя' })
  username: string;

  @ApiProperty({ example: '123456', description: 'Пароль' })
  password: string;
}
