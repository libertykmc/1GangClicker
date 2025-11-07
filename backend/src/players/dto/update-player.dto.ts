import { ApiProperty } from '@nestjs/swagger';

export class UpdatePlayerDto {
  @ApiProperty({
    example: 'a59be67e-b342-4c59-8065-06a967a94bfc',
    description: 'UUID пользователя, которому принадлежат данные игрока',
  })
  userId: string;

  @ApiProperty({
    example: 10,
    description: 'Изменение количества денег (положительное или отрицательное)',
  })
  deltaMoney: number;

  @ApiProperty({
    example: -2,
    description: 'Изменение энергии (положительное или отрицательное)',
  })
  deltaEnergy: number;
}
