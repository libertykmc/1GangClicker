import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { PlayersService } from './players.service';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UpdatePlayerDto } from './dto/update-player.dto';

@ApiTags('Players')
@Controller('players')
export class PlayersController {
  constructor(private readonly playersService: PlayersService) {}

  // создается игрок для конкретного userId (вызывать после регистрации)
  @Post('create/:userId')
  create(@Param('userId') userId: string) {
    return this.playersService.createForUser(userId);
  }

  // получение инфы о игроке
  @Get(':userId')
  getPlayer(@Param('userId') userId: string) {
    return this.playersService.getPlayer(userId);
  }

  // обновление денег и энергии (например, при клике)
  @Post('update')
  @ApiOperation({ summary: 'Обновить параметры игрока' })
  @ApiResponse({ status: 200, description: 'Игрок успешно обновлен' })
  updateStats(@Body() body: UpdatePlayerDto) {
    return this.playersService.updateStats(
      body.userId,
      body.deltaMoney,
      body.deltaEnergy,
    );
  }
}
