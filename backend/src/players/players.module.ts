import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Player } from './entities/player.entity';
import { PlayersService } from './players.service';
import { PlayersController } from './players.controller';
import { User } from '../auth/entities/user.entity';
import { EventsModule } from '../events/events.module';

@Module({
  imports: [TypeOrmModule.forFeature([Player, User]), EventsModule],
  controllers: [PlayersController],
  providers: [PlayersService],
})
export class PlayersModule { }
