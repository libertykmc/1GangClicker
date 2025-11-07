import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty({
    example: 'player1',
    description: 'Имя пользователя (уникальное)',
  })
  username: string;

  @ApiProperty({ example: '123456', description: 'Пароль' })
  password: string;

  @ApiProperty({
    example: 'Иванов Иван Иванович',
    description: 'ФИО пользователя',
  })
  fullName: string;

  @ApiProperty({
    example: '12.05.2002',
    description: 'Дата рождения в формате ДД.ММ.ГГГГ',
  })
  birthDate: string;
}
